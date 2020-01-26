//-- Requires --\\
const DiscordJS = require("discord.js");
const FileSystem = require("fs");

//-- Help Command --\\
module.exports.run = (client, message, args) => {
  const Embed = new DiscordJS.RichEmbed();
  Embed.setAuthor("Command List");
  FileSystem.readdir("../Commands/", (err, files) => {
    if (err) return console.error(err.message);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let commandName = file.split(".")[0];
      let props = require(`../Commands/${file}`);
      let usage = props.config.usage;
      let description = props.config.description;
      Embed.addField(commandName, `[${usage}] ${description}`, true);
    });
  });
  Embed.setColor("0xef7ede");
  Embed.setTimestamp();
  Embed.setFooter("KyleUtility");
  message.channel.send(Embed);
}

module.exports.config = {
  usage: ";help",
  description: "Gives a list of commands"
}

// .addField("SetRank",'[SetRank @user , Rank] Changes the select users rank to the selected.', true)
// .addField("Promote",'[Promote @user] Promotes the select users rank to the next rank.', true)
// .addField("Demote",'[Demote @user] demotes the select users rank to the previous rank.', true)
// .addField("Help",'[Help] Opens this window. ', true)