import { selectRandomGod, obtainRandom, obtainGodClass, filterItems, verifyBuild } from './func'
import { acorns, physical_boots, magical_boots } from '../other_items.json'

class God {
    godName:string;
    godClass:string;
    build:string[];

    // argType is either godType or godName

    constructor(arg?:string, argType?:string) {
        if(arg) {
            if(argType == "godType") {
                this.godClass = arg;
                this.godName = selectRandomGod(arg);
            } else {
                this.godName = arg;
                this.godClass = obtainGodClass(arg);
            }
        } else {
            this.godName = selectRandomGod();
            this.godClass = obtainGodClass(this.godName);
        }
    }

    generateRandomBuild(boots?:Boolean, args?:string[]) {
        this.build = [];

        if(this.godName === "Ratatoskr")
            this.build.push(obtainRandom(["Bristlebush Acorn", "Thistlethorn Acorn", "Evergreen Acorn", "Thickbark Acorn"]));
        else if(boots) {
            if(this.godClass === "mage" || this.godClass === "guardian")
                this.build.push(obtainRandom(["Shoes of the Magi", "Shoes of Focus", "Traveler's Shoes", "Reinforced Shoes"]));
            else
                this.build.push(obtainRandom(["Warrior Tabi", "Ninja Tabi", "Reinforced Greaves", "Talaria Boots"]));
        }

        let possibleItems = filterItems(this.godClass, args);

        for(let i = 0; i < 6; i++)
            this.build.push(obtainRandom(possibleItems));

        verifyBuild(this.build, possibleItems);
    }

    sendBuild(message) {
        let str = '';

        this.build.forEach(e => str += e + '\n');

        message.channel.send(str);
    }
}

export default God;

/*
TODO:
- Add boots to items json
*/