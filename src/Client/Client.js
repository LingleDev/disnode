const websocket = new (require('../webSocket.js').WebSocket)
const connect = websocket.connect
const isConnected = require('../webSocket.js').isConnected
const socket = require('../webSocket.js').ws
const rest = require('../REST/RESTManager.js')
/** 
 * @param {String}[token] Your application's token
*/

class Client {
  /**
   * Logs into Discord.
   */
  login(token) {
    connect(token)
  }

  destroy() {
    process.exit(666)
  }

  sendMsg(id, content) {
    rest.createMsg(id, content)
  }

  setStatus(status) {
    websocket.updateStatus(status)
  }

  setPresence(game, options, status) {
    //if (typeof(options) !== Object) throw new Error("Options must be an object.");
    websocket.updatePresence(game, options, status)
  }
}

module.exports = Client