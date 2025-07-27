import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

const Controls = ({ searchTerm, onSearchChange, sortBy, onSortChange }) => {
    const sortOptions = [
        { value: "name", label: "Name" },
        { value: "winery", label: "Winery" },
        { value: "vintage", label: "Vintage" },
        { value: "varietal", label: "Varietal" },
        { value: "rating", label: "Rating" },
        { value: "bottlesInStock", label: "Stock" },
        { value: "createdAt", label: "Date Added" },
    ]

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 mr-2 text-purple-600" />
                Filter & Sort
            </h2>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                    <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                        Search Wines
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />
                        </div>
                        <input type="text" id="search" value={searchTerm} onChange={(e) => onSearchChange(e.target.value)} className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500" placeholder="Search by name, winery, varietal, or location..." />
                    </div>
                </div>

                <div className="md:w-48">
                    <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">
                        Sort By
                    </label>
                    <select id="sort" value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500">
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    )
}

export default Controls
