import WineItem from "./WineItem"

const WineList = ({ wines, onUpdateStock, onUpdateRating, onDeleteWine }) => {
    if (wines.length === 0) {
        return (
            <div className="bg-white shadow-lg rounded-lg p-12 text-center">
                <div className="text-gray-400 mb-4">
                    <svg className="mx-auto h-24 w-24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No wines in your collection</h3>
                <p className="text-gray-500">Add your first wine using the form above to get started!</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wines.map((wine) => (
                <WineItem key={wine.id} wine={wine} onUpdateStock={onUpdateStock} onUpdateRating={onUpdateRating} onDeleteWine={onDeleteWine} />
            ))}
        </div>
    )
}

export default WineList
