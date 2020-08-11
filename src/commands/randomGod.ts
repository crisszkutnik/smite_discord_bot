import { classRegExp, buildParams, rGodSyntax, parseGodType } from '../bin/regExp'
import God from '../bin/godClass'

const parseBuildParams = (args:string[], godType:string) => {
    let res = [];

    args.forEach(e => {
        if(["penetration", "pen", "lifesteal", "power"].includes(e)) {
            if(godType === 'mage' || godType === "guardian")
                res.push("magical_" + e);
            else
                res.push("phyisical_" + e);
        } else if(buildParams.test(e))
            res.push(e);
        else
            return null;
    });

    return res;
}

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

            if(args[0] === "b") {
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
            else
                includeBoots = false;
        }
    }

    return [godType, includeBuild, includeBoots, args];
}

module.exports = {
    name: "randomGod",
    execute(message, allArgs) {
        let [arg1, arg2, ...args] = allArgs;

        // Check syntax
        if(!rGodSyntax.test(allArgs.join(" "))) {
            errorFound(message);
            return;
        }

        let godType, includeBuild, includeBoots;
        [godType, includeBuild, includeBoots, args] = parseArgs(arg1, arg2, args);
        
        let god = new God(godType, "godType");

        message.channel.send(god.godName);

        if(includeBuild) {
            god.generateRandomBuild(includeBoots, args);

            god.sendBuild(message);
        }
    }
};

/*
TODO:
- Syntax checker does not work
*/