// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

let baseurl = 'http://localhost:3000';
let token = localStorage.getItem('token');
if (token != undefined && token != null) {
    axios.post(`${baseurl}/authAdmin/`, {}, {
        headers: {
            authorization: token
        }
    }).then(response => {
        console.log('Admin User');
        localStorage.setItem('type', 'admin');
        $('<li><a class="nav-link text-black" href="/admin" id="admin-nav">Admin</a></li>').insertBefore('#navbar ul li:last');
    }).catch(error => {
        console.log('Customer User')
        localStorage.setItem('type', 'customer');
    });
}
