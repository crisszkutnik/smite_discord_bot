import God from "../bin/godClass";
import { classRegExp, parseGodType } from "../bin/regExp";
import { obtainRandom, filterItems } from "../bin/func";

const errorFound = (message) => {
    message.channel.send("Error encontrado. La sintaxis es: `+rteam [2-5]? (all? [class1-class5]+)?`");
}

const checkSyntax = (num_str, number, all, classes) => {
    if(number && (number < 2 && number > 5))
        return false;
    
    if(num_str === "all") {
        let isOk = classRegExp.test(all);

        for(let i = 0; i < classes.length && isOk; i++)
            isOk = classRegExp.test(classes[i]);

        return isOk;
    } else {

    }
}

module.exports = {
    name: "randomTeam",
    execute(message, [num_str, all, ...classes]:[string, string, string]) {
        let number = parseInt(num_str);

        /*if(!checkSyntax(num_str, number, all, classes)) {
            errorFound(message);
            return;
        }*/

        if(!number) {
            // rteam all [classes] || rteam classes
            number = 5;

            if(num_str === "all")
                classes.push(all);
            else {
                classes.push(num_str);

                if(all)
                    classes.push(all);
            }

            all = "all";
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

        let god_str = '';

        gods.forEach(e => god_str += e + '\n');

        message.channel.send(god_str);
    }
}

/*
SOLVE SYNTAX CHECKER
*/