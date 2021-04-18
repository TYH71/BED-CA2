// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

let baseurl = "http://localhost:3000"
$("#form-signin").submit((event) => {
    // Prevent page from reloading
    event.preventDefault();

    // take form data from respective input
    const username = $("#inputUsername").val();
    const password = $("#inputPassword").val();
    // create a request body object
    let requestBody = {
        username: username,
        password: password
    };

    // create post request to login
    axios.post(`${baseurl}/login/`, requestBody).then((response) => {
        // collect response .token and .user_id
        const token = response.data.token;
        const userid = response.data.user_id;
        const type = response.data.type;
        // put .token and .userid into localStorage
        localStorage.setItem("token", `Bearer ${token}`);
        localStorage.setItem("userid", userid);
        localStorage.setItem("type", type);
        // sends page to /
        window.history.back();
    }).catch((error) => {
        console.log(error.response);
        if (error.response.status == 401) {
            alert("Wrong login info");
        } else {
            alert("Something unexpected went wrong");
        }
    });
});
