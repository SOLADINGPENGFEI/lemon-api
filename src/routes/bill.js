const express = require('express');
const router = express.Router();
const bill = require('./api-bill');
/* 
    查找账单
*/
router.post('/api/getbill', bill.findbill);
/**
 * 添加账单
 */
router.post('/api/addbill', bill.addbill);
/**
 * 删除账单
 */
router.get('/api/delbill', bill.delbill);
module.exports = router;