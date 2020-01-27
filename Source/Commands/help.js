//-- Requires --\\
const DiscordJS = require("discord.js");
const FileSystem = require("fs");

//-- Help Command --\\
module.exports.run = (client, message, args) => {
  let i = 0;
  const Embed = new DiscordJS.RichEmbed();
  Embed.setAuthor("Command List");
  FileSystem.readdir("./Commands/", (err, files) => {
    if (err) return console.error(err.message);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let commandName = file.split(".")[0];
      let props = require(`../Commands/${file}`);
      let usage = props.config.usage;
      let description = props.config.description;
      Embed.addField(commandName, `[${usage}] ${description}`, true);
      i++;
      if (i == files.length) {
        Embed.setColor("0x7cfc00")
        Embed.setTimestamp();
        Embed.setFooter("KyleUtility");
        message.channel.send(Embed);
      }
    });
  });
}

module.exports.config = {
  usage: ";help",
  description: "Gives a list of commands",
  aliases: "h"
}