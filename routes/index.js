var express = require('express');
var wechat = require('wechat');
var router = express.Router();

var config = {
    token: '5607578eb4521a402dd5ad76',
    appid: 'wx3ca1374a4a4d6706',
    encodingAESKey: 'kywuD7O1ulEvM2XBbI9gG7GZ7K5pJEZFnpo4LEsYaR3'
};

router.use('/', wechat(config, function (req, res, next) {
    // 微信输入信息都在req.weixin上
    var message = req.weixin;
    console.log(req.weixin);
    if (message.Content === 'diaosi') {
        // 回复屌丝(普通回复)
        res.reply('hehe');
    } else if (message.Content === 'text') {
        //你也可以这样回复text类型的信息
        res.reply({
            content: 'text object',
            type: 'text'
        });
    } else if (message.Content === 'hehe') {
        // 回复一段音乐
        res.reply({
            type: "music",
            content: {
                title: "来段音乐吧",
                description: "一无所有",
                musicUrl: "http://mp3.com/xx.mp3",
                hqMusicUrl: "http://mp3.com/xx.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        });
    } else {
        // 回复高富帅(图文回复)
        res.reply([
            {
                title: '你来我家接我吧',
                description: '这是女神与高富帅之间的对话',
                picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
                url: 'http://nodeapi.cloudfoundry.com/'
            }
        ]);
    }
}));

module.exports = router;
