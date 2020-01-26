//-- Requires --\\
const Roblox = require("noblox.js");
const DiscordJS = require("discord.js");

//-- Promote Command --\\
module.exports.run = (client, message, args) => {

  const command_LIST = new DiscordJS.RichEmbed()
  .setAuthor("Command List")
  .addField("SetRank",'[SetRank @user , Rank] Changes the select users rank to the selected.', true)
  .addField("Promote",'[Promote @user] Promotes the select users rank to the next rank.', true)
  .addField("Demote",'[Demote @user] demotes the select users rank to the previous rank.', true)
  .addField("Help",'[Help] Opens this window. ', true)
  .setColor("0xef7ede")
  .setTimestamp()
  .setFooter("KyleUtility")
  message.channel.send(command_LIST)

    
}

