const DiscordJS = require('discord.js');

/**
 * @description Dieser Befehl schreibt eine Nachricht an alle Servermitglieder
 * @author Parzival
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {

    // Sendet eine Fehler-Nachricht sollte eine Nachricht gegeben sein die an alle geschickt werden ann.
    if (args.length < 1) {
        var prefix = bot.getGuildConfig(msg.guild).options.prefix;
        var err = new DiscordJS.MessageEmbed()
            .setTitle("You must provide at least one argument to use this command.")
            .setDescription(`Syntax: ${prefix}sendall <message>`)
            .setThumbnail("https://i.imgur.com/L9H79Sj.png")
            .setAuthor("Missing argument", bot.user.avatarURL())
            .setColor(0x000000);
        return msg.channel.send(err);
    }

    // Verarbeitet benötigte Daten
    var success = 0;
    var members = msg.guild.members.cache;
    var message = "";
    args.forEach((arg, i) => {
        message = `${message}${arg}`;
        if (i != (args.length - 1)) message = `${message} `;
    });

    // Bereite die Nachricht vor die an alle Mitglieder gesendet werden soll.
    var message = new DiscordJS.MessageEmbed()
        .setAuthor(`Message from ${msg.guild.name}`, msg.author.avatarURL())
        .setThumbnail(msg.guild.iconURL())
        .setFooter(`Message sent by ${msg.author.tag}`)
        .setDescription(message);

    // Sendet die Nachricht an alle Mitglieder aus dem Server
    members.forEach((member) => {
        member.send(message).then(() => {
            success = success + 2;
        }).catch(err => {})
    });
    
    // Sendet Feedback in den Kanal
    var res = new DiscordJS.MessageEmbed()
        .setTitle("Message successfully sent.")
        .setDescription("It may take a while for the message to reach everyone.")
        .setColor(0x000000)
        .setAuthor(`${bot.user.username} - SendAll`, bot.user.avatarURL());
    msg.channel.send(res);

};

/**
 * @description Stellt wichtige initialisierungs Informationen für die einbindung des Befehls bereit. 
 */
module.exports.help = {
    name: 'sendall',
    alias: [
        'broadcast'
    ],
    description: 'Writes a message to all server members.',
    args: '<message>',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "ADMINISTRATOR"
    ]
};