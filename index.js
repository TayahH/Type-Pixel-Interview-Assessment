// Attempt to connect to API
fetch('https://qptlenv0jf.execute-api.ap-southeast-2.amazonaws.com/assessment/reviews')
    .then(res => {
        return res.json(); // Wait for all data to be loaded
    })
    .then(data => { // Return data in an array

        data.response.reviews.forEach(review => {

            const displayName = review.user.display_name;
            const content = review.content;
            const title = review.title;
            const score = review.score;
            const reviewID = review.id;

            // Star rating HTML
            var rating = ``;
            for (let i = 0; i < score; i++) {
                rating += `<span class="fa fa-star"></span>`;
            };

            for (let y = 0; y < 5 - score; y++) {
                rating += `<span class="fa fa-star-o"></span>`;
            };

            // Card Template
            const card = `
                <div class="card swiper-slide">
                    <div class="testimonial-card" id="${reviewID}">
                        <div class="review">
                            <h2 class="card-title">${title}</h2>
                            <p class="card-paragraph">${content}</p>
                            <p class="read-more" id="${reviewID}" type="button" onclick="displayModal(this.id)" >Read more</p>
                        </div>
                        
                        <div class="reviewer">
                            <hr>
                            <div class="credit">
                                <p class="reviewer-name">${displayName}</p>
                                <div class="star-rating" >
                                    ${rating}
                                </div>
                            </div>
                
                        </div>
                    </div>
                 </div>
            `
            // Add card to HTML carousel
            document.querySelector('.card-wrapper').insertAdjacentHTML('beforeend', card);
        })
    })


// On Click of 'read-more', display modal
function displayModal(id) {
    const reviewId = document.getElementById(id);
    const title = reviewId.getElementsByClassName("card-title")[0].innerHTML;
    const content = reviewId.getElementsByClassName("card-paragraph")[0].innerHTML;
    const displayName = reviewId.getElementsByClassName("reviewer-name")[0].innerHTML;
    const score = reviewId.getElementsByClassName("star-rating")[0].innerHTML;

    // Remove current modal saved to HTML page
    const element = document.getElementById("modal");
    element.remove();

    // Modal template
    const currentModal = `
    <div id="modal" class="modal">
            <div class="modal-content">
                    <div class="review">
                        <span class="close" type="button" onclick="modal.style.display = 'none'">&times;</span>
                        <h2 class="modal-title">${title}</h2>
                        <p class="modal-paragraph">${content}</p>  
                    </div>
                    
                    <div class="reviewer">
                        <hr>
                        <div class="credit">
                            <p class="modal-reviewer-name">${displayName}</p>
                            <div class="star-rating">
                                ${score}
                            </div>
                        </div>
            
                    </div>
            </div>
    </div>
    `

    // Replace with new Modal populated with data according to clicked card
    document.querySelector('.slide-container ').insertAdjacentHTML('afterend', currentModal);

    // Display the modal
    modal.style.display = 'block';
}


// Modal closes when clicked outside of box
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Testimonial Carousel
var swiper = new Swiper(".slide-content", {
    slidesPerView: 4,
    spaceBetween: 25,
    loop: false,
    loopFillGroupWithBlank: true,
    navigation: {
        nextEl: '.nav-button-next',
        prevEl: '.nav-button-prev',
    },

    // Adjust number of cards with window size
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        740: {
            slidesPerView: 2,
        },
        1050: {
            slidesPerView: 3,
        },
        1300: {
            slidesPerView: 4,
        }
    }
})