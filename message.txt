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
        Client.on(eventName, Event.bind(null, Client)); // Supply Event Callback
    });
});

//-- Command List Creation \\--
Client.commands = new Enmap();
FileSystem.readdir("./Commands/", (err, files) => {
    if (err) return console.log(err); // Error Handling
    //-- Loop Through Files --\\
    files.forEach(file => {
        if (!file.endsWith(".js")) return; // Confirm It Is JS File
        const Command = require(`./Commands/${file}`); // Get Command
        let commandName = file.split(".")[0];
        console.log(`[LOAD EVENT] Loading Command: ${commandName}`);
        Client.commands.set(commandName, Command);
    });
});

//-- Roblox Cookie Login --\\
async function CookieLogin() { await Roblox.cookieLogin("[KYLE PLACE THE COOKIE IN HERE DIMWIT]"); }
CookieLogin();

//-- Join Request Even Handler --\\
let event = Roblox.onJoinRequestHandle(3365840);
event.on("data", (request) => {
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
});

//-- Client Login --\\
client.login(config.token);