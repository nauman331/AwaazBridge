export const RoleNavigation = (role: string): string => {
    if (role === 'Admin') {
        return "/admin"
    } else if (role === "Moderator") {
        return "/moderator"
    } else if (role === "User") {
        return "/user"
    } else {
        return "/"
    }
}