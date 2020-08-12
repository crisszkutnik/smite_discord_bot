import God from '../bin/godClass'
import { buildParams } from '../bin/regExp'
import { allGods } from '../gods.json'

const errorFound = (message) => {
    message.channel.send("Error encontrado. La sintaxis del comando es:\n `+rbuild god b? (build-params)?`");
} 

const correctSyntax = (boots:string, args:string[]):Boolean => {
    if(boots) {
        if(boots !== 'b' && !buildParams.test(boots))
            return false;
    }

    if(args.length !== 0) {
        let error = false;

        args.forEach(e => error = buildParams.test(e));

        return error;
    }

    return true;
}

module.exports = {
    name: "randomBuild",
    execute(message, [godName, bootFlag, ...args]:[string, string, string]) {
        
        try {
            godName = godName.charAt(0).toUpperCase() + godName.slice(1); // Need to do this, otherwise it would not work
        } catch {
            errorFound(message);
            return;
        }

        let god = new God(godName, "godName");

        // If name is incorrect god.godClass will be undefined

        if(!correctSyntax(bootFlag, args) || !god.godClass) {
            errorFound(message);
            return;
        }

        god.generateRandomBuild(bootFlag === 'b', args);

        god.sendBuild(message);
    }
};