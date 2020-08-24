const DiscordJS = require('discord.js');
const data = require('../package.json');

/**
 * Dieser Befehl zeigt Informationen über den Bot an.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {
    // Format: spam [amount] <Message>

    // Lokale Variabeln
    var message = "";       // Ein Platzhalter für die nachricht.
    var amount = 0;         // Ein Platzhalter für die Anzahl an wiederholung.
    var fallback = 10;      // Sollte keine Anzahl gegeben sein, ist dies die standart Anzahl an Nachrichten.
    var maxRepeats = 60;    // Okay, abgesehen davon das dieser Befehl einfach nur nervig ist: Es gibt auch Regeln.

    // Wandelt alle Argumente in ein Text um.
    for (let i = 0; i < args.length; i++) {
        // Ist das derzeitige Argument #0 und ist es eine Zahl?
        if (i == 0) {
            // Das Argument wird als Zahl behandelt.
            amount = Number(args[0]) || 10;

            if (Number(args[0]).toString() == "NaN") {
                message = `${args[i]} ${message}`;
            }
        } else {

            // Wandel die Argumente in einen Text um.
            message = `${message}${args[i]}`;

            // Sollte das Argument nicht das letzte sein, wird ein Leerzeichen zwischen die Argumente geschieben.
            if (i < args.length) message = `${message} `;
        }
    }
    if (amount == 0) amount = fallback;

    // Dieser Teil des Programmes ist zu Test-Zwecken
    //msg.channel.send(`**Debug**\nmessage: ${message}\namount: ${amount}\nfallback: ${fallback}\n\n**Additional Informations**\nIndex 0 converted into:\n__${Number(args[0])}__\nAmount:\n__${amount}__\nMax repeats:\n__${maxRepeats}__  => __${(amount >= maxRepeats)}__`);

    // Und los gehts die Arbeit.
    // Sollte die maximale Anzahl an Nachrichten überstiegen worden sein, wird der Befehl abbrechen.
    if (amount > maxRepeats) {
        var resp = new DiscordJS.MessageEmbed()
            .setTitle("Invalid amount")
            .setAuthor(`${bot.user.username} - Repeat`, bot.user.avatarURL())
            .setDescription(`The message amount has to be in a range of 1 to ${maxRepeats}!`)
            .setColor(0x000000);
        return msg.channel.send(resp);
    }

    // Sendet die Nachrichten
    for (let i = 0; i < amount; i++) {
        msg.channel.send(message);
    }
};

/**
 * Command description
 */
module.exports.help = {
    name: 'repeat',
    alias: [
        'spam'
    ],
    description: 'Yup. I\'m a description',
    args: '',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "MANAGE_MESSAGES"
    ]
};