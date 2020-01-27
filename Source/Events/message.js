// On Message Event \\
module.exports = (client, message) => {
    // Basic Error Handling \\
    if (message.author.bot) return;
    if (message.content.indexOf(client.config.prefix) !== 0) return;
    if (message.channel.type == "dm" || message.channel.type == "group") return;

    // Create Arguments And Get Command \\
    const Arguments = message.content.slice(client.config.prefix.length).trim().split(/ +/g);
    const Command = Arguments.shift().toLowerCase();

    // Get Command Props & Confirm It Exists \\
    const Cmd = client.commands.get(Command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(Command));
    if (!Cmd) return;

    // Run The Command \\
    Cmd.run(client, message, Arguments);
}