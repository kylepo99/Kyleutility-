//-- Requires --\\
const Roblox = require("noblox.js");
const DiscordJS = require("discord.js");
const start_time = Date.now();

console.log('start')
module.exports.run = (client, message, args) => {

  var sec_num = parseInt(process.uptime(), 10); // don't forget the second param
  var hours   = Math.floor(sec_num / 3600) 
  var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
  var seconds = sec_num - (hours * 3600) - (minutes * 60);



  const Embed = new DiscordJS.RichEmbed()
                        .setTitle("Uptime")
                        .addField("The bot has been up for",`${hours} Hours ${minutes} Minutes and ${seconds} Seconds`)
                        .setColor("0x6bfe25");
                        message.channel.send(Embed);     
                        return



}

module.exports.config = {
  usage: ";uptime",
  description: "Prints the uptime of the bot",
  aliases: ['up']
}
