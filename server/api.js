"use strict";
const models = require('./db');
const express = require('express');
const router = express.Router();
const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');

/* 注册接口 */
router.post('/api/createUser', (req, res) => {
  let data = {
    ret: '',
    msg: '',
    token: ""
  }
  let user = new models.user({
    name: req.body.name,
    password: req.body.password
  })
  models.user.find({
    name: req.body.name
  }, (err, doc) => {
    if (err) {
      console.log(err)
    } else {
      console.log(doc, "====")
      if (doc.length == 0) {
        user.save((err, response) => {
          if (err) {
            data.ret = -2
            data.msg = "注册失败"
            res.send(data)
          } else {
            data.ret = 1
            data.msg = "注册成功"
            data.token = response._id
            data.name = response.name
            res.send(data)
          }
        })
      } else {
        data.ret = -1
        data.msg = "该用户已注册"
        res.send(data)
      }
    }
  })
})



/*登录接口*/
router.post("/api/login", (req, res) => {
  let data = {
    ret: '',
    msg: ''
  }
  let user = {
    name: req.body.name,
    password: req.body.password
  }
  models.user.findOne(user, (err, doc) => {
    if (err) {
      console.log("error:" + err)
    } else {
      if (doc) {
        data.ret = 1,
          data.msg = "登录成功"
        data.token = doc._id
        data.name = doc.name
        res.send(data)
      } else {
        data.ret = -1
        data.msg = "用户名或密码错误"
        res.send(data)
      }
    }
  })
})

//个人信息完善
router.post("/api/userInfo", (req, res) => {
  let data = {}
  let params = {
      name: req.body.name,
      gameName: req.body.gameName,
      phone: req.body.phone,
      sex: req.body.sex,
      position: req.body.position,
      image: req.body.image
    }
    // models.user.update({
    //   "name": params.name
    // }, params).then((err, result) => {
    //   console.log(err, result)
    //   res.send("success")
    // })
  console.log(params.name)
  models.user.update({
    "name": params.name
  }, params, function(err, dre) {
    if (err) {
      console.log(err)
    } else {
      console.log(dre, "dre")
      data = params
      res.send(data)
    }

  })
})

// 爬虫爬取攻略
router.get('/api/article', (req, res) => {
    superagent.get("http://coc.5253.com/tag/269605707590.html").end((err,
      html) => {
      // console.log(html)
      let $ = cheerio.load(html.text)
      let listArr = [];
      for (var i = 0; i < 50; i++) {
        let href = $("#list-page").find("a").eq(i).attr("href");
        let title = $("#list-page").find("a").eq(i).attr(
          "title")
        let item = {
          href: href,
          title: title
        }
        if (item.title) {
          listArr.push(item)
        }
      }
      res.send(listArr)
    })
  })
  // 攻略详情
router.post('/api/articleDetail', (req, res) => {
    let href = req.body.href ? req.body.href : ""
    let url = "http://coc.5253.com" + href
    console.log(url, "url", req.body)
    superagent.get(url).end((err, html) => {
      let $ = cheerio.load(html.text)
      let content = $("#text").html()
        // console.log($.html(), url, href, "content")
      res.send(content)
    })
  })
  // 获取个人信息
router.post("/api/getUserInfo", (req, res) => {
    let token = req.body.token
    let data = {}
    models.user.findOne({
      _id: token
    }, (err, doc) => {
      if (err) {
        console.log("error:" + err)
      } else {
        if (doc) {
          data.ret = 1,
            data.msg = "登录成功"
          data.data = doc
          res.send(data)
        } else {
          data.ret = -1
          data.msg = "系统错误"
          res.send(data)
        }
      }
    })
  })
  // 部落成员
router.get("/api/getList", (req, res) => {
  let data = []
  models.user.find().then(response => {
    data = response
    res.send(data)
  })
})
module.exports = router;
