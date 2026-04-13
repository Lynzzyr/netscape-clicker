/*
Brandon Namgoong
TEJ4M
2026-04-##
Cookie Clicker
*/

// globals

let cookies = 0;
let perclick = 1;
let persecond = 0;

let elCookies = document.getElementById("stat-cookies");
let elPerclick = document.getElementById("stat-perclick");
let elPersecond = document.getElementById("stat-persecond");

// functions

/** Add to current cookie count by per the current number of cookies per click. */
function changeCookiesByClick() {
    cookies += perclick;
    elCookies.textContent = cookies;
}

/** Add to or subtract from current cookie count. Subtract by setting `amount` to a negative number. */
function changeCookies(amount) {
    cookies += amount;
    elCookies.textContent = cookies;
}

// document setup

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
elCookies.textContent = cookies;
elPerclick.textContent = perclick;
elPersecond.textContent = persecond;