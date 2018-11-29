const Client = require('../Client/Client')

module.exports = class Guild {
  constructor(obj) {
    for (const [key, value] of Object.entries(obj)) {
      this[key] = value;
    }
  }
  
  ban(userid, reason) {
    const snekfetch = require('snekfetch')
    snekfetch.put(`https://discordapp.com/api/guilds/${this.id}/bans/${userid}`)
    .set("Authorization", `Bot ${new Client().token}`)
    .set("Content-Type", "application/json")
    .send({ "delete-message-days": 7 })
    .send({ "reason": reason || "no reason provided." })
  }
}
