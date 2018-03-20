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