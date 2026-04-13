/*
Brandon Namgoong
TEJ4M
2026-04-##
Cookie Clicker
*/

// globals

let cookies = 0;
let perclick = 1;
let persecond = 0.5;

let elCookies = document.getElementById("stat-cookies");
let elPerclick = document.getElementById("stat-perclick");
let elPersecond = document.getElementById("stat-persecond");

// functions

/** Add to current cookie count by per the current number of cookies per click. */
function changeCookiesByClick() {
    cookies += perclick;
    elCookies.innerHTML = cookies;
}

/** Add to or subtract from current cookie count. Subtract by setting `amount` to a negative number. */
function changeCookiesBy(amount) {
    cookies += amount;
    elCookies.innerHTML = cookies;
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

// variables

let cookieInterval = constructCookieInterval();

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
elCookies.innerHTML = cookies;
elPerclick.innerHTML = perclick;
elPersecond.innerHTML = persecond;