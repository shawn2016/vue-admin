export function refUserRoleCode(str = "") {
    switch (str) {
        case 'ADMIN':
            return '管理员'
        case 'USER':
            return '普通用户'
        default:
            return ' '
    }
}
export function status(str = "") {
    switch (str) {
        case "100":
            return '启用'
        case "500":
            return '禁用'
        default:
            return ' '
    }
}