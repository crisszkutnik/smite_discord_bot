const { selectRandomGod, parseGodType, obtainGodClass } = require('./../bin/func');
import generateBuild from '../bin/generateBuild'

module.exports = {
    name: "randomGod",
    execute(message, [arg1, arg2, ...args]:[string, string, string]) {
        let godClass = parseGodType(arg1);
        let includeBuild;
        let god;
        let build = [];
        let buildString = "";
        let parseError = false;

        // If no god class specified, it will be undefined and arg2 will be the build specifier
        if(!godClass) {
            includeBuild = arg1;
            god = selectRandomGod();
            //godClass = obtainGodClass(god);
        } else {
            god = selectRandomGod(godClass);
            includeBuild = arg2;
        }

        // If argument exists
        if(includeBuild) {
            if(includeBuild === "build") {
                let boots = false;
        
                if(args[0] === 'b') {
                    boots = true;
                    args.shift();
                }
        
                build = generateBuild(god, boots, args);
    
                build.forEach(e => buildString += `\n${e}`);
            } else
                parseError = true;
        }

        if(god && !parseError)
            message.channel.send(god + buildString);
        else {
            message.channel.send("Comando incorrecto. La sintaxis es:");
            message.channel.send(`rgod class? build? b? br? build-params?`);
        }
    }
};