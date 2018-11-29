const EventEmitter = require('events')
const Collection = require('../util/Collection')
const websocket = require("../webSocket.js")

module.exports = class Client extends EventEmitter {
  constructor() {
    super();
    this.token = null;
    this.guilds = new Collection()
    this.channels = new Collection()
    this.users = new Collection()
  }
  
  login(token) {
    websocket.connect(token)
    this.token = token
  }
  
  setStatus(status) {
    websocket.setStatus(status)
  }
}
