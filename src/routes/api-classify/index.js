/*
 * @Author: dingpengfei 
 * @Date: 2019-03-21 15:41:00 
 * @Last Modified by: dingpengfei
 * @Last Modified time: 2019-03-21 20:00:17
 * @function [分类的业务逻辑]
 */
const curd = require('mongodb-curd');
const db = 'lemon';

module.exports = {
    custom: (req, res, next) => {
        curd.find(db, 'custom', {}, (result) => {
            if (result) {
                res.send({ code: 1, data: result })
            } else {
                res.send({ code: 0, msg: 'error' })
            }
        })
    },
    addcustom: (req, res, next) => {
        console.log(req.body);
        const { icon, title, type, common } = req.body;
        if (!icon || !title || !type || !common) {
            return res.send({ code: 2, msg: '参数不正确' });
        }
        curd.insert(db, 'classify', req.body, (result) => {
            if (result) {
                res.send({ code: 1, data: result });
            } else {
                res.send({ code: 0, msg: 'error' });
            }
        })
    },
    findclassify: (req, res, next) => {
        const { type, common } = req.query;
        if (!type || !common) {
            return res.send({ code: 2, msg: '参数不完整' });
        }
        curd.find(db, 'classify', {
            "common": { $in: ["y", common] },
            "type": type
        }, (result) => {
            if (result) {
                res.send({ code: 1, data: result });
            } else {
                res.send({ code: 0, msg: 'error' });
            }
        })
    }
}