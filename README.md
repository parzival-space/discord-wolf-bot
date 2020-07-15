[title]: https://i.ibb.co/ysvpyC2/Jet-Another-Discord-Bot.png
[discord-developer-portal]: https://discordapp.com/developers/applications/

![Jet Another Discord Bot Base][title]

---

## What is this?
I've created a base for all my discord bots so I don't need to create a bot from  
scratch up if I want to create a new one.  
You can use this for your own projects, but I would be happy if you add a link  
to this page.

### Features
+ Web Server (HTTP: ```bot.web.*``` | Express: ```bot.app.*```)  
+ Socket responsive webpages ```bot.io.*``` ([Documentation here](https://socket.io/get-started/chat/#Integrating-Socket-IO))  
+ Automatically generated ```help``` command (```./commands/help.js```)  
+ MultiServer support: database in json format (```./config/db.json```)  
+ Static files via public folder (```localhost:port/static```)  
+ Colored console output (Can be disabled with ```node server.js --no-color```)  

New-UDCounter -Title "Basic" -Endpoint {
    1
}

### Currently used packages
- [colors](https://www.npmjs.com/package/colors) by [marak](https://www.npmjs.com/~marak) & [dabh](https://www.npmjs.com/~dabh)  
- [discord.js](https://discord.js.org/) by the [discord.js team](https://github.com/discordjs/discord.js/graphs/contributors)  
- [dotenv](https://www.npmjs.com/package/dotenv) by [~jcblw](https://www.npmjs.com/~~jcblw), [maxbeatty](https://www.npmjs.com/~maxbeatty), [motdotla](https://www.npmjs.com/~motdotla) & [scottmotte](https://www.npmjs.com/~scottmotte)  
- [ejs](https://www.npmjs.com/package/ejs) by [mde](https://www.npmjs.com/~mde)  
- [Express](https://expressjs.com) by [Node.js Foundation](https://foundation.nodejs.org/)  
- [node-json-db](https://www.npmjs.com/package/node-json-db) by [belphemur](https://www.npmjs.com/~belphemur)  
- [socket.io](https://socket.io/)  

-----
## Setup
### 1. Create a new Discord Application  
1. Create a new Application at [Discord Developer Portal][discord-developer-portal]  
2. Add a Bot instance to you'r application.  
3. Make a note of you'r Bot token. (Example: NTE3NzE0ODk2MjU1NzEzMzAx.XVv7BQ.OPJljSxqk7iaE4D19tW0WD-kiVQ)  
4. Make a note of you'r Discord ID. (Example: 416358583220043796)  
  
### 2. Configure .env
```env
TOKE=<<YOUR BOT TOKEN>>  
MASTER=<<YOUR USER ID>>  
```  
##### 2.1 Configure config/bot.json (optional)  
```json
{
    "colors": {
        "announce": "<<DISCORD EMBED ANNOUNCE COLOR>>",
        "warning": "<<DISCORD EMBED WARNING COLOR>>",
        "critical": "<<DISCORD EMBED ERROR COLOR>>"
    },

    "logging": {
        "error": true,
        "warn": true,
        "info": true,
        "debug": false,
        
        "ClearCmdOnStart": true
    }
}
```  
##### 2.3 Configure config/db.json (optional)  
```json
{
    "default": {
        "prefix": "!",
        <<DEFAULT OBJECT>>
    }
}
```  
The default entry will be copyed to every new guild.  

### 3. Customize with your own code  
You can add you'r own code in ```./scripts```.  
You can create your own custom commands in ```./commands```.  
I've created a ```example.js``` file, so it's easy to create a new command.  
The Bot will load it automatically.  

### 4. Start your Bot and have fun :D
Create a new bot invite with the [Discord Permissions Calculator](https://discordapi.com/permissions.htm).