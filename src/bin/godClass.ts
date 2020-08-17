import { selectRandomGod, obtainRandom, obtainGodClass, filterItems, verifyBuild } from './func'
import { acorns, physical_boots, magical_boots } from '../other_items.json'
import { items } from '../items.json'
const Discord = require("discord.js");

class God {
    godName:string;
    godClass:string;
    build:string[];

    // argType is either godType or godName

    constructor(arg?:string, argType?:string) {
        if(arg) {
            if(argType == "godType") {
                this.godClass = arg;
                this.godName = selectRandomGod(arg);
            } else {
                this.godName = arg;
                this.godClass = obtainGodClass(arg);
            }
        } else {
            this.godName = selectRandomGod();
            this.godClass = obtainGodClass(this.godName);
        }
    }

    generateRandomBuild(boots?:Boolean, args?:string[]) {
        this.build = [];

        let addExtra = {};

        /*
            Boot decision
        */

        if(this.godName === "Ratatoskr") {
            let posAcorns:string[];

            posAcorns = filterItems(this.godClass, args, acorns);

            if(posAcorns.length === 0)
                this.build.push(obtainRandom(Object.keys(acorns)))
            else
                this.build.push(obtainRandom(posAcorns));
        } else {
            let possibleBoots;

            let isMagical = this.godClass === "mage" || this.godClass === "guardian"

            if(isMagical)
                possibleBoots = filterItems(this.godClass, args, magical_boots);
            else
                possibleBoots = filterItems(this.godClass, args, physical_boots);

            if(boots) {
                if(possibleBoots.length > 0)
                    this.build.push(obtainRandom(possibleBoots));
                else {
                    this.build.push(isMagical ? 
                        obtainRandom(["Shoes of the Magi", "Shoes of Focus", "Traveler's Shoes", "Reinforced Shoes"]) :
                        obtainRandom(["Warrior Tabi", "Ninja Tabi", "Reinforced Greaves", "Talaria Boots"])
                    );
                }
            } else
                addExtra = isMagical ? magical_boots : physical_boots;
        }

        /*
            End boot decision
        */

        let possibleItems = filterItems(this.godClass, args, Object.assign(items, addExtra));

        for(let i = 0; i < 6; i++)
            this.build.push(obtainRandom(possibleItems));
        
        this.build = verifyBuild(this.build, possibleItems);
    }

    sendBuild(message) {
        /*let str = '';

        this.build.forEach(e => str += e + '\n');

        message.channel.send(str);*/
    }

    sendMessage(includeBuild?:Boolean) {
        return new Discord.MessageEmbed()
            .setColor("#d9830b")
            //.setImage(`https://web2.hirez.com/smite/god-cards/${this.godName}.jpg`)
            //.setThumbnail('https://i.imgur.com/wSTFkRM.png')
            .setThumbnail(`https://www.smitefire.com/images/god/icon/${this.godName.toLowerCase().split(" ").join("-")}.png`)
            .setTitle(this.godName);

        /*return new Discord.MessageEmbed()
            .setColor('#0099ff')
            //.setTitle('Some title')
            //.setURL('https://discord.js.org/')
            //.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
            .setDescription('Some description here')
            .setThumbnail('https://i.imgur.com/wSTFkRM.png')
            /*.addFields(
                { name: 'Regular field title', value: 'Some value here' },
                { name: '\u200B', value: '\u200B' },
                { name: 'Inline field title', value: 'Some value here', inline: true },
                { name: 'Inline field title', value: 'Some value here', inline: true },
            )*/
            //.addField('Inline field title', 'Some value here', true)
            //.setImage('https://i.imgur.com/wSTFkRM.png')
            //.setTimestamp()
            //.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');*/
    }
}

export default God;