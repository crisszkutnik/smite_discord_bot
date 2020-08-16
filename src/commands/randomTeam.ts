import God from "../bin/godClass";
import { classRegExp, parseGodType } from "../bin/regExp";
import { obtainRandom, filterItems } from "../bin/func";

const errorFound = (message) => {
    message.channel.send("Error encontrado. La sintaxis es: `+rteam [2-5]? (all? [class1-class5]+)?`");
}

const checkSyntax = (num_str, number, all, classes):Boolean => {
    if(!number) {
        if(num_str) {
            if(num_str === "all")
                all = "all";
            else if(classRegExp.test(num_str))
                classes.push(num_str);
            else
                return false;
        } else
            return true;
    } else {
        if(number < 2 || number > 5)
            return false;

        /*if(all !== "all" && classRegExp.test(all))
            classes.push(all);
        else
            return false;*/
        if(all && all !== "all") {
            if(classRegExp.test(all))
                classes.push(all);
            else
                return false;
        }
    }

    for(let i = 0; i < classes.length; i++)
        if(!classRegExp.test(classes[i]))
            return false;

    return true;
}

module.exports = {
    name: "randomTeam",
    execute(message, [num_str, all, ...classes]) {
        let number = parseInt(num_str);

        if(!checkSyntax(num_str, number, all, classes)) {
            errorFound(message);
            return;
        }

        let gods = [];

        if(!number) {
            number = 5;

            if(!num_str)
                classes = ["guardian", "jg", "mid", "warrior", "adc"];
            else if(num_str === "all")
                classes.push(all);
            else {
                classes.push(num_str);

                if(all)
                    classes.push(all);
            }
        } else
            if(all)
                classes.push(all);



        let god_str = '';

        gods.forEach(e => god_str += e + '\n');

        message.channel.send(god_str);
    }
}

/*
This code is strange
*/

/*
if(!number) {
            // rteam all [classes] || rteam classes
            number = 5;

            if(!num_str) {
                classes = ["guardian","warrior", "jg", "mid"];

                all = "adc";
            } else {
                if(num_str === "all")
                    classes.push(all);
                else {
                    classes.push(num_str);

                if(all)
                    classes.push(all);
                }

                all = "all";
            }
        }

        for(let i = 0; i < classes.length; i++)
            classes[i] = parseGodType(classes[i]);

        let gods = [];

        if(all === "all") {
            for(let i = 0; i < number; i++) {
                let god = new God(obtainRandom(classes), "godType").godName;

                while(gods.includes(god))
                    god = new God(obtainRandom(classes), "godType").godName;

                gods.push(god);
            }
        } else {
            classes.push(parseGodType(all));
            for(let i = 0; i < classes.length; i++) {
                let god = new God(classes[i], "godType").godName;
                
                while(gods.includes(god))
                    god = new God(classes[i], "godType").godName;

                gods.push(god);
            }

            for(let i = 0; i < number - classes.length; i++) {
                let god = new God().godName;
                
                while(gods.includes(god))
                    god = new God().godName;

                gods.push(god);
            }
        }
*/