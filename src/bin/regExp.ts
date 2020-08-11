let jungleRexExp = new RegExp("assasin|jungler|jungla|asesino|jg|jungle");
let guardianRexExp = new RegExp("guardian|support|sup|supp");
let midRexExp = new RegExp("mage|mid|mago");
let warriorRexExp = new RegExp("warrior|guerrero|solo");
let adcRexExp = new RegExp("hunter|adc|carry|cazador");

//let classRegExp = new RegExp(jungle + "|" + guardian + "|" + mid + "|" + warrior + "|" + adc);

let classRegExp = new RegExp("assasin|jungler|jungla|asesino|jg|guardian|support|sup|supp|mage|mid|mago|warrior|guerrero|solo|hunter|adc|carry|cazador");

let buildParams = new RegExp("crit|power|lifesteal|attack_speed|penetration|pen|health|hp5|mp5|cdr|ccr");

let rGodSyntax = new RegExp(`(${classRegExp})?(\sbuild(\sb)?(\s(${buildParams}))*)?`);

const parseGodType = (type:string) => {
    if(jungleRexExp.test(type))
        return "jungle";
    else if(guardianRexExp.test(type))
        return "guardian";
    else if(midRexExp.test(type))
        return "mage";
    else if(warriorRexExp.test(type))
        return "warrior";
    else if(adcRexExp.test(type))
        return "adc";
}

export { rGodSyntax, classRegExp, buildParams, parseGodType };