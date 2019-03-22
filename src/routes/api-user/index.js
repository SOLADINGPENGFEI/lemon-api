/*
 * @Author: dingpengfei 
 * @Date: 2019-03-21 15:04:59 
 * @Last Modified by: dingpengfei
 * @Last Modified time: 2019-03-21 15:11:10
 * function [用户名查找]
 */
const Mongo = require('mongodb-curd');
const batabaseName = 'lemon';
const collcationName = 'username';
const skip = 0;
module.exports = (req, res, next) => {
    Mongo.find(batabaseName, collcationName, {}, function(result) {
        if (!result) {
            res.send({
                code: 0,
                mes: "error"
            })
        } else {
            res.send({
                code: 1,
                mes: "success",
                data: result
            })
        }
    }, {
        skip: 0,
        limit: 0
    })
}