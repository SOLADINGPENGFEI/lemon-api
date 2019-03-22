/*
 * @Author: dingpengfei 
 * @Date: 2019-03-22 11:04:57 
 * @Last Modified by: dingpengfei
 * @Last Modified time: 2019-03-22 14:16:50
 * @function [账单bill具体逻辑]
 */
const curd = require('mongodb-curd');
const db = 'lemon';
const collection = 'bill';
module.exports = {
    findbill: (req, res, next) => {
        let { time, common, title } = req.body;
        title = '["' + title + '"]'
        if (!time || !common) {
            return res.send({ code: 2, msg: '参数不完整' })
        }

        const freg = new RegExp('^' + time);
        let fdata = { time: freg, common: common };

        if (title) {
            fdata = { time: freg, common: common, title: { $in: JSON.parse(title) } }
        }
        curd.find(db, collection, fdata, (result) => {
            if (result.length) {
                res.send({ code: 1, msg: 'success', data: result });
            } else {
                res.send({ code: 0, msg: '没有查找到数据' });
            }
        })

    },
    addbill: (req, res, next) => {
        const { type, icon, title, common, money } = req.body;
        if (!type || !icon || !title || !common || !money) {
            return res.send({ code: 2, msg: '参数不完整' })
        }
        let data = new Date();
        let time = {
            y: data.getFullYear(),
            m: data.getMonth() + 1,
            d: data.getDate()
        }
        req.body.time = time.y + '-' + time.m + '-' + time.d;
        curd.insert(db, collection, req.body, (result) => {
            if (result) {
                res.send({ code: 1, msg: 'success' });
            } else {
                res.send({ code: 0, msg: '添加失败' });
            }
        })
    },
    delbill: (req, res, next) => {
        const _id = req.query._id;
        if (!_id) {
            return res.send({ code: 2, msg: '参数不完整' })
        }
        curd.remove(db, collection, { _id: _id }, (result) => {
            if (result.result.n) {
                res.send({ code: 1, msg: 'success' });
            } else {
                res.send({ code: 0, msg: '删除失败' });
            }
        })
    }
}