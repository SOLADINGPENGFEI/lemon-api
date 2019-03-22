const express = require('express');
const router = express.Router();
const classify = require('./api-classify');
/* 
    查找图标
*/
router.get('/api/getclassify', classify.custom);
/**
 * 添加自定义图标
 */
router.post('/api/addclassify', classify.addcustom);
/**
 * 查找分类接口
 */
router.get('/api/findclassify', classify.findclassify);
module.exports = router;