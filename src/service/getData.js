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
            url = '/user/list'
            break;
    }
    return fetch(
        {
            url,
            method: "post",
            data: {
                params: obj
            }
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
/**
 * 删除用户信息
 */
export const deleteUserList = (id) => fetch({
    url: `/user/remove`,
    method: "post",
    data: {
        _id: id
    }
});


/**
 * 获取用户信息列表
 */
export const getUserList = (obj) => fetch({
    url: "/user/list",
    method: "post",
    data: obj
});


/**
 * 添加文章
 */
export const saveArticle = (obj) => fetch({
    url: "/article/create",
    method: "post",
    data: obj
});

/**
 * 获取文章列表
 */
export const getArticleList = (obj) => fetch({
    url: "/article/list",
    method: "post",
    data: obj
});
/**
 * 删除文章信息
 */
export const deleteArticleList = (id) => fetch({
    url: `/article/remove`,
    method: "post",
    data: {
        _id: id
    }
});

/**
 * 更新文章信息
 */
export const updateArticle = (obj) => fetch({
    url: "/article/update",
    method: "post",
    data: obj
});


/**
 * 创建菜单
 */
export const createMenu = (obj) => fetch({
    url: "/menu/create",
    method: "post",
    data: obj
});
/**
 * 更新菜单信息
 */
export const updateMenu = (obj) => fetch({
    url: "/menu/update",
    method: "post",
    data: obj
});
/**
 * 删除菜单信息
 */
export const deleteMenuList = (id) => fetch({
    url: `/menu/remove`,
    method: "post",
    data: {
        _id: id
    }
});


/**
 * 获取菜单信息列表
 */
export const getMenuList = (obj) => fetch({
    url: "/menu/list",
    method: "post",
    data: obj
});



/**
 * 创建分类
 */
export const createCategory = (obj) => fetch({
    url: "/category/create",
    method: "post",
    data: obj
});
/**
 * 更新分类信息
 */
export const updateCategory = (obj) => fetch({
    url: "/category/update",
    method: "post",
    data: obj
});
/**
 * 删除分类信息
 */
export const deleteCategoryList = (id) => fetch({
    url: `/category/remove`,
    method: "post",
    data: {
        _id: id
    }
});


/**
 * 获取分类信息列表
 */
export const getCategoryList = (obj) => fetch({
    url: "/category/list",
    method: "post",
    data: obj
});