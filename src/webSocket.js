var tok;
var WebSocket = require("ws"), ws = new WebSocket("wss://gateway.discord.gg/?encoding=json&v=6")
const statusTypes = require('./util/Constants').statusTypes
function connectToGate(token) {
tok=token
var sequence = 0;
ws.onopen = function() {
    return console.log("OPEN!")
}, ws.onerror = function(a) {
    console.error(a), process.exit(1)
}, ws.onclose = function(a) {
    console.error(a), process.exit(1)
}, ws.onmessage = function(a) {
    try {
        var b = JSON.parse(a.data);
        if (0 === b.op) return;
        console.log(b.op), sequence = b.s, 10 === b.op && (ws.send(JSON.stringify({
            op: 2,
            d: {
                token: token,
                properties: {
                    $browser: "b1nzy is a meme"
                },
                large_threshold: 50
            }
        })), setInterval(function() {
            ws.send(JSON.stringify({
                op: 1,
                d: sequence
            }))
        }, b.d.heartbeat_interval))
    } catch (a) {
        console.error(a)
    }
};
}

module.exports.WebSocket = class WebSocket {
  connect(token) {
    connectToGate(token)
  }

  updateStatus(status) {
    if (!statusTypes.includes(status)) throw new TypeError(`${status} isn't a valid Discord status type!`);
    try {
      ws.send(JSON.stringify({
        op: 3,
        d: {
          since: null,
          game: {
            name: null,
            type: null
          },
          status: status,
          afk: false
        }
      }))
    } catch (err) {
      console.error(err)
    }
  }

  updatePresence(game, options, status) {
    if (!statusTypes.includes(status)) throw new Error("Not a valid Discord Status type!")
    const presencetypes = {
      "playing": "PLAYING",
      "streaming": "STREAMING",
      "listening": "LISTENING",
      "watching": "WATCHING"
    }
    if (options.type == presencetypes.playing) {
      try {
        ws.send(JSON.stringify({
          op: 3,
          d: {
            since: null,
            game: {
              name: game,
              type: 0
            },
             status: status,
             afk: false
          }
        }))
      } catch (err) { console.error(err) }
    }  else if (options.type == presencetypes.streaming) {
            try {
              ws.send(JSON.stringify({
                op: 3,
                d: {
                  since: null,
                  game: {
                    name: game,
                    type: 1
                  },
                  status: status,
                  afk: null
                }
              }))
            } catch (err) { console.error(err) }
          } else if (options.type == presencetypes.listening) {
            try {
              ws.send(JSON.stringify({
                op: 3,
                d: {
                  game: {
                    name: game,
                    type: 2
                  },
                  status: status,
                  afk: null
                }
              }))
            } catch (err) { console.log(err) }
          } else if (options.type == presencetypes.watching) {
            try {
              ws.send(JSON.stringify({
                op: 3,
                d: {
                  game: {
                    name: game,
                    type: 3
                  },
                  status: status,
                  afk: null
                }
              }))
            } catch (err) { console.error(err) }
          }
  }
}