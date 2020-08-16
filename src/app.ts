const Discord = require("discord.js");
import * as fs from "fs";
import { bot_key, prefix } from "./keys.json";

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./compile/commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
    let command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Bot is running");
});

client.on('message', message => {

    /*
        A joke about spanish streamer Warchiwar
    */

    let parsedMessage = message.content.toLowerCase().trim();

    if(parsedMessage === "warchi que juego?")
        parsedMessage = "+rgod";
    else if(parsedMessage === "dou" && !message.author.bot)
        message.channel.send("dou");

    if(!parsedMessage.startsWith(prefix) || message.author.bot) return;

    let command, args;

    [command, ...args] = parsedMessage.slice(prefix.length).split(" ");

    if(command === "rgod")
        client.commands.get("randomGod").execute(message, args);
    else if(command === "rbuild")
        client.commands.get("randomBuild").execute(message, args);
    else if(command === "rteam")
        client.commands.get("randomTeam").execute(message, args);
});



client.login(bot_key);