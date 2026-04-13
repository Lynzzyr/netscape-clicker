/*
Brandon Namgoong
TEJ4M
2026-04-13
Cookie Clicker
*/

// globals

let cookies = 0;
let perclick = 1;
let persecond = 0.5; // DEV NOTE DONT LET THIS BE 0

let elCookies = document.getElementById("stat-cookies");
let elPerclick = document.getElementById("stat-perclick");
let elPersecond = document.getElementById("stat-persecond");

let cookieInterval = constructCookieInterval();

// classes

class Upgrade {
    constructor(uniqueIdentifier, initialCost) {
        this.cost = initialCost;

        this.elementMain = document.getElementById("upgrade-" + uniqueIdentifier); // enforce naming in HTML
        this.elementCost = document.getElementById("upgradecost-" + uniqueIdentifier);
    }

    setCallback(callback) {
        this.callback = callback;
    }

    updateElementMain() {
        if (cookies >= this.cost) {
            this.elementMain.style.setProperty("--click-fill", "lightgreen");
        } else {
            this.elementMain.style.setProperty("--click-fill", "lightcoral");
        }
    }

    updateElementCost() {
        this.elementCost.innerHTML = this.cost;
    }

    initiate() {
        if (cookies >= this.cost) { // cost check
            this.callback();
        }
    }
}

// functions

/** Updates number of cookies. */
function updateCookies() {
    elCookies.innerHTML = cookies;
}

/** Updates number of cookies per click. */
function updatePerclick() {
    elPerclick.innerHTML = perclick;
}

/** Updates number of cookies per second. */
function updatePersecond() {
    elPersecond.innerHTML = persecond;
}

/** Adds to current cookie count by per the current number of cookies per click. */
function changeCookiesByClick() {
    cookies += perclick;
    updateCookies();
}

/** Adds to or subtracts from current cookie count. Subtract by setting `amount` to a negative number. */
function changeCookiesBy(amount) {
    cookies += amount;
    updateCookies();
}

/** Convenience function that creates and returns a new cookie interval based on the current cookies per second. */
function constructCookieInterval() {
    return setInterval( // initial setup
        () => {
            changeCookiesBy(1);
        },
        (1 / persecond) * 1000 // math
    );
}

// page setup

// menu bar tooltip hovering
for (const item of document.getElementsByClassName("menu-bar-item")) {
    // when hovering
    item.addEventListener("mouseenter", () => {
        document.getElementById("menu-bar-tooltip").style.visibility = "visible";
    });
    // when not
    item.addEventListener("mouseleave", () => {
        document.getElementById("menu-bar-tooltip").style.visibility = "hidden";
    });
}

// create improvement objects
const upgradePerclick = new Upgrade("perclick", 50);
upgradePerclick.setCallback(() => {
    // increment cookies per click
    perclick++;
    updatePerclick();

    // subtract upgrade cost
    cookies -= upgradePerclick.cost;
    updateCookies();

    // double cost
    upgradePerclick.cost *= 2;
    upgradePerclick.updateElementCost();

    upgradePerclick.updateElementMain();
});
const upgradePersecond = new Upgrade("persecond", 200);
upgradePersecond.setCallback(() => {
    // double cookies per second
    persecond *= 2;
    updatePersecond();

    // subtract upgrade cost
    cookies -= upgradePersecond.cost;
    updateCookies();

    // double cost
    upgradePersecond.cost *= 2;
    upgradePersecond.updateElementCost();

    upgradePersecond.updateElementMain();

    // reconstruct interval
    clearInterval(cookieInterval);
    cookieInterval = constructCookieInterval();
})

// stats bar start values
updateCookies();
updatePerclick();
updatePersecond();

upgradePerclick.updateElementCost();
upgradePersecond.updateElementCost();

// upgrade button dynamic fill color, stupid workaround by making it update as soon as mouse hovers
upgradePerclick.elementMain.addEventListener("mouseenter", () => { upgradePerclick.updateElementMain(); });
upgradePersecond.elementMain.addEventListener("mouseenter", () => { upgradePersecond.updateElementMain(); });