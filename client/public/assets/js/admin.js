// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

let type = localStorage.getItem('type');

let colors = {
    'Shooter': 'blue',
    'RPG': 'green',
    'Survival': "orange",
    'Action': 'red',
    'MOBA': 'purple',
    null: 'pink'
}


let icons = {
    'Shooter': '<i class="ri-team-fill icon"></i>',
    'RPG': '<i class="ri-spy-fill icon"></i>',
    'Survival': '<i class="ri-ghost-fill icon"></i>',
    'Action': '<i class="ri-sword-fill icon"></i>',
    'MOBA': '<i class="ri-road-map-fill icon"></i>'
}

axios.post(`${baseurl}/authAdmin/`, {}, {
    headers: { authorization: localStorage.getItem('token') }
}).then(response => {
    console.log('Status Code: ', response.status);
    if (response.status != 200) {
        console.log('Non-admin User');
        localStorage.setItem('type', 'customer');
        alert('Status 403: Forbidden');
        window.location.href = '/';
    } else {
        console.log('Admin User');
        localStorage.setItem('type', 'admin');
    }
}).catch(error => {
    console.log('Non-admin User');
    localStorage.setItem('type', 'customer');
    alert('Status 403: Forbidden');
    window.location.href = '/';
});

axios.get(`${baseurl}/category`).then((response) => {
    response.data.forEach(element => {
        $("#catlist").append(
            `
            <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                <div class="service-box ${colors[element.catname] != null ? colors[element.catname] : Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)]}">
                    ${icons[element.catname] != null ? icons[element.catname] : '<i class="ri-game-fill icon"></i>'}
                    <h3>${element.catname}</h3>
                    <p>${element.description}</p>
                </div>
            </div>
            `
        );
    });
    $("#catlist").append(
        `
        <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
            <div class="service-box pink">
                <i class="ri-discuss-line icon"></i>
                <h3>Insert a new Category</h3>
                <form id="newcat">
                    <div class='form-group'>
                        <input placeholder='Name' type='text' id='catname' class='form-control' required>
                    </div>
                    <br>
                    <div class='form-group'>
                        <textarea placeholder='Description' type='text' id='description' class='form-control' required></textarea>
                    </div>
                    <br>
                    <button type="submit" class="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
        `
    );
    $("#newcat").ready().submit((event) => {
        event.preventDefault();

        let req_body = {
            catname: $("#catname").val(),
            description: $("#description").val()
        };

        axios.post(`${baseurl}/category/`, req_body, {
            headers: { authorization: localStorage.getItem('token') }
        }).then((response) => {
            window.location.reload();
        }).catch(err => {
            if (err.response.status == 422) {
                alert('422 Duplicate Entry');
            } else {
                alert('Unable to add categories');
            }
        });
    });
});

// create category options in html forms
axios.get(`${baseurl}/category/`).then((response) => {
    if (response.status == 200) {
        $("#catname").empty();
        response.data.forEach(element => {
            $("#bigcat").append(
                `
                <option value="${element.catid}">
                    ${element.catname}
                </option>
                `
            );
        });
    } else {
        console.log(response.data);
    }
}).catch(err => {
    console.log(err);
});

$("#newgame").submit(event => {
    event.preventDefault();

    let title = $("#title").val();
    let price = $("#price").val();
    let catid = $("#bigcat").val();
    let description = $("#gamedescription").val();
    let year = $("#year").val();
    let platform = $("#platform").val();

    let req_body = {
        title: title,
        description: description,
        price: price,
        platform: platform,
        categoryid: catid,
        year: year
    };

    let imagefile = document.querySelector('#img');
    let formData = new FormData();
    formData.append("image", imagefile.files[0]);

    // upload game
    axios.post(`${baseurl}/game/`, req_body, {
        headers: { authorization: localStorage.getItem('token') }
    }).then((response1) => {
        let gameid = response1.data[0].gameid;
        if (document.getElementById("img").files.length != 0) {
            // image upload
            axios.post(`${baseurl}/image/${gameid}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then((event) => {
                window.location.href = `/game/?title=${title}&gameid=${gameid}`;
            });
        } else {
            window.location.href = `/game/?title=${title}&gameid=${gameid}`;
        }
    }).catch(err => {
        console.log(err.response);
        alert('500 Internal Server Error');
    });
});