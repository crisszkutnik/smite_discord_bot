import { allGods, byCategory } from './../gods.json';;

const parseGodType = (type) => {
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
}

const selectRandomGod = (type) => {
    let category;

    if(type) {
        type = parseGodType(type);

        category = byCategory[type];
    } else
        category = allGods;

    return category[Math.round(Math.random() * (category.length - 1))];
}

module.exports = {
    parseGodType: parseGodType,
    selectRandomGod: selectRandomGod
}