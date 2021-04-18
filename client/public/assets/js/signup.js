// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

const baseurl = "http://localhost:3000";
$("#form-signup").submit((event) => {
    // Prevent page from reloading
    event.preventDefault();

    // take form data from respective input
    const username = $("#inputUsername").val();
    const email = $("#inputEmail").val();
    const password = $("#inputPassword").val();
    // create a request body object
    const requestBody = {
        username: username,
        type: "customer",
        email: email,
        password: password
    };

    // create post request to login
    axios.post(`${baseurl}/users/`, requestBody).then((response) => {
        // sends page to /login
        window.location.href = "/login"
    }).catch((error) => {
        console.log(error.response);
        alert('something went wrong');
    });
});
