const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  phonenum: String,
  userCode: String,
  userName: String,
  identifyNo: String,
  refUserRoleCode: String,
  status: String,
  userDuty: String,
  createTime: Date,
  updateTime:Date,
  password: String,
  desc: String
}, { collection: 'user' })
//这里mongoose.Schema要写上第二个参数，明确指定到数据库中的哪个表取数据


const Hero = module.exports = mongoose.model('user', userSchema);