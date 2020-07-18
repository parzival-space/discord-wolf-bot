const DiscordJS = require('discord.js');
const {requestLyricsFor, requestAuthorFor, requestIconFor, requestTitleFor} = require("solenolyrics"); 

/**
 * Dieser Befehl zeigt die Lyrics eines Liedes an
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    var s = -1;
    bot.music.server.forEach((c, i) => {
        if (c.id === msg.channel.guild.id) s = i;
    });
    //if (s == -1) return;

    var search = `${args[0] || ""}`;
    if (s != -1) {
        if (bot.music.server[s].queue[0] && search == "") search = bot.music.server[s].queue[0].title;
    }

    // Diese Nachricht zeigt dem Benutzer das der Bot nach den Lyrics des aktuellen Liede Sucht
    var waiter = msg.channel.send(new DiscordJS.MessageEmbed().setDescription("Looking up lyrics..."));

    // Sucht nach dem richtigen Titel
    var title = await requestTitleFor(search);

    // Sucht nach den Lyrics und dann nach Icon und Author
    var lyrics = await requestLyricsFor(title);
    var icon = await requestIconFor(title);
    var author = await requestAuthorFor(title);

    if (lyrics.length > 2040) lyrics = `${lyrics.slice(0, 2040)}...`;

    (await waiter).delete();

    var resp = new DiscordJS.MessageEmbed()
        .setAuthor(`${bot.user.username} - Lyrics`, bot.user.avatarURL())
        .setTitle(`${author} - ${title}`)
        .setDescription(`${lyrics}`)
        .setImage(`${icon}`)
        .setFooter("This command is WIP and may not work as expected.")
        .setColor(0x000000);
    return msg.channel.send(resp)


};

/**
 * Command description
 */
module.exports.help = {
    name: 'lyrics',
    description: 'Lyrics baby!',
    args: '[song title]',
    hidden: false,
    permissions: [
        "CONNECT"
    ]
};