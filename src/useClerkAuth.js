import { useUser, useAuth as useClerkAuthHook } from "@clerk/clerk-react"

export const useAuth = () => {
    const { user, isLoaded } = useUser()
    const { isSignedIn } = useClerkAuthHook()

    return {
        user,
        isAuthenticated: isSignedIn,
        loading: !isLoaded,
    }
}
