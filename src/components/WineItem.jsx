import { useState } from "react"
import { StarIcon, PlusIcon, MinusIcon, TrashIcon, MapPinIcon, CalendarIcon, BuildingOfficeIcon } from "@heroicons/react/24/outline"
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid"

const WineItem = ({ wine, onUpdateStock, onUpdateRating, onDeleteWine }) => {
    const [isUpdating, setIsUpdating] = useState(false)

    const handleStockChange = async (change) => {
        const newStock = Math.max(0, wine.bottlesInStock + change)
        setIsUpdating(true)
        try {
            await onUpdateStock(wine.id, newStock)
        } catch (error) {
            console.error("Error updating stock:", error)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleRatingChange = async (newRating) => {
        setIsUpdating(true)
        try {
            await onUpdateRating(wine.id, newRating)
        } catch (error) {
            console.error("Error updating rating:", error)
        } finally {
            setIsUpdating(false)
        }
    }

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete "${wine.name}"?`)) {
            setIsUpdating(true)
            try {
                await onDeleteWine(wine.id)
            } catch (error) {
                console.error("Error deleting wine:", error)
                setIsUpdating(false)
            }
        }
    }

    const renderStars = () => {
        const stars = []
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button key={i} onClick={() => handleRatingChange(i)} disabled={isUpdating} className="focus:outline-none disabled:opacity-50">
                    {i <= wine.rating ? <StarIconSolid className="h-5 w-5 text-yellow-400" /> : <StarIcon className="h-5 w-5 text-gray-300 hover:text-yellow-400 transition-colors" />}
                </button>
            )
        }
        return stars
    }

    return (
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{wine.name}</h3>
                    <div className="flex items-center text-gray-600 mb-1">
                        <BuildingOfficeIcon className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">{wine.winery}</span>
                    </div>
                </div>

                <button onClick={handleDelete} disabled={isUpdating} className="text-red-500 hover:text-red-700 focus:outline-none disabled:opacity-50 transition-colors" title="Delete wine">
                    <TrashIcon className="h-5 w-5" />
                </button>
            </div>

            <div className="space-y-3">
                {wine.vintage && (
                    <div className="flex items-center text-gray-600">
                        <CalendarIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{wine.vintage}</span>
                    </div>
                )}

                {wine.varietal && (
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">Varietal:</span> {wine.varietal}
                    </div>
                )}

                {wine.location && (
                    <div className="flex items-center text-gray-600">
                        <MapPinIcon className="h-4 w-4 mr-2" />
                        <span className="text-sm">{wine.location}</span>
                    </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <span className="text-sm font-medium text-gray-700">Rating:</span>
                        <div className="flex items-center mt-1">{renderStars()}</div>
                    </div>

                    <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">Stock:</span>
                        <div className="flex items-center space-x-2">
                            <button onClick={() => handleStockChange(-1)} disabled={isUpdating || wine.bottlesInStock === 0} className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <MinusIcon className="h-4 w-4" />
                            </button>

                            <span className="text-lg font-bold text-gray-900 min-w-[2rem] text-center">{wine.bottlesInStock}</span>

                            <button onClick={() => handleStockChange(1)} disabled={isUpdating} className="p-1 rounded-full bg-green-100 text-green-600 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                                <PlusIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WineItem
