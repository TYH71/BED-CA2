// DAAA/FT/1B/04
// P2026309
// Tan Yu Hoe

// extracting query
let queryString = window.location.search;
let urlParams = new URLSearchParams(queryString);
let title = urlParams.get('title');
let gameid = urlParams.get('gameid');

const colors = ['blue', 'green', "orange", 'red', 'purple']
// retrieve and display game based on title
axios.get(`${baseurl}/title/?title=${title}`).then((response) => {
    console.log(response.data);
    if (response.status == 200) {
        let data = response.data[0][0];
        let data2 = response.data[1][0];
        console.log('data2', data2);
        $("#gamecontainer").append(
            `
            <div class="class feature-icons" data-aos="fade-up">
                <h3>${data.title}</h3>

                <div class="row">

                    <div class="col-xl-4 text-center" data-aos="fade-right" data-aos-delay="100">
                        ${data.imgpath != null ? ` <img src="${data.imgpath}" class="img-fluid p-4" alt="">` : `<div class="container"><h1 class='text-dark' style='border-radius: 5px;'>404 Image Not Found: ${data.title}</h1></div>`}
                    </div>

                    <div class="col-xl-8 d-flex content">
                        <!-- 5 details -->
                        <div class="row align-self-center gy-4">

                            <div class="col-md-6 icon-box" data-aos="fade-up">
                                <i class="ri-sword-line"></i>
                                <div>
                                    <h4>Category</h4>
                                    <p>${data.catname}</p>
                                </div>
                            </div>

                            <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="200">
                                <i class="ri-gamepad-line"></i>
                                <div>
                                    <h4>Platform</h4>
                                    <p>${data.platform}</p>
                                </div>
                            </div>

                            <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="300">
                                <i class="ri-money-dollar-circle-line"></i>
                                <div>
                                    <h4>Price</h4>
                                    <p>$ ${data.price.toFixed(2)}
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="400">
                                <i class="ri-calendar-check-line"></i>
                                <div>
                                    <h4>Release Year</h4>
                                    <p>${data.year}
                                    </p>
                                </div>
                            </div>

                            <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                <i class="ri-article-line"></i>
                                <div>
                                    <h4>Description</h4>
                                    <p>${data.description}</p>
                                </div>
                            </div>

                            <div class="col-md-6 icon-box" data-aos="fade-up" data-aos-delay="100">
                                <i class="ri-user-star-line"></i>
                                <div>
                                    <h4>Average Rating</h4>
                                    ${data2['COUNT(rating)'] == null || data2['COUNT(rating)'] == 0 || data2['COUNT(rating)'] == undefined ? 'No reviews' : `<p>Average rating of ${data2['AVG(rating)'].toFixed(2)} from ${data2['COUNT(rating)']} comment(s)</p>`}
                                </div>
                            </div>

                        </div>
                        <!-- end of the 5 details -->

                    </div>

                </div>
            </div>
            `
        )
    } else {
        console.log(response.data);
    }
}).catch((error) => {
    console.log(error.response);
});

// list down all the reviews

axios.get(`${baseurl}/game/${gameid}/review`).then((response) => {
    console.log(response.data);
    if (response.status == 200) {
        response.data.forEach(element => {
            $("#reviewlist").append(
                `
                <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                    <div class="service-box ${colors[Math.floor(Math.random() * colors.length)]}">
                        <i class="ri-user-star-fill icon"></i>
                        <h3>${element.username}</h3>
                        ${'<i class="bi bi-star-fill text-warning"></i>'.repeat(element.rating)}
                        <p>${element.content}</p>
                    </div>
                </div> 
                `
            );
        });
    } else {
        console.log(response.data);
    }
}).catch(error => {
    console.log(error.response);
})

// end of this section (list reviews)


// toggle submit review section if token exist (user is logged in)
if (token != null) {
    $("#reviewsec").append(
        `
        <section id="contact" class="contact">

                <div class="container" data-aos="fade-up">

                    <header class="section-header">
                        <p>Submit your feedback on this game!</p>
                    </header>

                    <div class="row gy-4">

                        <div class="col-lg-6">

                            <div class="row gy-4">
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-geo-alt"></i>
                                        <h3>Address</h3>
                                        <p>Singapore Polytechnic<br>500 Dover Rd<br>Singapore 139651</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-telephone"></i>
                                        <h3>Call Us</h3>
                                        <p>+65 67751133</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-envelope"></i>
                                        <h3>Email Us</h3>
                                        <p>contactus@sp.edu.sg</p>
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="info-box">
                                        <i class="bi bi-clock"></i>
                                        <h3>Open Hours</h3>
                                        <p>One-Stop Center<br>Monday - Friday<br>8:30AM - 05:30PM</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="col-lg-6">
                            <form class="php-email-form">
                                <div class="row gy-4">

                                    <div class="col-md-12">
                                        <h3>${title}</h3>
                                    </div>

                                    <div class="col-md-12">
                                        <input type="number" class="form-control" name="rating" placeholder="Rating" min="1" max="5" step="1" id="rating"
                                            required>
                                        
                                    </div>

                                    <div class="col-md-12">
                                        <textarea class="form-control" name="message" rows="6" placeholder="Message" id="content"
                                            required></textarea>
                                    </div>

                                    <div class="col-md-12 text-center">
                                        <button type="submit">Send Review</button>
                                    </div>

                                </div>
                            </form>

                        </div>

                    </div>

                </div>

            </section>
        `
    );
} else {
    $("#reviewsec").empty();
}

// submit a review
$("#reviewsec").submit((event) => {
    event.preventDefault();
    let rating = $("#rating").val();
    let content = $("#content").val();
    let userid = localStorage.getItem('userid');

    let requestBody = {
        content: content,
        rating: rating
    };

    $("#rating").empty();
    $("#content").empty();
    console.log(requestBody);
    axios.post(`${baseurl}/user/${userid}/game/${gameid}/review/`, requestBody, {
        headers: { authorization: localStorage.getItem('token') }
    }).then((response) => {
        if (response.status == 201) {
            window.location.reload();
        } else {
            console.log(response.data);
        }
    }).catch((error) => {
        console.log(error.response);
        if (error.response.status == 401) {
            alert('401 Unauthorised');
            window.location.reload();
        } else {
            alert('500 Internal Server Error\nUnable to submit review');
        }
    });
});
// end of submit review