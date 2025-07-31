import { useState, useEffect, useMemo } from "react"
import { useAuth } from "./useSupabaseAuth"
import { subscribeToWines, addWine, updateWineStock, updateWineRating, deleteWine, getWines } from "./supabaseWineService"
import WineForm from "./components/WineForm"
import Controls from "./components/Controls"
import WineList from "./components/WineList"

function App() {
    const { loading } = useAuth()
    const [wines, setWines] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [sortBy, setSortBy] = useState("name")

    // Load wines and set up real-time subscription
    useEffect(() => {
        // Initial load of wines
        const loadWines = async () => {
            try {
                const winesData = await getWines()
                setWines(winesData)
            } catch (error) {
                console.error("Error loading wines:", error)
            }
        }

        loadWines()

        // Set up real-time subscription
        const unsubscribe = subscribeToWines((winesData) => {
            setWines(winesData)
        })

        return () => unsubscribe()
    }, [])

    // Filter and sort wines
    const filteredAndSortedWines = useMemo(() => {
        let filtered = wines

        // Filter by search term
        if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase()
            filtered = wines.filter((wine) => wine.name.toLowerCase().includes(search) || wine.winery.toLowerCase().includes(search) || wine.varietal?.toLowerCase().includes(search) || wine.location?.toLowerCase().includes(search))
        }

        // Sort wines
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "name":
                case "winery":
                case "varietal":
                case "location":
                    return (a[sortBy] || "").localeCompare(b[sortBy] || "")
                case "vintage":
                case "rating":
                case "bottlesInStock":
                    return (b[sortBy] || 0) - (a[sortBy] || 0)
                case "createdAt":
                    return new Date(b.createdAt?.toDate?.() || b.createdAt) - new Date(a.createdAt?.toDate?.() || a.createdAt)
                default:
                    return 0
            }
        })

        return filtered
    }, [wines, searchTerm, sortBy])

    // Handlers
    const handleAddWine = async (wineData) => {
        await addWine(wineData)
    }

    const handleUpdateStock = async (wineId, newStock) => {
        await updateWineStock(wineId, newStock)
    }

    const handleUpdateRating = async (wineId, newRating) => {
        await updateWineRating(wineId, newRating)
    }

    const handleDeleteWine = async (wineId) => {
        await deleteWine(wineId)
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your wine collection...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <header className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🍷 Wine Collection</h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">Manage your personal wine collection with style. Add new bottles, track your stock, rate your favorites, and keep everything organized in one beautiful place.</p>
                </header>

                <main className="max-w-7xl mx-auto">
                    <WineForm onAddWine={handleAddWine} />

                    <Controls searchTerm={searchTerm} onSearchChange={setSearchTerm} sortBy={sortBy} onSortChange={setSortBy} />

                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-2xl font-bold text-gray-900">Your Collection</h2>
                            <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                {filteredAndSortedWines.length} {filteredAndSortedWines.length === 1 ? "wine" : "wines"}
                            </div>
                        </div>

                        <WineList wines={filteredAndSortedWines} onUpdateStock={handleUpdateStock} onUpdateRating={handleUpdateRating} onDeleteWine={handleDeleteWine} />
                    </div>
                </main>

                <footer className="text-center mt-16 py-8 border-t border-gray-200">
                    <p className="text-gray-500">Built with React, Supabase, and Tailwind CSS</p>
                </footer>
            </div>
        </div>
    )
}

export default App
