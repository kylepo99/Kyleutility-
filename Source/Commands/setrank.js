//-- Requires --\\
const Roblox = require("noblox.js");
const DiscordJS = require("discord.js");

//-- SetRank Command --\\
module.exports.run = (client, message, args) => {
    let member = message.mentions.member.first() || message.guild.member.get(args[0]);
    //-- Make Sure The Member Exists --\\
    if (!member) {
        const Embed = new DiscordJS.RichEmbed()
        .setTitle("⚠️ Error ⚠️")
        .addField("The User You Are Targeting Was Not Specified", "Try Tagging Someone, Or Adding Their ID", false)
        .setColor("0xb00000")
        .setFooter("Dummass");
        message.channel.send(Embed);
        return;
    }
    //-- Make Sure They Aren't Ranking Themeselves --\\
    if (member.id === message.author.id) {
        message.reply("Do Not Rank Youself, Dimwit.");
        return;
    }
    //-- Confirm The User Has The Correct Permissions --\\
    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
        const Embed = new DiscordJS.RichEmbed()
        .setTitle("⚠️ Error ⚠️")
        .addField("You Require ``VIEW_AUDIT_LOG`` Permissions", "Stop Trying", false)
        .setColor("0xb00000")
        .setFooter("Dumbass");
        message.channel.send(Embed);
        return;
    }
    //-- Get Target Rank & Confirm It Exists --\\
    const Rank = args.slice(1).join(' ');
    if (!Rank) {
        const Embed = new DiscordJS.RichEmbed()
        .setTitle("⚠️ Error ⚠️")
        .addField("This Rank Doesn't Exist, Or You Didnt Supply A Rank.", "Use A Valid Rank, Or Supply One,", false)
        .setColor("0xb00000")
        .setFooter("Dumbass");
        message.channel.send(Embed);
    }
    //-- Get Variables --\\
    let result = member.nickname.substring(member.nickname.indexOf("]") + 1).trim();
    let authors = message.member.nickname.substring(message.member.nickname.indexOf("]") + 1).trim();
    let allowedRole = message.guild.roles.find("name", "Grand Magistrate");
    //-- What Is This For? --\\
    if(message.member.roles.has(allowedRole.id)) {
        authors = "kylepo9999"
    }
    //-- Get Rank Of Person Ranking --\\
    Roblox.getIdFromUsername(authors).then((authorID) => {
        //-- Get Rank Of Person Being Ranked --\\
        Roblox.getIdFromUsername(result).then((userID) => {
            // Options
            let options = {
                group: 3365840,
                target: userID,
                name: Rank
            };
            Roblox.getRankInGroup(options.group, authorID).then((groupRank) => {
                Roblox.getRole(options.group, Rank).then((role) => {
                    if (groupRank < 180 && role.rank >= 150) {
                        message.reply("You do not hold the proper rank.");
                        return;
                    }
                    Roblox.setRank(options).then((newRole) => {
                        console.log(`The new role is: ${JSON.stringify(newRole)}`);
                        const Embed = new DiscordJS.RichEmbed()
                        .setTitle("✔️ Success ✔️ ")
                        .addField("Promotion successfull")
                        .addField(`You have ranked ${member.nickname} To ${Rank}`)
                        .setColor("0x6bfe25");
                        message.channel.send(Embed);
                        member.setNickname(`[${Rank}] ${result}`);
                        return
                    });
                }).catch((err) => message.reply(err.message));
            }).catch((err) => message.reply(err.message));
        }).catch((err) => message.reply(err.message));
    }).catch((err) => message.reply(err.message));
}