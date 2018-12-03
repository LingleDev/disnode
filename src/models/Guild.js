module.exports = class Guild {
  constructor(obj, client) {
    for (const [key, value] of Object.entries(obj)) {
      this[key] = value;
    }
    
    this.client = client
  }
  
  ban(userid, reason) {
    const snekfetch = require('snekfetch')
    snekfetch.put(`https://discordapp.com/api/guilds/${this.key}/bans/${userid}`)
    .set("Authorization", `Bot ${this.client.token}`)
    .set("Content-Type", "application/json")
    .send({ "delete-message-days": 7 })
    .send({ "reason": reason || "no reason provided." })
  }
}
