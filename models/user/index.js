const mongoose = require('mongoose')

const heroSchema = mongoose.Schema({
  name: String,
  userCode: String,
  userName: String,
  identifyNo: String,
  refUserRoleCode: String,
  status: Number,
  userDuty: String,
  createTime:Date
}, { collection: 'user' })
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Hero = module.exports = mongoose.model('user', heroSchema);