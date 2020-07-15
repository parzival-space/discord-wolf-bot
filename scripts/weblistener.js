const DiscordJS = require('discord.js');
const path = require('path');
const fs = require('fs');

/**
 * This script is listening on web requests and responding with an ejs template.
 * @param {DiscordJS.Client} bot
 */
module.exports.run = function(bot) {
    
    bot.app.get('/page/:pagename', (req, res) => {

        /* getting page name */
        var page = req.params.pagename;

        /* getting files from views folder */
        fs.readdir(path.join(__dirname, '..', 'views'), (err, files) => {

            if (files.filter(f => f.split('.').pop() === 'ejs').includes(page)) res.render(page);
            else res.render('404');

        });

    });

};