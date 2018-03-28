var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    phonenum: String,
    userCode: String,
    userName: String,
    identifyNo: String,
    refUserRoleCode: String,
    status: String,
    userDuty: String,
    createTime: Date,
    updateTime: Date,
    password: String,
    desc: String
}, { collection: 'user' });
//????getModel???????user??
module.exports = {
    getModel: function () {
        return _getModel();
    }
};

//??db??user?Schema???????????????????
var _getModel = function (type, err) {
    let userModel = mongoose.model('user', userSchema);
    return userModel;

};
