//-- Promote Command --\\
module.exports.run = (client, message, args) => {
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    //-- Check Member Stuff --\\
    if (!member) {
        const exampleEmbed = new Discord.RichEmbed()
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
    let allowedRole = message.guild.roles.find("name", "Grand Magistrate");
}