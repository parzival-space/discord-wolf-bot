const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Dieser Befehl ist eine Beispiel-Forlage
    var nickname = "";
    for (let a = 0; a < args.length; a++) {
        var arg = args[a];
        nickname = `${nickname}${arg}`;
        if(nickname.length != a) nickname = ` ${nickname}`;
    }

    msg.channel.send("executing...");

    var members = msg.guild.members.cache.array();
    var b = 0;
    var interval = await setInterval(async () => {
        var mem = members[b];
        await mem.setNickname(nickname, "Dev-Command").then((up) => {
            msg.channel.send(`[${b+1}/${members.length}] _${up.user.username}_ **=>** _${up.nickname}_`);
        }).catch((err) => {
            msg.channel.send(`[${b+1}/${members.length}] **Failed to change nickname of ${mem.user.username}!**`);
        }).finally(() => {
            b++;
            if (b >= members.length) clearInterval(interval);
        });
    }, 1900);

    msg.channel.send("done.");
};

/**
 * Command description
 */
module.exports.help = {
    name: 'nickall',
    alias: [],
    description: 'Yup. I\'m a description',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: true,
    disabled: false,
    hidden: true,
    permissions: [
        "ADMINISTRATOR"
    ]
};