let currency = Number(localStorage.getItem("currency")) || 0 //can change this to test
let timeout;
let manualclicklevel = Number(localStorage.getItem("clickamount")) || 1
let autoclickerlevel = Number(localStorage.getItem("autoclickerlevel")) || 0
const constants = { clickmult: 1.6, autocost: 2.1, automult: 2}
const achievementsArray = [
    { func: () => currency >= 1, name: "the very very beginning", description: "get the number to 1", completed: false },
    { func: () => manualclicklevel >= 2, name: "click click click", description: "level up the clicking upgrade", completed: false },
    { func: () => autoclickerlevel >= 1, name: "no need to click", description: "buy the automation upgrade", completed: false },
    { func: () => currency >= 1000, name: "thats higher than i can count!", description: "get the number to 1000", completed: false },
    { func: () => autoclickerlevel >= 10, name: "very fast", description: "get the autoclicker to level 10", completed: false },
    { func: () => manualclicklevel >= 20, name: "raining clicks", description: "get the clicking upgrade to level 20", completed: false },
    { func: () => currency >= 10**9, name: "it's not THAT extreme", description: "get the number to 1 billion", completed: false },
]
const achievementTestFunction = (value) => {if (value.func() && !value.completed) {value.completed = true}}


const clickupgradecost = () => 10 * (2 ** manualclicklevel)
const clickupgradeamount = () => (constants.clickmult ** (manualclicklevel - 1))
const autoclickercost = () => Math.floor(10 * (constants.autocost ** autoclickerlevel))
const numberpersecond = () => (autoclickerlevel > 0) ? (constants.automult ** (autoclickerlevel - 1)) : 0

document.addEventListener("keydown", cheatfunction)


function cheatfunction(e) {
    console.log("you pressed a key, which is " + (10**((Number(e.key)**2)*2)))
    currency =  (10**((Number(e.key)**2)*2))
}

currency = currency + ((numberpersecond()) * ((new Date().valueOf()) - Number((localStorage.getItem("storedtime"))))) / 3000
display()

timeout = setInterval(autoclickthebutton, 10)

function clickthebutton() {
   
    currency = Number(currency) + clickupgradeamount()
    currency = Number(Number(currency).toFixed(1))
    display()
    console.log(numberpersecond)
}
function autoclickthebutton() {

    currency = currency + (numberpersecond() / 100)

    display()
}


function reset() {
    if (confirm("are you sure you want to reset? You will lose all of your progress!")) {
        currency = 0
        manualclicklevel = 1
        autoclickerlevel = 0
        for (let i = 0; i < achievementsArray.length; i++) {
            achievementsArray[i].completed = false
        }
        display()

    }

}
function opentabs(evt, tabName) {
    var i, tabcontent, tablinks;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    console.log(tabName)

    document.getElementById(tabName).style.display = "block";
}

function clickUpgrade1() {

    if (currency >= clickupgradecost()) {
        currency = currency - clickupgradecost()
        manualclicklevel = manualclicklevel + 1
        display()

    }

}


function display() {
    let autoclickertext;
    if (autoclickerlevel === 0) {
        autoclickertext = "unlock the autoclicker."
    }
    else {
        autoclickertext = "increase the level of the autoclicker"
    }
    achievementsArray.forEach(achievementTestFunction)

    function achievementsMessage() {
        let message = "<table><tr><th> name </th><th> how to get </th></tr>"
        achievementsArray.forEach((v) => {
            let completedMessage = (v.completed) ? "class='completed'" : "class='notcompleted'"
            
            let miniMessage = "<tr  "  + completedMessage + " ><td>"+ v.name + " </td>  <td> " + v.description + "</td></tr>"
            message = message.concat(miniMessage)
        })
        message = message.concat("</table>")
        return message
    }
    //console.log(achievementsMessage())
    document.getElementById("currencyDisplay").innerHTML = currency.toFixed((currency < 1000) ? 1 : 0)
    document.getElementById("achievementsDisplay").innerHTML = achievementsMessage()
    document.getElementById("clickbutton").innerHTML = "+" + clickupgradeamount().toFixed(1)
    document.getElementById("clickupgrade1").innerHTML = "Multiply the amount you get when clicking by " + constants.clickmult + ". Cost: " + clickupgradecost()
    document.getElementById("autoclicker").innerHTML = autoclickertext + " Cost: " + autoclickercost()
    
    localStorage.setItem("currency", currency)
    localStorage.setItem("clickamount", manualclicklevel)
    localStorage.setItem("autoclickerlevel", autoclickerlevel)
    localStorage.setItem("storedtime", (new Date()).valueOf())
    
    document.getElementById("autoclicker").disabled = !(currency >= autoclickercost())
    document.getElementById("clickupgrade1").disabled = !(currency >= clickupgradecost())

}


function autoclickerunlocked(firsttime) {
    if (currency >= autoclickercost()) {
        currency = currency - autoclickercost()
        autoclickerlevel = autoclickerlevel + 1


    }
    display()
}
