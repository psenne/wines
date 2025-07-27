import { useState, useEffect } from "react"

// Simple auth hook that doesn't require authentication
export const useAuth = () => {
    const [user, setUser] = useState({ uid: "anonymous-user" })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Since we're not using authentication, just set a default user
        setUser({ uid: "anonymous-user" })
        setLoading(false)
    }, [])

    return { user, loading }
}
