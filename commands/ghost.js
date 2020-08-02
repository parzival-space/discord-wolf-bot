const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Sendet eine Fehler-Nachricht sollte kein Benutzer gegeben sein.
    if (args.length < 1) {
        var prefix = bot.getGuildConfig(msg.guild).options.prefix;
        var err = new DiscordJS.MessageEmbed()
            .setTitle("You must provide at least one argument to use this command.")
            .setDescription(`Syntax: ${prefix}ghost <@Mention> [amount]`)
            .setThumbnail("https://i.imgur.com/L9H79Sj.png")
            .setAuthor("Missing argument", bot.user.avatarURL())
            .setColor(0x000000);
        return msg.channel.send(err);
    }

    var amount = (Math.floor(Number(args[1])) || 10);
    var target = msg.guild.members.cache.find(m => m.id === args[0].replace("<@", "").replace("!", "").replace("<@&", "").replace(">", ""));
    if (target == undefined) {
        var prefix = bot.getGuildConfig(msg.guild).options.prefix;
        var err = new DiscordJS.MessageEmbed()
            .setTitle("The target user does not exist.")
            .setDescription(`Syntax: ${prefix}ghost <@Mention> [amount]`)
            .setThumbnail("https://i.imgur.com/L9H79Sj.png")
            .setAuthor("Invalid Target", bot.user.avatarURL())
            .setColor(0x000000);
        return msg.channel.send(err);
    }

    if (amount >= 100) amount = 100;
    if (amount <= 1) amount = 1;

    for (let i = 0; i <= amount; amount++) {
        msg.channel.send(`<@!${target.id}>`).then(message => {
            msg.delete({timeout: 50, reason: `Ghost-Ping by ${msg.author.username}`}).catch();
        }).catch();
        
    }
};

/**
 * Command description
 */
module.exports.help = {
    name: 'ghost',
    alias: [],
    description: 'Useful if you want to ghostping someone.',
    args: '<@Mention> [amount]',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "ADMINISTRATOR"
    ]
};