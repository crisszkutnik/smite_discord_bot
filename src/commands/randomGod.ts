const { selectRandomGod } = require('./../bin/func');

module.exports = {
    name: "randomGod",
    execute(message, [arg]) {
        let god = selectRandomGod(arg);

        if(god)
            message.channel.send(god);
        else
            message.channel.send("No esta bien escrito.");
    }
};