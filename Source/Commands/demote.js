//-- Requires --\\
const Roblox = require("noblox.js");
const DiscordJS = require("discord.js");

//-- Promote Command --\\
module.exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    //-- Check Member Stuff --\\
    if (!member) {
        const exampleEmbed = new DiscordJS.RichEmbed()
      .setTitle("⚠️ Error⚠️ ")
      .addField("You forgot to tag someone", "tag a person", false)
      .setColor("0xb00000")
      .setFooter("Dummbass")
      message.channel.send(exampleEmbed);
      return;
    }
    if(message.mentions.members.first().id === message.author.id) {
      message.reply("Do not try to promote your self");
      return;
    }
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
        const Embed = new DiscordJS.RichEmbed()
        .setTitle("⚠️ Error ⚠️")
        .addField("You Require ``VIEW_AUDIT_LOG`` Permissions", "Stop Trying", false)
        .setColor("0xb00000")
        .setFooter("Dumbass");
        message.channel.send(Embed);
        return;
    }
    //-- Variables --\\
    var result = member.nickname.substring(member.nickname.indexOf("]")+1).trim();
    var authors = message.member.nickname.substring(message.member.nickname.indexOf("]")+1).trim();
    let allowedRole = message.guild.roles.find(role => role.name === "Grand Magistrate")

    if(message.member.roles.has(allowedRole.id)) {
        authors = "kylepo9999"
    }
    Roblox.getIdFromUsername(authors).then((authorID) => {
      //-- Get Rank Of Person Being Ranked --\\
      Roblox.getIdFromUsername(result).then((userID) => {
          // Options
          let options = {
              group: 3365840,
              target: userID,
          };
          Roblox.getRankInGroup(options.group, authorID).then((groupRank) => {
                  if (groupRank < 180 && role.rank >= 150) {
                      message.reply("You do not hold the proper rank.");
                      return;
                  }
                  Roblox.demote(options).then((newRole) => {
                      console.log(`${authors} Has demoted ${member.nickname} To rank ${newRole.newRole.name}`);
                      const Embed = new DiscordJS.RichEmbed()
                      .setTitle(":white_check_mark: Success :white_check_mark:")
                      .addField("Status:","Demotion successfull")
                      .addField(`Information:`,`You have demoted ${member.nickname} To ${newRole.newRole.name}`)
                      .setColor("0x6bfe25");
                      message.channel.send(Embed);
                      member.setNickname(`[${newRole.newRole.name}] ${result}`);
                      return;
                  });
          }).catch((err) => message.reply(err.message));
      }).catch((err) => message.reply(err.message));
  }).catch((err) => message.reply(err.message));
}

module.exports.config = {
  usage: ";demote <user>",
  description: "demotes the user one rank."
}
