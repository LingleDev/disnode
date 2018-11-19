const EventEmitter = require('events')
const Collection = require('../util/Collection')
const websocket = require("../webSocket.js")

module.exports = class Client extends EventEmitter {
  constructor(token, options) {
    super();
    
    this.guilds = new Collection()
    this.users = new Collection()
    this.channels = new Collection()
    
    this.token = token
    this.readyAt = 0;
    this.user = null;
    this.sessionId = null;
    
  }
  
  login() {
    websocket.connect(token)
  }
}
