export const RoleNavigation = (role: string): string => {
    if (role === 'Admin') {
        return "/admin"
    } else if (role === "Teacher") {
        return "/teacher"
    } else if (role === "Student") {
        return "/student"
    } else {
        return "/"
    }
}