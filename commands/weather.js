const DiscordJS = require('discord.js');
const weather = require('weather-js');
const data = require('../package.json');

/**
 * Weather is a module for obtaining weather information.
 * @param {DiscordJS.Client} bot
 * @param {DiscordJS.Message} msg
 * @param {string[]} args
 */
module.exports.run = async function (bot, msg, args) {

    // Es muss mindestens ein Argument angegeben sein.
    if (args.length < 1) {
        var prefix = bot.getGuildConfig(msg.guild).options.prefix;
        var err = new DiscordJS.MessageEmbed()
            .setTitle("You must provide at least one argument to use this command.")
            .setDescription(`Syntax: ${prefix}weather <place>`)
            .setThumbnail("https://i.imgur.com/L9H79Sj.png")
            .setAuthor("Missing argument", bot.user.avatarURL())
            .setColor(0x000000);
        return msg.channel.send(err);
    }

    // Wandel alle Argumente in ein Suchtext um
    var searchQuery = "";
    args.forEach((arg, i) => {
        searchQuery = `${searchQuery}${arg}`;
        if(i != (args.length - 1))searchQuery = `${searchQuery} `;
    });

    weather.find({search: searchQuery, degreeType: 'C'}, (err,data) => {
        if(err) console.error(err);

        var data = data[0];

        // Bei Fehlern wird abgebrochen
        function NotFound() {
            var errInvalid = new DiscordJS.MessageEmbed()
                .setAuthor(`${bot.user.username} - Weather`, bot.user.avatarURL())
                .setTitle(`Place not found.`)
                .setDescription(`Sorry, I couldn't find the place you specified.`)
                .setThumbnail(`https://i.imgur.com/L9H79Sj.png`)
                .setColor(0x000000);
            return msg.channel.send(errInvalid);
        }
        if (data == undefined) return NotFound();

        var res = new DiscordJS.MessageEmbed()
            .setAuthor(`${bot.user.username} - Weather`, bot.user.avatarURL())
            .setTitle(`${data.location.name}`)
            .setURL(`https://www.google.com/maps/@${data.location.lat},${data.location.long},14z`)
            .setThumbnail(`${data.current.imageUrl}`)
            .setColor(0x000000)
            .setFooter(`${data.current.observationpoint}`)
            .setDescription(`Temperature: **${data.current.temperature} °${data.location.degreetype}**\nWeather: **${data.current.skytext}**`);
        
        data.forecast.forEach(day => {
            var dayString = day.day;
            if (day.day == data.current.day) dayString = `__${dayString}__`;

            res.addField(dayString, `Temperature: **${day.low} - ${day.high} °${data.location.degreetype}**\nWeather: **${day.skytextday}**`)
        });

        msg.channel.send(res);
    })

};

/**
 * Command description
 */
module.exports.help = {
    name: 'weather',
    alias: [],
    description: 'Returns the weather report for the place you specified.',
    args: '<play>',
    requireAlpha: false,
    requireBeta: false,
    requireDev: false,
    disabled: false,
    hidden: false,
    permissions: [
        "ADMINISTRATOR"
    ]
};