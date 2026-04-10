/*
Brandon Namgoong
TEJ4M
2026-04-##
Cookie Clicker
*/

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