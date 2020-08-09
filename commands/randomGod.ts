import { allGods, byCategory } from '../gods.json';

const parseGodType = (type) => {
    if(["supp", "support", "sup"].includes(type))
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

module.exports = {
    name: "randomGod",
    execute(message, [arg]) {
        let category;
        let defaultCat = ["jungle", "guardian", "warrior", "adc", "mage"];

        if(!arg) 
            category = allGods;
        else {
            if(!defaultCat.includes(arg))
                arg = parseGodType(arg);

            category = byCategory[arg];
        }

        // If the argument is correct
        if(category)
            message.channel.send(category[Math.round(Math.random() * (category.length - 1))]);
        else
            message.channel.send("No esta bien escrito.");
    }
};