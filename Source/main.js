//-- Requires --\\
const DiscordJS = require("discord.js");
const Roblox = require("noblox.js");
const FileSystem = require("fs");
const Enmap = require("enmap");
const Config = require("./config.json");

//-- Create Client \\--
const Client = new DiscordJS.Client();
Client.config = Config;

//-- Event Handler --\\
FileSystem.readdir("./Events/", (err, files) => {
    if (err) return console.log(err); // Error Handling
    //-- Loop Through Files --\\
    files.forEach(file => {
        const Event = require(`./Events/${file}`); // Recieve Event
        let eventName = file.split(".")[0];
        console.log(Event)
        Client.on(eventName, Event.bind(null, Client)); // Supply Event Callback
    });
});



//-- Command List Creation \\--

Client.commands = new Enmap();
Client.aliases = new Enmap();
FileSystem.readdir("./Commands/", (err, files) => {
    if (err) return console.log(err); // Error Handling
    //-- Loop Through Files --\\
    files.forEach(file => {
        let i = 0;
        if (!file.endsWith(".js")) return; // Confirm It Is JS File
        const Command = require(`./Commands/${file}`); // Get Command
        let commandName = file.split(".")[0];
        console.log(`[LOAD EVENT] Loading Command: ${commandName}`);
        Client.commands.set(commandName, Command)
        if (Command.config.aliases.length > 0) {
            Command.config.aliases.forEach(alias => {
                Client.commands.set(Command.config.aliases[i], Command);
                i++;
            });
        }
    });
});

//-- Roblox Cookie Login --\\
async function CookieLogin() { await Roblox.cookieLogin("_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.|_F5EBC763F0351D5A281C899B145779BF11E958D5A15854EBEFFA2DAEF0B81B10B146B6C5631F8FECF03DCA39D2ACB334501BC852BDB279651E82E6E2D93064F96A5AB98FCCA021C42BFA7C662E741CCDA91AC4AF36E47AEEFFA4368745A71218C1D42E175C5F974BF6B9CC6E719AF45DBA4B1856C26FF17AFCC91008C142AC21259A9C5CC26D9ABABFAA76072674B30E9A6A495277F27BEEB6A8C4E2A1CAA91BE9B56EDFEE292744E588E6189C3CCC007E21249B905103EA41645095DB3E5CC65889C065E3CAE0FEDDD0FEB197EF9394C1F645304F6B11ACA952B88E926A9D7724528801DBD0B7C820CC6C045790798F629B5BF7F44C4D9633190A974C34906F38202382E64019B9272703BBA7B044B3BB71800A836DD5B1CA28C3F18038A848E8FF722E"); }
CookieLogin();

//-- Join Request Even Handler --\\
let event = Roblox.onJoinRequestHandle(3365840);

event.on('error', function(error) {
   console.log(`Error occured ${error}`);
  });


event.on("data", (request) => {
    if (request == null) return
    //-- Get ID From Player's User --\\
    Roblox.getIdFromUsername(request.username).then((id) => {
        //-- Get Information From Player --\\
        Roblox.getPlayerInfo(id).then((info) => {
            let channel = Client.channels.get("399481257169256458");
            let date = request.date;
            if (info.age > 60) {     
                event.emit("handle", request, true, () => {
                    console.log(`Accepted: ${request.username}, Age: ${info.age}`);
                    //-- Create Embed --\\
                    const Embed = new DiscordJS.RichEmbed()
                    .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=${request.username}`)
                    .setTitle(`✔️ ${request.username} was accepted into the group ✔️`)
                    .addField("The time of date was ", date, true)
                    .addField("The account's age is ", info.age, true)
                    .setColor("0x3feb43");
                    channel.send(Embed);
                });
            } else {
                event.emit("handle", request, false, () => {
                    console.log(`Denied: ${request.username}, Age: ${info.age}`);
                    //-- Create Embed --\\
                    const Embed = new DiscordJS.RichEmbed()
                    .setThumbnail(`https://www.roblox.com/Thumbs/Avatar.ashx?x=100&y=100&Format=Png&username=${request.username}`)
                    .setTitle(`❌ ${request.username} was not accepted into the group ❌`)
                    .addField("The time of date was ", date, true)
                    .addField("The account's age is ", info.age, true)
                    .setColor("0xb00000");
                });
            }
        }).catch((err) => console.error(err));
    }).catch((err) => console.error(err));
})

//-- Client Login --\\
Client.login(Config.token);