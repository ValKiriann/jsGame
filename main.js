/**
 * Created by anni on 19/6/16.
 */

// es un proyecto entero en javascript, basado en los libros de elige tu propia aventura, e inspirado en Munchkin
// ESTA ES LA ESTRUCTURA LOGICA (pensada)

/* La ambientación es aventura, edad media, magia, fantasía
 Puedes ser chico o chica
 Puedes elegir entre 3 clases: guerrero, mago, arquero (próximamente tb me gustaría añadir razas)
 Cada clase tiene puntos iniciales diferentes y  tb evolucionan diferente
 Cada clase tiene un tipo de daño, cada tipo tiene una debilidad y una fortaleza,
 duplicando o dividiendo el ataque según el tipo al que se enfrente

 Daño fisico --(x2)-> Daño area --(x2)-> Daño magico --(x2)-> Daño fisico
 Daño fisico -->(x0.5)-> Daño magia --(x0.5)-> Daño area --(x0.5)-> Daño fisico

 Skills:
 -------
 attack  --> ataque
 attackType  --> tipo de ataque
 defense  --> defensa
 critic  --> probabilidad de critico (x2)
 speed  --> velocidad (decide quien ataca primero)
 maxhealth  --> vida maxima
 currentHealth --> vida actual

 warrior(10,phisic,20,5,15,50,60,60)
 mage(10,magic,15,10,5,60,40,40)
 archer(10,area,10,20,10,75,55,55)

 AVENTURA
 ---------

 Falta por elaborar la narrativa, de momento quiero centrarme en que funcione todo bien para
 ya encargarme luego de diseño y esas cosas

 El resumen es: entras en una dungeon y tu objetivo es llegar al piso 10.
 Si llegas ganas
 si mueres por el camino pierdes

 Cada vez que estas en un piso puedes: abrir la puerta, usar un objeto, comprobar tu pj
 Cuando abres una puerta pueden pasar dos cosas:

 MONSTRUO
 --------
 Aparecen entre 1-3 monstruos. Existen 10 tipos de monstruos, pero algunos solo salen en determinados
 niveles para sostener el nivel de dificultad

 niveles 1-4
 ------------
 rata(fisico)
 murcielago(area)
 escarabajo gigante(magia)

 niveles 5-9
 --------------
 espiritu(magia)
 tentáculos gigantes(area)
 armadura viviente(fisico)
 goblin(fisico si es 1, area si son 2)

 nivel 10 --> 1 de estos para que el enemigo final no sea muy dificil,
 cada clase se enfrenta a un enemigo de su mismo tipo, para no tener
 mucha desventaja por el tipo de ataque
 cerbero(fisico)
 dragon(area)
 brujo de las sombras(magia)

 EVENTO
 ------

 Cuando abres una puerta hay un 70% de que salga un monstruo, pero también hay un 30% de que ocurra algo

 veneno --> pierdes 5hp durante Xpisos
 maldicion --> tu ataque basico *0.75 durante Xturnos
 trampa --> caes en una trampa y pierdes 25hp
 pozo curativo --> genial! recuperas toda tu vida
 pasadizo --> encuentras un atajo y bajas al piso x y subes x niveles
 armadura gratis --> aumento permanente de defensa+15

 SI PASAS EL PISO
 ---------------

 el piso se completa si ganas al monstruo o si sobrevives al evento. Al ocurrir esto,
 tienes acceso al piso siguiente, subes un nivel, recuperas 20hp y ganas un objeto

 EL SISTEMA DE OBJETOS NO ESTA IMPLEMENTADO TODAVIA, sus menciones son solo ubicadoras

 Al luchar
 -----------

 Primero se decide quien va primero calculando cual es la rapidez mayor
 comprobamos la debilidad de los tipos
 despues se hace una funcion de esquivar con la propiedad del contrincante para saber si fallamos
 si no fallamos ejecutamos el critico para saber si el ataque sera normal o especial
 hacemos un ataque ((attack*debility) * (100 - defense/100))
 restamos vida al contrincante
 si enemigo <= 0 fin
 sino, log =log +=log(guardar en una variable lo que ha pasado,e
 ir sumando todas las acciones para ponerlo al final)

 turno del contrincante

 Asi hasta ganar o perder

 WIP

 */

// toolbox.js  (FUNCIONES, caja de herramientas, el codigo se ejecuta abajo, en main.js)

function pj(gender, work) {
    this.gender = gender;
    this.attackType = "";
    this.work = work;
    this.attack = 0;
    this.hpTotal = 0;
    this.currentHp = 0;
    this.defense = 0;
    this.dodge = 0;
    this.critic = 0;
    this.speed = 0;
}

function monster(name, type, attack, defense, dodge, critic, speed, hp) {
    this.monsterName = name;
    this.attackType = type;
    this.attack = attack;
    this.defense = defense;
    this.dodge = dodge;
    this.critic = critic;
    this.speed = speed;
    this.hptotal = hp;
    this.currentHp = hp;
}

function setSkills() {
    if(pjSelected.work == "archer") {
        pjSelected.attackType = "area";
        pjSelected.attack = 10;
        pjSelected.hpTotal = 55;
        pjSelected.currentHp = 55;
        pjSelected.defense = 10;
        pjSelected.dodge = 20;
        pjSelected.critic = 10;
        pjSelected.speed = 75;
    }
    else if(pjSelected.work == "warrior") {
        pjSelected.attackType = "phisic";
        pjSelected.attack = 10;
        pjSelected.hpTotal = 60;
        pjSelected.currentHp = 60;
        pjSelected.defense = 20;
        pjSelected.dodge = 5;
        pjSelected.critic = 15;
        pjSelected.speed = 50;
    }
    else  {
        pjSelected.attackType = "magic";
        pjSelected.attack = 10;
        pjSelected.hpTotal = 40;
        pjSelected.currentHp = 40;
        pjSelected.defense = 15;
        pjSelected.dodge = 10;
        pjSelected.critic = 5;
        pjSelected.speed = 60;
    }
}

function heal(number) {
    pjSelected.currentHp += number;
    if(pjSelected.currentHp > pjSelected.hpTotal) {pjSelected.currentHp = pjSelected.hpTotal};
}

function pjStatus() {
    alert("Hp: " + pjSelected.currentHp + "/" + pjSelected.hpTotal + "\nAttack: " + pjSelected.attack + "\nDefense: " + pjSelected.defense);
}

function monsterStatus(enemy) {
    alert("Name: " + enemy["monsterName"] + "\nType: " + enemy["attackType"] + "\nAttack: " + enemy["attack"]);
}

function levelup() {
    level = level += 1;

    if(pjSelected.attackType === "archer") {
        pjSelected.attack = pjSelected.attack += 5;
        pjSelected.hpTotal = pjSelected.hpTotal += 10;
        pjSelected.defense = pjSelected.defense += 1;
        pjSelected.dodge = 20;
        pjSelected.critic = 10;
        pjSelected.speed = 75;

        alert("You levelup!");
        heal(20);
        alert("you gain new stats" + "\n You recover 20hp.");
        pjStatus();


    }

    else if(pjSelected.attackType == "warrior") {
        pjSelected.attack = pjSelected.attack += 5;
        pjSelected.hpTotal = pjSelected.hpTotal + 15;
        pjSelected.defense = pjSelected.defense += 3;
        pjSelected.dodge = 5;
        pjSelected.critic = 15;
        pjSelected.speed = 50;

        alert("You levelup!")
        heal(20);
        alert("you gain new stats" + "\n You recover 20hp.");
        pjStatus();
    }

    else  {
        pjSelected.attack = pjSelected.attack += 5;
        pjSelected.hpTotal = pjSelected.hpTotal + 5;
        pjSelected.defense = pjSelected.defense +=2;
        pjSelected.dodge = 10;
        pjSelected.critic = 5;
        pjSelected.speed = 60;

        alert("You levelup!");
        heal(20);
        alert("you gain new stats" + "\n You recover 20hp.");
        pjStatus();
    }
}





function debilities (type1,type2) {
    if(type1 == type2) { debility = 1;}
    else if ((type1 == "phisic" && type2 == "area") || (type1=="area" && type2=="magic") || (type1=="magic" && type2=="phisic")) {
        debility = 2;
    }
    else { debility = 0.5;}
}

function dodge(valor) {
    if(Math.random() <=(valor/100)) {

        dodgeAction = true;
    }
}


/*function damageCal(attack,debility,defense) {
 damageOfFight = attack * debility * (100-defense/100);
 }*/
function attack(player1, player2) {
    dodgeAction = false;
    damageOfFight = 0;

    dodge(player2["dodge"]);

    if(dodgeAction) {
        log += "You attacked " + player2.monsterName + " and FAILED\n";
    }

    debilities(player1.attackType,player2.attackType);

    // funcion damageCalc
    damageOfFight = player1.attack * debility * (1 - player2.defense/100);


    player2.currentHp -= damageOfFight;

    log += "You attacked " + player2.monsterName + "and deal " + damageOfFight + " points\n";

    if(!player2.currentHp <=0) {
        dodgeAction = false;
        damageOfFight = 0;

        dodge(player1["dodge"]);

        if(dodgeAction) { log +=  player2["monsterName"] + " attacked you and FAILED\n"; }

        debilities(player2["attackType"],player1["attackType"]);

        damageOfFight = player1["attack"] * debility * (1 - player2.defense/100);

        player2.currentHp -= damageOfFight;

        log += player2["monsterName"] + "attacked you and deal " + damageOfFight + " points\n";

    }


}


function monsterFloor(player2) {

    console.log(player2.currentHp,pjselected.currentHp);
    var action = prompt("A " + player2.monsterName + " looks at you with an angry face.\n\n\nDo you want to fight or do you want to use an object?");
    console.log(player2.currentHp,pjselected.currentHp);
    if(action == "fight") {
        console.log(player2.currentHp,pjselected.currentHp);
        while(pjSelected.currentHp >0 && player2.currentHp >0)
        {
            if(pjSelected.speed > player2.speed) {
                attack(pjSelected,player2);
            }
            else {attack(player2,pjSelected)}
        }
        if(pjSelected.currentHp <=0) {
            nextFloor = false;

            alert("You lost the battle!\n\n" + log + "\n\n" + pjSelected.currentHp + "/" + pjSelected.hpTotal);

        }
        else if (player2.currentHp <=0) {
            alert("Has ganado!!\n\n" + log + "\n\n" + pjSelected.currentHp + "/" + pjSelected.hpTotal);
            nextFloor= true;
            stage += 1;

            levelup();
        }

    }
    else { alert("me he salido de fight");}
}


function eventFloor() {

    var eventArray = ["poison", "curse", "tramp", "healingWater", "shortcut", "armour"];

    var currentEvent = Math.random();

    if(currentEvent <= 0.25) {
        //healing
        currentEvent = eventArray[3];

        pjSelected.currentHp = pjSelected.hpTotal;

        alert("You found a healing pond, you restore all your hp points.\nYou now have " + pjSelected.currentHp + "/" + pjSelected.hpTotal + " hp");

        nextFloor = true;
        stage = stage +=1;

        levelup();


    } else if(currentEvent >0.25 && currentEvent <=0.35) {

        // POISON
        currentEvent = eventArray[0];
        poison = true;
        poisonCount = Math.random();

        if(poisonCount <= 0.50) {
            poisonCount = 2;
        } else {
            poisonCount = 3;
        }

        pjSelected.currentHp -= 5;

        alert("You have entered a room with poison!\nYou lose 5hp and the poison will last for " + poisonCount + " turns\nYou now have " + pjSelected.currentHp + "/" + pjSelected.hpTotal + " hp");

        nextFloor = true;

        stage = stage +=1;
        levelup();

    } else if (currentEvent >0.35 && currentEvent <= 0.50) {
        // SHORTCUT
        currentEvent = eventArray[4];
        var advance = Math.random();

        if(advance <= 0.50) {
            advance = 2;
        } else {
            advance = 3;
        }

        stage = stage +=advance;
        levell = level +=advance;

        alert("You found a secret passage.\nYou have reached floor " + stage + " and now you are level " + level);

        nextFloor = true;
        levelup();

    } else if (currentEvent >0.50 && currentEvent <=0.65) {
        currentEvent = eventArray[1];
        damageCurse = true;
        damageCount = Math.random();

        if(damageCount <= 0.50) {
            damageCount = 2;
        } else {
            damageCount = 3;
        }

        alert("You have been cursed!\nYour basic attack would be *0.75 instead of 1 for " + damageCount + " floors");

        nextFloor = true;
        stage = stage +=1;
        levelup();

    } else if (currentEvent >0.65 && currentEvent <= 0.75) {
        currentEvent = eventArray[5];
        armour = 10;

        alert("You have found a magic armour, now your defense has gained 10 points.\nYour new defense value is " + totalDefense);

        nextFloor = true;
        stage = stage +=1;
        levelup();

    } else {
        currentEvent = eventArray[2];
        pjSelected.currentHp -=10;

        alert("You fell into a tramp! You lost 10hp\nYou now have " + pjSelected.currentHp + "/" + pjSelected.hpTotal + " hp");

        nextFloor = true;
        stage = stage +=1;
        levelup();

    }

}


// Main.js  (( aqui la magia ))


// VALIDADORES DE LAS OPCIONES
//prompt -- girl or boy (switch)

//document.getElementById("clickMe").onclick = function () {




var genderSelect = prompt("Select your gender: boy or girl");
//prompt -- archer, warrior, mage (switch)
var classSelect = prompt("Select your class: warrior, mage or archer");

var pjSelected = new pj(genderSelect, classSelect);

var rat = new monster("rat", "phisic", 5, 2, 3, 5, 20, 20);
var bat = new monster("bat", "area", 5, 2, 3, 5, 20, 20);

setSkills();

//prompt para confirmar el personaje

var confirmStats = '';
for (var property in pjSelected) {
    confirmStats += property + ': ' + pjSelected[property]+'\n';
}
var confirm =prompt("This is your character!!: \n\n" + confirmStats + "\nType yes to start or no to try again");

if(confirm === "yes") {
    alert("your adventure starts here");
}
else {
    location.reload();
}

// empezamos la aventura



// contar historia


//empieza la acción

//inicio todas las variables globales
var level = 1;
var stage = 1;
var objects = [];
var poison = false;
var poisonCount = 0;
var nextFloor = true;
var damageMultiplier = 1;
var damageCurse = false;
var damageCount = 0;
var damage = pjSelected.attack * damageMultiplier;
var armour = 0;
var totalDefense = pjSelected.defense += armour;
var debility = 1;
var log = "";
var dodgeAction = false;
var damageOfFight = 0;


while(nextFloor && stage<11) {

    if(poison) {
        poisonCount = poisonCount -=1;
        alert("You are poisoned, you lost 5hp")
        pjSelected.currentHp -=5;

        if (poisonCount <= 0) {
            poison = false;
        }else {
            alert("You will still have poison for " + poisonCount + " turns");
        }
    }

    if(damageCurse) {
        damageCount = damageCount -=1;
        alert("You still have a curse. Remember that your basic attack is 0,75");
        if (damageCount <= 0) {
            damageCurse = false;
        }else {
            alert("You will still have the curse for " + damageCount + " turns");
        }
    }

    var choose = prompt("You are on floor " + stage + ".\nYour hp is " + pjSelected.currentHp + "\nWhat do you want to do?\n openDoor, useObject or checkStatus");

    if (choose == "openDoor") {

        if (nextFloor){
            //funciones monstruos vs sucesos
            var action = Math.random();

            if (action <= 0.35) {

                alert("Ha ocurrido algo!");

                eventFloor();

            }
            else {
                alert("Ha aparecido un monstruo!");

                monsterFloor(rat);
            }
        }
    }

    else if (choose == "useObject") {
        // crear inventario
    }
    else if (choose == "exit") {

        nextFloor = false;

        alert("End of the road");
    }
    else if(choose =="checkStatus") {
        pjStatus();
    }
}

alert("exit of the game");


//}
