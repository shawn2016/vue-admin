var user_article =require('../models/user_article');  
var user = require('../models/user');  
var article = require('../models/article');  

/** 
 * add User_article 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.addUser_article = function(conditions,dbHelper,callback) {  
  
  
    var user_articleModel =user_article.getModel();  
  
    dbHelper.addData(user_articleModel,conditions,function(result) {  
        callback(result);  
  
    });  
  
  
}  

/** 
 * find User_article 非Ref 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.findUser_article = function(conditions,dbHelper,callback) {  
  
    var user_articleModel =user_article.getModel();  
    var conditions =conditions;  
    var fields   = {};  
    var options  = {};  
    dbHelper.findData(user_articleModel,conditions,fields,options,function(result){  
        callback(result);  
    });  
  
}  
  
/** 
 * find User_article 是Ref 
 * @param conditions 
 * @param path         需要被填充的字段 
 * @param dbHelper 
 * @param callback 
 */  
exports.findUser_articleRef = function(conditions,path,dbHelper,callback) {  
  
  
    var user_articleModel =user_article.getModel();  
  
    var path = path;  
    var fields   = {__v:0};  
    var options  = {sort:{_id:1}};  
    var refmodel1 = article.getModel();  
    var refmodel2 = user.getModel();  
    dbHelper.findDataPopulation(user_articleModel,conditions,path,fields,{},options,function(result){  
        callback(result);  
    });  
  
  
}  
  
/** 
 * remove User_article 
 * @param conditions 
 * @param dbHelper 
 * @param callback 
 */  
exports.removeUser_article = function(conditions,dbHelper,callback) {  
  
  
    var user_articleModel =user_article.getModel();  
    dbHelper.removeData(user_articleModel,conditions,function(result){  
        callback(result);  
    });  
  
  
}  
  
/** 
 * update User_article 
 * @param conditions 
 * @param update 
 * @param options 
 * @param dbHelper 
 * @param callback 
 */  
exports.updateUser_article = function(conditions,update,options,dbHelper,callback) {  
  
  
    var user_articleModel =user_article.getModel();  
    dbHelper.updateData(user_articleModel,conditions,update,options,function(result){  
        callback(result);  
    });  
      
}  