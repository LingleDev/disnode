const discord = require('./src/Client/Client.js')
const bot = new discord()

bot.login(process.env.token)

setTimeout(() => {
  bot.setPresence("with ur mom", {type: "PLAYING"}, "dnd")
}, 2500)