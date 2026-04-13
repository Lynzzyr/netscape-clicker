/*
Brandon Namgoong
TEJ4M
2026-04-13
Cookie Clicker
*/

// variables

let cookies = 0;
let perclick = 1;
let persecond = 0.5; // DEV NOTE DONT LET THIS BE 0
let upgradecostPerclick = 50;
let upgradecostPersecond = 200;

let elCookies = document.getElementById("stat-cookies");
let elPerclick = document.getElementById("stat-perclick");
let elPersecond = document.getElementById("stat-persecond");
let elUpgradecostPerclick = document.getElementById("upgradecost-perclick");
let elUpgradecostPersecond = document.getElementById("upgradecost-persecond");

let elUpgradePerclick = document.getElementById("upgrade-perclick");
let elUpgradePersecond = document.getElementById("upgrade-persecond");

let cookieInterval = constructCookieInterval();

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

/** Updates upgrade cost for cookies per click. */
function updateUpgradecostPerclick() {
    elUpgradecostPerclick.innerHTML = upgradecostPerclick;
}

/** Updates upgrade cost for cookies per second. */
function updateUpgradecostPersecond() {
    elUpgradecostPersecond.innerHTML = upgradecostPersecond;
}

/** Updates the per click upgrade element. */
function updateUpgradePerclick() {
    if (cookies >= upgradecostPerclick) {
        elUpgradePerclick.style.setProperty("--click-fill", "lightgreen");
    } else {
        elUpgradePerclick.style.setProperty("--click-fill", "lightcoral");
    }
}

/** Updates the per second upgrade element. */
function updateUpgradePersecond() {
    if (cookies >= upgradecostPersecond) {
        elUpgradePersecond.style.setProperty("--click-fill", "lightgreen");
    } else {
        elUpgradePersecond.style.setProperty("--click-fill", "lightcoral");
    }
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

/** Adds 1 to the number of cookies per click only if possible with current number of cookies.*/
function incrementCookiesPerClick() {
    if (cookies >= upgradecostPerclick) { // cost check
        perclick++;
        updatePerclick();

        cookies -= upgradecostPerclick; // subtract upgrade cost
        updateCookies();

        upgradecostPerclick *= 2; // double cost
        updateUpgradecostPerclick();

        updateUpgradePerclick();
    }
}

/** Doubles the number of cookies per second only if possible with current number of cookies. */
function doubleCookieInterval() {
    if (cookies >= upgradecostPersecond) { // cost check
        persecond *= 2;
        updatePersecond()

        cookies -= upgradecostPersecond; // subtract upgrade cost
        updateCookies();

        upgradecostPersecond *= 2; // double cost
        updateUpgradecostPersecond();

        // reconstruct interval
        clearInterval(cookieInterval);
        cookieInterval = constructCookieInterval();

        updateUpgradePersecond();
    }
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

// stats bar start values
updateCookies();
updatePerclick();
updatePersecond();

updateUpgradecostPerclick();
updateUpgradecostPersecond();

// upgrade button dynamic fill color, stupid workaround by making it update as soon as mouse hovers
elUpgradePerclick.addEventListener("mouseenter", () => { updateUpgradePerclick(); });
elUpgradePersecond.addEventListener("mouseenter", () => { updateUpgradePersecond() });