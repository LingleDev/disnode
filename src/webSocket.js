const ws = require('ws')
const socket = new ws(`wss://gateway.discord.gg/?v=6&encoding=json`)
var sequence;
module.exports.WebSocket = class WebSocket {
  connect(token) {
    socket.on('message', (a) => {
        const d = JSON.parse(a) || incoming
        sequence = d.s
        
        switch(d.op) {
            case: 10: /* Hello */
                setInterval(() => {
                    socket.send(JSON.stringify({
                        op: 1,
                        d: sequence
                    }, d.d.heartbeat_interval))
                }, d.d.hearbeat_interval)
                
                socket.send(JSON.stringify({
                    op: 2,
                    d: {
                        token: token,
                        properties: {
                            $os: "linux",
                            $browser: "discnode",
                            $device: "discnode"
                        },
                        large_threshold: 250,
                        compress: false
                    }
                }));
                break;
        }
    })
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
      playing: "PLAYING",
      streaming: "STREAMING",
      listening: "LISTENING",
      watching: "WATCHING"
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
