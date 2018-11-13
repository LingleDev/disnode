const snekfetch = require('snekfetch')
const baseURL = require('../util/Constants').baseURL
const token = require('../../index.js').token
class RESTManager {
  createMsg(channelid, content) {
    snekfetch.post(`${baseURL}/channels/${channelid}/messages`)
    .set("Authorization", `Bot ${process.env.token}`)
    .set("Content-Type", "application/json")
    .send({
      content: content,
      tts: false
    })
    .then(r => {
      console.log(r.body)
    })
  }
}

module.exports = new RESTManager

