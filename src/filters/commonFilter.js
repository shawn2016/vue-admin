/**
 * 用户类型
 * @param {*} str 
 */
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
/**
 * 用户状态
 * @param {*} str 
 */
export function userStatus(str = "") {
    switch (str) {
        case "100":
            return '启用'
        case "500":
            return '禁用'
        default:
            return ' '
    }
}
/**
 * 文章状态
 * @param {*} str 
 */
export function articleStatus(str = "") {
    switch (str) {
        case "100":
            return '已发布'
        case "500":
            return '未发布'
        default:
            return ' '
    }
}
/**
 * 所属平台
 * @param {*} str 
 */
export function platType(str = "") {
    switch (str) {
        case "100":
            return '前台'
        case "200":
            return '后台'
        default:
            return ' '
    }
}

/**
 * 菜单级别
 * @param {*} str 
 */
export function menuLevel(str = "") {
    switch (str) {
        case "100":
            return '一级'
        case "200":
            return '二级'
        default:
            return ' '
    }
}
