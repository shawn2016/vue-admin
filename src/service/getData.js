
/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/user/login', {username, password, captcha_code}, 'POST');

/**
 * 退出登录
 */
export const signout = () => fetch('/user/signout');

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', {username, oldpassWord, newpassword, confirmpassword, captcha_code}, 'POST');

