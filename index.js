const rbx = require("noblox.js")
const Discord = require("discord.js");
var fs = require('fs');

const client = new Discord.Client();









async function startApp () {
    await rbx.cookieLogin("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_67D9663244B6A3730A44ABB5A12E8BA51D3C5915203883399689F164F5B22C5CAD7C5AAB8E087D3AE5B27032261A1E0A4FCCA4A1279CDF50D2F4D5F0A513BD8012F921E273ADAC1D1A7E438AE011605E8D55AE4F6B946F16D847608C0D4C1E8B6964DC747D222C33D418E82557A53F7BC8F09BD2A2662F2DE4BD1293E59826F60E84E976BD46A3197D56D4A66ECC040420A6D02EACA430422F26F8DC030AF333394BCE25EEBCA8E17B62D1A3100A634A4D494BB9F6738872D277D27E4E67FA644F165C9B0D51E3E97379180060C224848A8B39030A0A698E46C0C41D631C32085EDABB19426E86D7579D1CC60DFC7E0F4025D477980759F811ECCCCBEFF5BD08211830628C8F387FC954E444C1D8FE1B404D58B83858615A98B22483B025868EB9FD85B2")
    // Do everything else, calling functions and the like.
    let currentUser = await rbx.getCurrentUser()

}
//var cool_down = true

var hello = 2

const config = require("./config.json");

















client.on("ready", () => {
  console.log("Bot is ready")


})









//
//function alertFunc() {
//  cool_down = true


//}



  function new_member(request,info) {
    const sssssss =  client.channels.get("399481257169256458")





    var dates = request.date
    const exampleEmbed = new Discord.RichEmbed()
    .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + request.username)
    .setTitle("✔️ " + request.username + " Was accepted into the group ✔️")
    .addField("The time of date was ", dates, true)
    .addField("The account's age is ", info.age, true)
    .setColor("0x3feb43")
  sssssss.send(exampleEmbed)



  }


  function newdecliend(request,info) {
  const sendto = client.guilds.get("342162204566487040").channels.get("399481257169256458")


  var usernamez = request.username
  var dates = request.date
  const exampleEsadasdsambed = new Discord.RichEmbed()
  .setThumbnail("https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=" + usernamez)
  .setTitle("❌ " + usernamez + " Was **NOT** accepted into the group ❌")
  .addField("The time of date was ", dates, true)
  .addField("The account's age is ", info.age, true)
  .setColor("0xb00000")
    sendto.send(exampleEsadasdsambed)


}





startApp()




var evt = rbx.onJoinRequestHandle(3365840)
evt.on('data', function ok(request) {
  console.log("Running function")
	rbx.getIdFromUsername(request.username).then(function (id) {
		rbx.getPlayerInfo(id)
			.then(function(info) {
				if (info.age > 60) { // checks age
					evt.emit('handle', request, true, function () {
						// accepts them  then runs a function to send a message to discord
						console.log("Accepted " + request.username + info.age)
						new_member(request, info)
						return
					})
				}else {
				evt.emit('handle', request, false, function () {
					// age is below 60, denies them and runs a function that send a message to discord
					console.log("Denied " + request.username + info.age)
					newdecliend(request, info)
				})
      }
			}).catch((err) => console.log(err))
	}).catch((err) => console.log(err))
})




client.on("message", async message => {

if(message.channel.type == "dm" || message.channel.type == "group") return;

  if(message.content.indexOf(config.prefix) !== 0) return;






  const args = message.content.split(/\s+/g);
  const command = args.shift().slice(config.prefix.length).toLowerCase();




if(command.toLowerCase() == "setrank") {



    let member = message.mentions.members.first() || message.guild.members.get(args[0]);

            if (!member) {
            	const exampleEmbed = new Discord.RichEmbed()
              .setTitle("⚠️ Error⚠️ ")
              .addField("You forgot to tag someone", "tag a person", false)
              .setColor("0xb00000")
              .setFooter("Dummbass")
              message.channel.send(exampleEmbed)
              return
            }



                          if(message.mentions.members.first().id === message.author.id) {
                            message.reply("Do not try to promote your self")
                            return
                          }


    if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
      const sssssdada = new Discord.RichEmbed()
      .setTitle("⚠️ Error⚠️ ")
      .addField("You don't got the permissions", "Get somee permissions", false)
      .setColor("0xb00000")
      .setFooter("Dumbass")
      message.channel.send(sssssdada)
      return
    }



    const rank = args.slice(1).join(' ');
    if(!rank) {
    const norank = new Discord.RichEmbed()
    .setTitle("⚠️ Error⚠️ ")
    .addField("You forgot the rank", "supply a rank", false)
    .setColor("0xb00000")
    .setFooter("Dumbass")
    message.channel.send(norank)
    return
  }

  var result = member.nickname.substring(member.nickname.indexOf("]")+1).trim();
  var authors = message.member.nickname.substring(message.member.nickname.indexOf("]")+1).trim();




  let allowedRole = message.guild.roles.find("name", "Grand Magistrate");



  if(message.member.roles.has(allowedRole.id)){
    authors = "kylepo9999"
  }
  rbx.getIdFromUsername(authors)
     .then(function functionName(lolk) {
        rbx.getIdFromUsername(result)
           .then(function functionName(id) {
              var options = {
                 group: 3365840,
                 target: id,
                 name: rank
              }
              rbx.getRankInGroup(3365840, lolk)
                 .then(function functionName(zoink) {
                    rbx.getRole(3365840, rank)
                       .then(function functionName(jewrole) {
                          if (zoink < 180 && jewrole.rank >= 150) {
                             message.reply("You cannot do that")
                             return
                          }

              rbx.setRank(options)
                 .then(function(newRole) {
                    console.log('The new role is: ' + JSON.stringify(newRole));
                    const sssssuccess = new Discord.RichEmbed()
                       .setTitle("✔️ Success ✔️ ")
                       .addField("Promotion successfull")
                       .addField(" have ranked " + member.nickname + " To " + rank)
                       .setColor("0x6bfe25")
                    message.channel.send(sssssuccess)
                    member.setNickname("[" + rank + "]" + " " + result)
                    return
                 })
                 .catch(function (err) {
                   message.reply(err.message)
                 })


               });
         })
         .catch(function (err) {
           message.reply(err.message)
         })


           })
	.catch(function (err) {
           message.reply(err.message)
         })

     }).catch((err) => console.error(err.message));
   }

/*

if(command === "ssu") {
  console.log("test")

  if(cool_down === true) {
    cool_down = false
  if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
    message.reply("You don't have authorization")
    return
  }
    message.channel.send("@here" + "  " +  message.author + " Is hosting a SSU at " + "https://www.roblox.com/games/2625794666/Facility-Nu-14")

    message.delete()
  }
  else{
    message.reply("There is a cool down")
  }
}



if(command === "cshutdown") {
  if (!message.member.hasPermission('KICK_MEMBERS')) {
    message.reply("No permissions")
    return
  }
  let sadsada = message.guild.roles.find('name', 'Personnel')
  message.channel.overwritePermissions(sadsada, {
    SEND_MESSAGES: false
  })
  let executive = message.guild.roles.find('name', 'Executive')
  message.channel.overwritePermissions(executive, {
    SEND_MESSAGES: false
  })
  let testsubject = message.guild.roles.find('name', 'Test Subject')
  message.channel.overwritePermissions(testsubject, {
    SEND_MESSAGES: false
  })
  message.reply("Shutting down chat")


}
if(command === "unshutdown") {

  if (!message.member.hasPermission('KICK_MEMBERS')) {
    return
  }
    let sadsada = message.guild.roles.find('name', 'Personnel')
  message.channel.overwritePermissions(sadsada, {
    SEND_MESSAGES: true
  })
  let executive = message.guild.roles.find('name', 'Executive')
  message.channel.overwritePermissions(executive, {
    SEND_MESSAGES: true
  })
  let testsubject = message.guild.roles.find('name', 'Test Subject')
  message.channel.overwritePermissions(testsubject, {
    SEND_MESSAGES: true
  })
  message.reply("Unshutting down chat")



}
*/





console.log(command)
if(command.toLowerCase() == "promote") {







      let member = message.mentions.members.first() || message.guild.members.get(args[0]);


              if (!member) {
              	const exampleEmbed = new Discord.RichEmbed()
                .setTitle("⚠️ Error⚠️ ")
                .addField("You forgot to tag someone", "tag a person", false)
                .setColor("0xb00000")
                .setFooter("Dummbass")
                message.channel.send(exampleEmbed)
                return
              }


              if(message.mentions.members.first().id === message.author.id) {
                message.reply("Do not try to promote your self")
                return
              }




      if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
        const sssssdada = new Discord.RichEmbed()
        .setTitle("⚠️ Error⚠️ ")
        .addField("You don't got the permissions", "Get somee permissions", false)
        .setColor("0xb00000")
        .setFooter("Dumbass")
        message.channel.send(sssssdada)
        return
      }


    var result = member.nickname.substring(member.nickname.indexOf("]")+1).trim();
    var authors = message.member.nickname.substring(message.member.nickname.indexOf("]")+1).trim();
    let allowedRole = message.guild.roles.find("name", "Grand Magistrate");



    if(message.member.roles.has(allowedRole.id)){
      authors = "kylepo9999"
    }
    rbx.getIdFromUsername(authors)
    .then(function functionName(lol) {
        rbx.getIdFromUsername(result)
        .then(function functionName(id) {
          rbx.getRankInGroup(3365840,lol)
          .then(function  functionName(rank) {
            console.log(rank)
          var options = {
            group: 3365840,
            target: id,

          }
          rbx.promote(options)
            .then(function(suck) {
              if(rank < 180 && suck.newRole.rank >=	 150) {
                message.reply("You don't have permissions to promote someone to executive")
                rbx.demote(options)
                return
              }
              console.log('The new role is: ' + JSON.stringify(suck));
              const sssssuccess = new Discord.RichEmbed()
              .setTitle("✔️ Success ✔️ ")
              .addField("Promotion successfull","⠀⠀⠀⠀⠀⠀⠀⠀⠀")
              .addField(" I have promoted " + member.nickname  + " To " + suck.newRole.name,"⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀")
              .setColor("0x6bfe25")
              message.channel.send(sssssuccess)
              member.setNickname("[" + suck.newRole.name + "]" + " " +  result)
              return
            })
            .catch(function (err) {
              message.reply(err.message)
            })

          })
          .catch(function (err) {
            message.reply(err.message)
          })
      })
    })
  }





        if(command === "demote") {

              let member = message.mentions.members.first() || message.guild.members.get(args[0]);

                      if (!member) {
                      	const exampleEmbed = new Discord.RichEmbed()
                        .setTitle("⚠️ Error⚠️ ")
                        .addField("You forgot to tag someone", "tag a person", false)
                        .setColor("0xb00000")
                        .setFooter("Dummbass")
                        message.channel.send(exampleEmbed)
                        return
                      }



              if (!message.member.hasPermission('VIEW_AUDIT_LOG')) {
                const sssssdada = new Discord.RichEmbed()
                .setTitle("⚠️ Error⚠️ ")
                .addField("You don't got the permissions", "Get somee permissions", false)
                .setColor("0xb00000")
                .setFooter("Dumbass")
                message.channel.send(sssssdada)
                return
              }


            var result = member.nickname.substring(member.nickname.indexOf("]")+1).trim();

                rbx.getIdFromUsername(result)
                .then(function functionName(id) {
                  var options = {
                    group: 3365840,
                    target: id,
                  }
                  rbx.demote(options)
                    .then(function(suck) {
                      console.log('The new role is: ' + JSON.stringify(suck));
                      const sssssuccess = new Discord.RichEmbed()
                      .setTitle("✔️ Success ✔️ ")
                      .addField("Demotion successfull")
                      .addField(" I have demote " + member.nickname  + " To " + suck.newRole.name)
                      .setColor("0x6bfe25")
                      message.channel.send(sssssuccess)
                      member.setNickname("[" + suck.newRole.name + "]" + " " +  result)
                      return
                    })
                  });
                }





if(command === "ra") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  var result = member.nickname.substring(member.nickname.indexOf("]")+1).trim();


  fs.writeFile('./Restricted_access/' + result + ".txt", result, function (err) {
  if (err) throw err;
  console.log("saved " + result);
    rbx.getIdFromUsername(result)
    .then(function(id) {
      var options = {
        group: 3365840,
        target: id,
        name: "Restricted Access"
      }
      rbx.setRank(options)
         .then(function(newRole) {
            console.log('The new role is: ' + JSON.stringify(newRole));
            const sssssuccess = new Discord.RichEmbed()
               .setTitle("✔️ Success ✔️ ")
               .addField("Set rank successfull")
               .addField(" I have ranked " + member.nickname + " To " + "Restricted Access")
               .setColor("0x6bfe25")
            message.channel.send(sssssuccess)
            if(result.length + 19 > 32) {
              member.setNickname("[" + "RA" + "]" + " " + result)
              return
            }
            member.setNickname("[" + "Restricted Access" + "]" + " " + result)
            return
         })
         .catch(function (err) {
           message.reply(err.message)
         })

    })




})
}




/*
if(command === "unra") {
  let member = message.mentions.members.first() || message.guild.members.get(args[0]);
  var result = member.nickname.substring(member.nickname.indexOf("]")+1).trim();


  fs.unlink('./Restricted_access/' + result + ".txt", function (err) {
  if (err) throw err;
  console.log("saved " + result);
    rbx.getIdFromUsername(result)
    .then(function(id) {
      var options = {
        group: 3365840,
        target: id,
        name: "Test Subject"
      }
      rbx.setRank(options)
         .then(function(newRole) {
            console.log('The new role is: ' + JSON.stringify(newRole));
            const sssssuccess = new Discord.RichEmbed()
               .setTitle("✔️ Success ✔️ ")
               .addField("Set rank successfull")
               .addField(" I have ranked " + member.nickname + " To " + "Test Subject")
               .setColor("0x6bfe25")
            message.channel.send(sssssuccess)
            if(result.length + 19 > 32) {
              member.setNickname("[" + "TS" + "]" + " " + result)
              return
            }
            member.setNickname("[" + "Test Subject" + "]" + " " + result)
            return
         })
         .catch(function (err) {
           message.reply(err.message)
         })

    })




})
}

*/


if(command === "help") {
  const command_LIST = new Discord.RichEmbed()
  .setAuthor("Command List")
  .addField("SetRank",';SetRank @user Access ', true)
  .addField("Promote",';Promote @user', true)
  .addField("Demote",';Demote @user', true)
  .addField("~~SSU~~",'~~;SSU~~ **Temporaily removed**', true)
  .addField("Help",';help', false)
  .setColor("0xef7ede")
  message.channel.send(command_LIST)





}

}





);




client.login(config.token);
