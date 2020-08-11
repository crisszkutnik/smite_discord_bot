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

const filterItems = (godClass, args?) => {
    let res = [];

    for(let key in items) {
        if(items[key].canBuy.length === 0 || items[key].canBuy.includes(godClass)) {
            let include = true;

            if(args && args.length > 0) {
                let hasAny = false;

                let i = 0;
                while(i < args.length && !hasAny) {
                    hasAny = items[key].effects.includes(args[i]);
                    i++;
                }

                include = hasAny;
            }       

            if(include)
                res.push(key);
        }
    }

    console.log(res);

    return res;
}

const verifyBuild = (build:string[], possibleItems:string[]) => {
    let hasBoots = false;

    for(let i = 0; i < build.length; i++) {
        let isBoot = /Shoes+Boots+Tabi+Greaves/.test(build[i]);

        if(isBoot && hasBoots) {
            while((/Shoes+Boots+Tabi+Greaves/.test(build[i])))
                build[i] = obtainRandom(possibleItems);
        }
        
        if(isBoot)
            hasBoots = true;


        for(let j = i + 1; j < build.length; j++) {
            if(build[i] === build[j])
                build[j] = obtainRandom(possibleItems);
        }
    }

    return build;
}

export { obtainRandom, selectRandomGod, obtainGodClass, filterItems, verifyBuild };

/*
TODO:
- Better verifyBuild function
*/