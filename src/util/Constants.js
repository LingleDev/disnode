const constants = {
  baseURL: "https://discordapp.com/api",
  opCodes: {
    identify: 2,
    heartbeat_send: 1,
    heartbeat_recieve: 11,
    hello: 10,
    incorrect_token: 4004
  },
  statusTypes: ["online", "idle", "dnd", "invisible"]
}

module.exports = constants