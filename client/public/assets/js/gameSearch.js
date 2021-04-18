// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

// declare colors and imgpath first
const colors = {
    'Shooter': 'blue',
    'RPG': 'green',
    'Survival': "orange",
    'Action': 'red',
    'MOBA': 'purple',
    null: 'pink'
}
const imgpath = [
    '/gameimg/csgo.jpeg',
    '/gameimg/cyberpunk.jpg',
    '/gameimg/minecraft.jpg',
    '/gameimg/league.jfif',
    '/gameimg/valorant.jfif',
    '/gameimg/spiderman.jpg'
];

axios.get(`${baseurl}/allPlatform`).then((response) => {
    let data = response.data;

    // convert response.data to ideal array
    let result = [];
    data.forEach(element => {
        result.push(Object.values(element).toString());
    });

    // removing all duplicates
    uniquePlatform = result.filter(function (item, pos) {
        return result.indexOf(item) == pos;
    });

    // place all the unique platforms in html
    uniquePlatform.forEach(element => {
        $("#searchPlatform").append(
            `<option value="${element}">${element}</option>`
        )
    });
}).then(err => {
    console.log(err.response);
});

axios.get(`${baseurl}/category`).then(response => {
    response.data.forEach(element => {
        $("#searchCategory").append(
            `<option value=${element.catid}>${element.catname}</option>`
        );
    });
}).then(err => {
    console.log(err.response);
});

axios.get(`${baseurl}/year`).then(response => {
    let data = response.data;

    // convert response.data to ideal array
    let result = [];
    data.forEach(element => {
        result.push(Object.values(element).toString());
    });

    // removing all duplicates
    uniqueYear = result.filter(function (item, pos) {
        return result.indexOf(item) == pos;
    });

    // place all the unique platforms in html
    uniqueYear.forEach(element => {
        $("#searchYear").append(
            `<option value="${element}">${element}</option>`
        )
    });
}).catch(err => {
    console.log(err.response);
});



let searchTitle = $("#searchTitle").val();
let searchPlatform = $("#searchPlatform").val();
let searchPrice = $("#searchPrice").val();

axios.get(`${baseurl}/games/`).then((response) => {
    if (response.status == 200) {
        // create default game listing
        for (let i = 0; i < response.data.length; i++) {
            let e = response.data[i];
            console.log(e);
            $("#listings").append(
                `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-box ${colors[e.catname] != null ? colors[e.catname] : Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)]}">
                        ${e.imgpath != null ? `<img src="${e.imgpath}" class="img-fluid"></img>` : '<i class="ri-game-fill icon"></i>'}
                        <hr class="my-4">
                        <h3>${e.title}</h3>
                        <hr class="my-4">
                        <div class="row justify-content-center">
                            <h5 class="col-5"><i class="ri-computer-line ri-lg"></i>&nbsp;${e.platform}</h5>
                            <h5 class="col-5 text-sm"><i class="ri-sword-line text-lg ri-lg"></i>&nbsp;${e.catname}</h5>
                            <br>
                            <h5 class="col-5">$&nbsp;${e.price.toFixed(2)}</h5>
                            <h5 class="col-5"><i class="ri-calendar-event-fill ri-lg"></i>&nbsp${e.year}</h5>
                        </div>
                        <hr class="my-4">
                        <p>${e.description}</p>
                        <a href="/game/?title=${e.title}&gameid=${e.gameid}" class="read-more"l="noopener noreferrer"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
                `
            );
        }
    } else {
        console.log('error');
    }
}).catch(err => {
    console.log(err.response);
});

// search game
$("#searchGames").submit((event) => {
    // prevent window from reloading
    event.preventDefault();
    // collect data forms (search bar)
    let searchTitle = $("#searchTitle").val();
    let searchPlatform = $("#searchPlatform").val();
    let searchPrice = $("#searchPrice").val();
    let searchCategory = $("#searchCategory").val();
    let searchYear = $("#searchYear").val();

    axios.get(`${baseurl}/games/${searchPlatform}?title=${searchTitle}&price=${searchPrice}&category=${searchCategory}&year=${searchYear}`).then((response) => {

        $("#listings").empty();

        for (let i = 0; i < response.data.length; i++) {
            let e = response.data[i];
            console.log(e);
            $("#listings").append(
                `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-box ${colors[e.catname] != null ? colors[e.catname] : Object.values(colors)[Math.floor(Math.random() * Object.values(colors).length)]}">
                        ${e.imgpath != null ? `<img src="${e.imgpath}" class="img-fluid"></img>` : '<i class="ri-game-fill icon"></i>'}
                        <hr class="my-4">
                        <h3>${e.title}</h3>
                        <hr class="my-4">
                        <div class="row">
                            <h5 class="col-6"><i class="ri-computer-line ri-lg"></i>&nbsp;${e.platform}</h5>
                            <h5 class="col-6 text-sm"><i class="ri-sword-line text-lg ri-lg"></i>&nbsp;${e.catname}</h5>
                            <h5 class="col-6">$&nbsp;${e.price.toFixed(2)}</h5>
                            <h5 class="col-6"><i class="ri-calendar-event-fill ri-lg"></i>&nbsp${e.year}</h5>
                        </div> 
                        <hr class="my-4">
                        <p>${e.description}</p>
                        <a href="/game/?title=${e.title}&gameid=${e.gameid}" class="read-more" rel="noopener noreferrer"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
                    </div>
                </div>
                `
            );
        }
    }).catch(err => {
        console.log(err.response);
        alert('500 Internal Server Error\nUnable to search Game');
        window.location.reload();
    });
});
