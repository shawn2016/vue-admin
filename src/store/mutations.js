import { setStore } from '../config/mUtils'
import {
    OUT_LOGIN,
    RECORD_USERINFO,
    GET_USERINFO
} from './mutation-types.js'

export default {
    //退出登录
    [OUT_LOGIN](state) {
        state.userInfo = {};
        state.login = false;
    },
    // 记录用户信息
    [RECORD_USERINFO](state, info) {
        state.userCode = info;
        state.login = true;
        setStore('userCode', info.userCode);        
    },
    //获取用户信息存入vuex
    [GET_USERINFO](state, info) {
        if (state.userInfo && (state.userInfo.userCode !== info.userCode)) {
            return;
        };
        if (!state.login) {
            return
        }
        if (!info.userCode) {
            state.userInfo = { ...info };
        } else {
            state.userInfo = null;
        }
    },
}