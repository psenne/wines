import { useState } from "react"
import { PlusIcon } from "@heroicons/react/24/outline"

const WineForm = ({ onAddWine }) => {
    const [formData, setFormData] = useState({
        name: "",
        winery: "",
        vintage: "",
        varietal: "",
        location: "",
        bottlesInStock: "",
        rating: 0,
    })

    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!formData.name || !formData.winery) {
            alert("Please fill in at least the wine name and winery.")
            return
        }

        setIsSubmitting(true)
        try {
            await onAddWine(formData)
            setFormData({
                name: "",
                winery: "",
                vintage: "",
                varietal: "",
                location: "",
                bottlesInStock: "",
                rating: 0,
            })
        } catch (error) {
            console.error("Error adding wine:", error)
            alert("Failed to add wine. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <PlusIcon className="h-6 w-6 mr-2 text-purple-600" />
                Add New Wine
            </h2>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Wine Name *
                    </label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Enter wine name" />
                </div>

                <div>
                    <label htmlFor="winery" className="block text-sm font-medium text-gray-700 mb-1">
                        Winery *
                    </label>
                    <input type="text" id="winery" name="winery" value={formData.winery} onChange={handleChange} required className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Enter winery name" />
                </div>

                <div>
                    <label htmlFor="vintage" className="block text-sm font-medium text-gray-700 mb-1">
                        Vintage Year
                    </label>
                    <input type="number" id="vintage" name="vintage" value={formData.vintage} onChange={handleChange} min="1800" max={new Date().getFullYear()} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="e.g., 2020" />
                </div>

                <div>
                    <label htmlFor="varietal" className="block text-sm font-medium text-gray-700 mb-1">
                        Varietal/Type
                    </label>
                    <input type="text" id="varietal" name="varietal" value={formData.varietal} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="e.g., Cabernet Sauvignon" />
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                        Region/Location
                    </label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="e.g., Napa Valley" />
                </div>

                <div>
                    <label htmlFor="bottlesInStock" className="block text-sm font-medium text-gray-700 mb-1">
                        Bottles in Stock
                    </label>
                    <input type="number" id="bottlesInStock" name="bottlesInStock" value={formData.bottlesInStock} onChange={handleChange} min="0" className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="0" />
                </div>

                <div className="md:col-span-2 lg:col-span-3">
                    <button type="submit" disabled={isSubmitting} className="w-full md:w-auto px-6 py-2 bg-purple-600 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
                        {isSubmitting ? "Adding..." : "Add Wine"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default WineForm
