import { items } from '../items.json'
const { obtainGodClass, parseArgument } = require("./func"); 

const getItems = (godClass, args) => {
    let cantHave;

    if(godClass === "mage" || godClass === "guardian")
        cantHave = ["physical_power", "physical_lifesteal"]
    else
        cantHave = ["magical_power", "magical_lifesteal"]

    let res = [];

    /*
        TODO: Code is repeated here. A better way to do it?
    */ 

    //There is no args
    if(args.length === 0) {
        for(let key in items) {
            let exclude = false;

            for(let i = 0; i < 2; i++) {
                if(items[key].includes(cantHave[i])) {
                    exclude = true;
                    break;
                }
            }

            if(!exclude)
                res.push(key);
        }
    } else {
        for(let key in items) {
            let exclude = false;
    
            for(let i = 0; i < args.length; i++) {
                if(!items[key].includes(args[i])) {
                    exclude = true;
                    break;
                }
            }
    
            if(!exclude)
                res.push(key);
        }
    }

    return res;
}

/*
TODO: Add class specific items (arondight, fail-not, etc.), ratatoskr accorns and
verify build
*/

const generateBuild = (god:string, includeBoots:Boolean, args:[string]) => {
    let godClass = obtainGodClass(god);

    args.map(e => parseArgument(e, godClass));

    let build = [];
    let boots;

    if(includeBoots) {
        if(godClass === "mage" || godClass === "guardian")
            boots = ["Shoes of Focus", " Traveler's Shoes", "Shoes of the Magi", "Reinforced Shoes"];
        else
            boots = ["Ninja Tabi", "Warrior Tabi", "Talaria Boots", "Reinforced Greaves"];

        build.push(boots[Math.floor(Math.random() * 4)]);
    }

    let avaiableItems = getItems(godClass, args);
    let amount;

    if(includeBoots)
        amount = 5;
    else
        amount = 6;

    for(let i = 0; i < amount; i++)
        build.push(avaiableItems[Math.floor(Math.random() * avaiableItems.length)])

    return build;
}

export default generateBuild;