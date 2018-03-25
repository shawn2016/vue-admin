import fetch from '../libs/fetch'
import { getStore } from '../config/mUtils'
/**
 * 账号密码登录
 */
export const accountLogin = (type, obj) => {
    let url;
    switch (type) {
        case 'register':
            url = '/user/create'
            break;
        case 'reset':
            url = '/user/update'
            break;
        default:
            url = '/user/login'
            break;
    }
    return fetch(
        {
            url,
            method: "post",
            data: obj
        })
}

/**
 * 退出登录
 */
export const signout = () => fetch('/user/signout');

/**
 * 改密码
 */
export const changePassword = (username, oldpassWord, newpassword, confirmpassword, captcha_code) => fetch('/v2/changepassword', { username, oldpassWord, newpassword, confirmpassword, captcha_code }, 'POST');

/**
 * 获取用户信息
 */

export const getUser = () => fetch({
    url: "/user/userinfo",
    method: "post",
    data: {
        userCode: getStore('userCode')
    }
});

/**
 * 查询点击的用户信息
 */
export const searchUserInfo = (obj) => fetch({
    url: "/user/userinfo",
    method: "post",
    data: {
        userCode: obj.userCode
    }
});
/**
 * 创建用户
 */
export const createUser = (obj) => fetch({
    url: "/user/create",
    method: "post",
    data: obj
});
/**
 * 更新用户信息
 */
export const updateUser = (obj) => fetch({
    url: "/user/update",
    method: "post",
    data: obj
});