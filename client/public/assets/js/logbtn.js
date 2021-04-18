// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

if (localStorage.getItem("userid") != null && localStorage.getItem("userid") != null) {
    $("#logbtn").empty().append(
        `<a class="nav-link login text-black" id="logout" href="">Log Out</a>`
    );
} else {
    localStorage.clear();
    $("#logbtn").empty().append(
        `<a class="nav-link login text-black" href="/login">Login</a>`
    );
}
$("#logout").click((event) => {
    localStorage.clear();
    $("#logbtn").empty().append(
        `<a class="nav-link login text-black" href="/login">Login</a>`
    );
});