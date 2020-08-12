import { classRegExp, buildParams, parseGodType } from '../bin/regExp'
import { parseBuildParams } from '../bin/func'
import God from '../bin/godClass'

const errorFound = (message) => {
    message.channel.send("Error encontrado. La sintaxis del comando es:\n``+rgod class? build? b? (build-params)?``");
}

const parseArgs = (arg1:string, arg2:string, args:string[]) => {
    let godType:any = parseGodType(arg1);
    let includeBoots;
    let includeBuild;

    if(godType) {
        if(arg2 === "build") {
            includeBuild = true;

            if(args && args[0] === "b") {
                args.shift();
                includeBoots = true;
            } else
                includeBoots = false;
        }
    } else {
        if(arg1 === "build") {
            includeBuild = true;

            if(arg2 === "b")
                includeBoots = true;
            else {
                includeBoots = false;
                args.push(arg2);
            }
        }
    }

    return [godType, includeBuild, includeBoots, args];
}

const correctSyntax = (arg1:string, arg2:string, args:string[]) => {
    if(classRegExp.test(arg1)) {
        if(arg2 && arg2 !== "build")
            return false;
        else {
            let isOk = true;

            if(args.length !== 0) {
                isOk = args[0] === "b" || buildParams.test(args[0]);

                for(let i = 1; i < args.length && isOk; i++)
                    isOk = buildParams.test(args[i]);
            }

            return isOk;
        }
    } else if(arg1 === "build") {

        if(!arg2 && args.length === 0)
            return true;
        else if(arg2 !== "b" && !buildParams.test(arg2))
            return false;
        else if(arg2 === "b") {
            let i = 0, isOk = true;

            while(i < args.length && isOk) {
                isOk = buildParams.test(args[i]);
                i++;
            }

            return isOk;
        }
    } else if(!arg1 && !arg2 && args.length === 0)
        return true;

}

module.exports = {
    name: "randomGod",
    execute(message, [arg1, arg2, ...args]) {

        if(!correctSyntax(arg1, arg2, args)) {
            errorFound(message);
            return;
        }

        let godType, includeBuild, includeBoots;
        [godType, includeBuild, includeBoots, args] = parseArgs(arg1, arg2, args);
        

        let god = new God(godType, "godType");

        args = parseBuildParams(args, god.godClass);

        message.channel.send(god.godName);

        if(includeBuild) {
            god.generateRandomBuild(includeBoots, args);

            god.sendBuild(message);
        }
    }
};