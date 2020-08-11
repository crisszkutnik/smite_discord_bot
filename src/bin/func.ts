import { items } from '../items.json'
import { allGods, byCategory } from '../gods.json'

const obtainRandom = (arr:any[]) => {
    return arr[Math.floor(Math.random() * arr.length)];
}

const selectRandomGod = (category?:string) => {
    if(category)
        return obtainRandom(byCategory[category]);
    else
        return obtainRandom(allGods);
}

const obtainGodClass = (god:string) => {
    for(let key in byCategory)
        if(byCategory[key].includes(god))
            return key;
}

const filterItems = (godClass, args?, itemList?) => {
    let res = [];

    if(!itemList)
        itemList = items;

    for(let key in itemList) {
        if(itemList[key].canBuy.length === 0 || itemList[key].canBuy.includes(godClass)) {
            let include = true;

            if(args && args.length > 0) {
                let hasAny = false;

                let i = 0;
                while(i < args.length && !hasAny) {
                    hasAny = itemList[key].effects.includes(args[i]);
                    i++;
                }

                include = hasAny;
            }       

            if(include)
                res.push(key);
        }
    }

    return res;
}

const verifyBuild = (build:string[], possibleItems:string[]) => {
    let hasBoots = false;
    let bootsRegExp = /Shoes+Boots+Tabi+Greaves/;
    let items = {};

    for(let i = 0; i < build.length; i++) {
        if(bootsRegExp.test(build[i]) && hasBoots) {
            while(bootsRegExp.test(build[i]))
                build[i] = obtainRandom(possibleItems);
        }

        if(bootsRegExp.test(build[i]))
            hasBoots = true;

        if(items[build[i]])
            build[i] = obtainRandom(possibleItems);
        else
            items[build[i]] = true;
    }

    return build;
}

export { obtainRandom, selectRandomGod, obtainGodClass, filterItems, verifyBuild };

/*
TODO:
- Better verifyBuild function
*/