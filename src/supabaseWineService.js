import { supabase } from "./supabase"

// Table name for wines
const WINES_TABLE = "wines"

// Add a new wine to the collection
export const addWine = async (wineData) => {
    try {
        const { data, error } = await supabase
            .from(WINES_TABLE)
            .insert([
                {
                    name: wineData.name,
                    winery: wineData.winery,
                    vintage: parseInt(wineData.vintage) || null,
                    varietal: wineData.varietal || null,
                    location: wineData.location || null,
                    bottles_in_stock: parseInt(wineData.bottlesInStock) || 0,
                    rating: parseInt(wineData.rating) || 0,
                    created_at: new Date().toISOString(),
                },
            ])
            .select()

        if (error) throw error
        return data[0]
    } catch (error) {
        console.error("Error adding wine:", error)
        throw error
    }
}

// Get all wines
export const getWines = async () => {
    try {
        const { data, error } = await supabase.from(WINES_TABLE).select("*").order("created_at", { ascending: false })

        if (error) throw error

        // Transform the data to match the expected format
        return data.map((wine) => ({
            id: wine.id,
            name: wine.name,
            winery: wine.winery,
            vintage: wine.vintage,
            varietal: wine.varietal,
            location: wine.location,
            bottlesInStock: wine.bottles_in_stock,
            rating: wine.rating,
            createdAt: wine.created_at,
        }))
    } catch (error) {
        console.error("Error fetching wines:", error)
        throw error
    }
}

// Update wine stock
export const updateWineStock = async (wineId, newStock) => {
    try {
        const { data, error } = await supabase.from(WINES_TABLE).update({ bottles_in_stock: newStock }).eq("id", wineId).select()

        if (error) throw error
        return data[0]
    } catch (error) {
        console.error("Error updating wine stock:", error)
        throw error
    }
}

// Update wine rating
export const updateWineRating = async (wineId, newRating) => {
    try {
        const { data, error } = await supabase.from(WINES_TABLE).update({ rating: newRating }).eq("id", wineId).select()

        if (error) throw error
        return data[0]
    } catch (error) {
        console.error("Error updating wine rating:", error)
        throw error
    }
}

// Delete a wine
export const deleteWine = async (wineId) => {
    try {
        const { error } = await supabase.from(WINES_TABLE).delete().eq("id", wineId)

        if (error) throw error
    } catch (error) {
        console.error("Error deleting wine:", error)
        throw error
    }
}

// Subscribe to wine collection changes (real-time)
export const subscribeToWines = (callback) => {
    const subscription = supabase
        .channel("wines-changes")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: WINES_TABLE,
            },
            async () => {
                // Fetch updated data when changes occur
                try {
                    const wines = await getWines()
                    callback(wines)
                } catch (error) {
                    console.error("Error in real-time subscription:", error)
                }
            }
        )
        .subscribe()

    // Return unsubscribe function
    return () => {
        supabase.removeChannel(subscription)
    }
}
