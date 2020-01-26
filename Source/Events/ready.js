module.exports = (client) => {
    console.log("[START UP] Bot Is Ready");
    client.user.setPresence({
        game: {
            name: 'Operational-Base-36',
            type: "PLAYING",
            url: "https://www.roblox.com/games/2625794666/Operational-Base-36"
        }
    });
}