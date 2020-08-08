const Discord = require("discord.js");
const client = new Discord.Client();
const { bot_key, prefix } = require("../keys.json");
const { guardians, warriors, adc, mage, jungle } = require("../gods.json")

client.once('ready', () => {
    console.log("Bot is running");
});

client.on('message', message => {
    if(message.author.username !== 'Smite bot') {
        if(message.content === prefix + 'Es giuli puto?')
            message.channel.send("Si.");
        else if(message.content === "dou")
            message.channel.send("dou");
        else if(message.content.toLowerCase() === "warchi que juego?") {
            let gods = [guardians, warriors, adc, mage, jungle];
            let type_index = Math.round(Math.random() * 4);
            let god_index = Math.round(Math.random() * (gods[type_index].length - 1));
            let god = gods[type_index][god_index];

            message.channel.send(god);
        } else if(message.content.toLowerCase() === "warchi colgate")
            message.channel.send("Colgate vos idiota");
        else if(message.content.toLowerCase() === "bulome")
            message.channel.send("Prostagma");
    } 
});



client.login(bot_key);