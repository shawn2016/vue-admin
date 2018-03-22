var filterData = function (obj = {}) {
    obj.respCode = obj.respCode || "000000"
    obj.respMsg = obj.respMsg || "查询成功"
    console.log(obj)
    return obj
}
module.exports = filterData