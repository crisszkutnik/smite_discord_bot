import { allGods, byCategory } from './../gods.json';

const parseGodType = (type:string) => {
    if(["jungle", "guardian", "warrior", "adc", "mage"].includes(type))
        return type;
    else if(["supp", "support", "sup"].includes(type))
        return "guardian";
    else if(["jungler", "jungla", "asesino", "assassin", "jg"].includes(type))
        return "jungle";
    else if(["mid", "mago"].includes(type))
        return "mage";
    else if(["solo", "guerrero"].includes(type))
        return "warrior";
    else if(["hunter", "cazador", "carry"].includes(type))
        return "adc";
    else
        return undefined
}

const parseArgument = (arg:string, type:string) => {
    if(["penetration", "pen", "lifesteal", "power"].includes(arg)) {
        if(type === 'mage' || type === "guardian")
            return "magical_" + arg;
        else
            return "phyisical_" + arg;
    }
}

const obtainGodClass = (god:string) => {
    for(let key in byCategory) {
        if(byCategory[key].includes(god))
            return key;
    }
}

const selectRandomGod = (type:string) => {
    let category;

    if(type)
        category = byCategory[type];
    else
        category = allGods;

    return category[Math.floor(Math.random() * category.length)];
}

module.exports = {
    parseGodType: parseGodType,
    selectRandomGod: selectRandomGod,
    obtainGodClass: obtainGodClass,
    parseArgument: parseArgument
}