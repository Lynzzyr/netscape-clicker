/*
Brandon Namgoong
TEJ4M
2026-04-13
Cookie Clicker
*/

// classes

/** Abstract representation of an object that displays a certain statistic. */
class Stat {
    constructor(uniqueIdentifier, initialValue) {
        this.element = document.getElementById("stat-" + uniqueIdentifier); // enforce naming in HTML

        this.value = initialValue;
    }

    /** Updates the visual element. */
    updateElement() {
        this.element.innerHTML = this.value;
    }

    /** Adds to or subtracts from the current value. */
    changeValueBy(amount) {
        this.value += amount;
        this.updateElement(); // update as well
    }

    /** Manually sets the value. */
    setValueTo(newValue) {
        this.value = newValue;
        this.updateElement(); // update as well
    }
}

/** Abstract representation of an object that can initiate a certain upgrade. */
class Upgrade {
    constructor(uniqueIdentifier, initialCost, callback) {
        this.elementMain = document.getElementById("upgrade-" + uniqueIdentifier); // enforce naming in HTML
        this.elementCost = document.getElementById("upgradecost-" + uniqueIdentifier);

        this.cost = initialCost;

        this.callback = callback;
    }

    /** Updates the visual element. */
    updateElementMain() {
        if (statCookies.value >= this.cost) {
            this.elementMain.style.setProperty("--click-fill", "lightgreen");
        } else {
            this.elementMain.style.setProperty("--click-fill", "lightcoral");
        }
    }

    /** Updates the cost element. */
    updateElementCost() {
        this.elementCost.innerHTML = this.cost;
    }

    /** Initiates the upgrade. */
    initiate() {
        if (statCookies.value >= this.cost) { // cost check
            this.callback();

            // other maintenance stuff
            statCookies.changeValueBy(-this.cost); // subtract upgrade cost

            this.cost *= 2; // double cost
            this.updateElementCost();

            this.updateElementMain();
        }
    }
}

// functions

/** Convenience function that creates and returns a new cookie interval based on the current cookies per second. */
function constructCookieInterval() {
    return setInterval( // initial setup
        () => {
            statCookies.changeValueBy(1);
        },
        (1 / statPersecond.value) * 1000 // math
    );
}

// create objects

const statCookies = new Stat("cookies", 0);
const statPerclick = new Stat("perclick", 1);
const statPersecond = new Stat("persecond", 0.5); // DEV NOTE DONT LET THIS BE 0

let cookieInterval = constructCookieInterval();

const upgradePerclick = new Upgrade("perclick", 50, () => {
    statPerclick.changeValueBy(1);
});
const upgradePersecond = new Upgrade("persecond", 200, () => {
    statPersecond.setValueTo(statPersecond.value * 2);

    clearInterval(cookieInterval); // reconstruct
    cookieInterval = constructCookieInterval();
});

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

// start values
statCookies.updateElement();
statPerclick.updateElement();
statPersecond.updateElement();

upgradePerclick.updateElementCost();
upgradePersecond.updateElementCost();

// upgrade button dynamic fill color, stupid workaround by making it update as soon as mouse hovers
upgradePerclick.elementMain.addEventListener("mouseenter", () => { upgradePerclick.updateElementMain(); });
upgradePersecond.elementMain.addEventListener("mouseenter", () => { upgradePersecond.updateElementMain(); });