import { useAuth } from "../useClerkAuth"

const ProtectedAction = ({ children, fallback }) => {
    const { isAuthenticated, loading } = useAuth()

    if (loading) {
        return (
            <div className="animate-pulse bg-gray-200 rounded-lg p-4">
                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
            </div>
        )
    }

    if (!isAuthenticated) {
        return fallback || null
    }

    return children
}

export default ProtectedAction
