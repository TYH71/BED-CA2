// Author: Tan Yu Hoe
// Class: DAAA/FT/1B/04
// Admission Number: P2026309

// query into the database to get all username 
// ?username=localStorage.getItem('userid');
// GET usernameExcept
axios.get(`${baseurl}/username`).then((response) => {
    response.data.forEach(element => {
        if (element.userid != localStorage.getItem('userid')) {
            $("#userbody").append(
                `
                <tr>
                    <td class="scope">${element.userid}</td>
                    <td>${element.username}</td>
                    <td>${element.type}</td>
                </tr>
                `
            );
            $("#selectUser").append(
                `
                <option value="${element.userid}">${element.username}</option>
                `
            );
        }
    });
}).catch(error => {
    console.log(error.response);
});


// submission of form
// put
$("#edituser").submit(event => {
    event.preventDefault();

    let req_body = {
        userid: $("#selectUser").val(),
        type: $("#editPermission").val()
    }

    axios.put(`${baseurl}/editPermission`, req_body, {
        headers: {
            authorization: localStorage.getItem('token')
        }
    }).then(response => {
        window.location.reload();
    }).catch(error => {
        console.log(error.response);
        alert('Unable to update admin privileges');
        window.location.reload();
    });
});