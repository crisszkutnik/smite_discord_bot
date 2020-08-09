const Discord = require("discord.js");
import * as fs from "fs";
import { bot_key, prefix } from "../keys.json";

const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./compile/commands').filter(file => file.endsWith('.js'));

for (let file of commandFiles) {
    let command = require(`../commands/${file}`);
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log("Bot is running");
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    let command, args;

    [command, ...args] = message.content.slice(prefix.length).toLowerCase().trim().split(" ");

    if(command === "warchi que juego" || command === "rgod")
        client.commands.get("randomGod").execute(message, args);
});



client.login(bot_key);