var currency = Number(localStorage.getItem("currency")) || 0 //can change this to test
var timeout;
var manualclicklevel = Number(localStorage.getItem("clickamount")) || 1
var autoclickerlevel = Number(localStorage.getItem("autoclickerlevel")) || 0
var constants = { clickmult: 1.6, autocost: 2.1, automult: 2}
var achievementsArray = [
    { func: () => currency >= 1, name: "the very very beginning", description: "get the number to 1", completed: false },
    { func: () => manualclicklevel >= 2, name: "click click click", description: "level up the clicking upgrade", completed: false },
    { func: () => autoclickerlevel >= 1, name: "no need to click", description: "buy the automation upgrade", completed: false },
    { func: () => currency >= 1000, name: "thats higher than i can count!", description: "get the number to 1000", completed: false },
    { func: () => autoclickerlevel >= 10, name: "very fast", description: "get the autoclicker to level 10", completed: false },
    { func: () => manualclicklevel >= 20, name: "raining clicks", description: "get the clicking upgrade to level 20", completed: false },
    { func: () => currency >= 10**9, name: "it's not THAT extreme", description: "get the number to 1 billion", completed: false },
]
var achievementTestFunction = (value) => {
    if (value.func() && !value.completed) {
        console.log(value.name);
        value.completed = true
    }
}
var clickupgradecost = () => 10 * (2 ** manualclicklevel)
var clickupgradeamount = () => (constants.clickmult ** (manualclicklevel - 1))
var autoclickercost = () => Math.floor(10 * (constants.autocost ** autoclickerlevel))
var numberpersecond = () => (autoclickerlevel > 0) ? (constants.automult ** (autoclickerlevel - 1)) : 0
document.addEventListener("keydown", cheatfunction)

function cheatfunction(e) {
    console.log("you pressed a key, which is " + (10**((Number(e.key)**2)*2)))
    currency =  (10**((Number(e.key)**2)*2))
}

currency = currency + ((numberpersecond()) * ((new Date().valueOf()) - Number((localStorage.getItem("storedtime"))))) / 3000
display()

timeout = setInterval(autoclickthebutton, 10)

function clickthebutton() {
    //console.log(currency, clickupgradeamount(), manualclicklevel)
    //console.log(currency + clickupgradeamount())
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
    var autoclickertext;
    if (autoclickerlevel === 0) {
        autoclickertext = "unlock the autoclicker."
    }
    else {
        autoclickertext = "increase the level of the autoclicker"
    }
    achievementsArray.forEach(achievementTestFunction)

    function achievementsMessage() {
        var message = "<table><tr><th> name </th><th> how to get </th></tr>"
        achievementsArray.forEach((v) => {
            var completedMessage = (v.completed) ? "class='completed'" : "class='notcompleted'"
            //if (v.completed) {
            //completedMessage="completed"

            //}
            var miniMessage = "<tr  "  + completedMessage + " ><td>"+ v.name + " </td>  <td> " + v.description + "</td></tr>"
            message = message.concat(miniMessage)
        })
        message = message.concat("</table>")
        return message
    }
    console.log(achievementsMessage())
    document.getElementById("currencyDisplay").innerHTML = currency.toFixed((currency < 1000) ? 1 : 0)
    document.getElementById("achievementsDisplay").innerHTML = achievementsMessage()
    document.getElementById("clickbutton").innerHTML = "+" + clickupgradeamount().toFixed(1)
    document.getElementById("clickupgrade1").innerHTML = "Multiply the amount you get when clicking by " + constants.clickmult + ". Cost: " + clickupgradecost()
    document.getElementById("autoclicker").innerHTML = autoclickertext + " Cost: " + autoclickercost()
    localStorage.setItem("currency", currency)
    //console.log(localStorage.getItem("currency"))
    localStorage.setItem("clickamount", manualclicklevel)
    localStorage.setItem("autoclickerlevel", autoclickerlevel)
    //console.log(timeout)
    //console.log("savingautoclickerlevel" + localStorage.getItem("autoclickerlevel"))
    localStorage.setItem("storedtime", (new Date()).valueOf())
    //console.log(new Date(localStorage.getItem("storedtime")))
    //console.log(Number((localStorage.getItem("storedtime"))))
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
