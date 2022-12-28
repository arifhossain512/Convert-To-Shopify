
'use strict'
const hamburger = document.querySelector(".hamburger");
const close = document.querySelector(".nav-list .close");
const menu = document.querySelector(".nav-list");



// LogIn Form toggle
const signInForm = document.querySelector("#toggle");
document.querySelector(".signin").onclick = (e) => {
  e.preventDefault();
};

document.querySelector(".signin").onclick = (e) => {
  e.preventDefault();
  signInForm.classList.add("active");
};

document.querySelector(".close-form").onclick = (e) => {
  e.preventDefault();
  signInForm.classList.remove("active");
};


// Menu Toggler
hamburger.addEventListener("click", () => {
  menu.classList.add("show");

});

close.addEventListener("click", () => {
  menu.classList.remove("show");
});




// SLIDER 
// SWIPER SLIDE DECLEARATION
const swiper = new Swiper(".swiper-container", {
  grabCursor: true,
  slidesPerView: 1,
  spaceBetween: 30,

  scrollbar: {
    el: '.swiper-scrollbar',
  },
  pagination: {
    el: ".custom-pagination",
    clickable: true,
  },
  breakpoints: {
    567: {
      slidesPerView: 2,
    },
    996: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});


/* ========== Fetch the Products =========== */

const getProducts = async () => {
  try {
    const results = await fetch("./data/products.json");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

const ProductsWrapper = document.getElementById("products-wrapper");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
});

/* ========== Display Products =========== */
const displayProductItems = (items) => {
  let displayProduct = items.map(
    (product) => ` 
                <div class="swiper-slide">
                  <div class="card d-flex">
                    <div class="image">
                      <img src=${product.url} alt="">
                    </div>
                    <div class="rating">
                      <span><i class="bx bxs-star"></i></span>
                      <span><i class="bx bxs-star"></i></span>
                      <span><i class="bx bxs-star"></i></span>
                      <span><i class="bx bxs-star"></i></span>
                      <span><i class="bx bxs-star"></i></span>
                    </div>
                    <h4>${product.title}</h4>
                    <div class="price">
                      <span>Price</span><span class="color">$${product.price}</span>
                    </div>
                    <div class="button btn">Add To Cart+</div>
                  </div>
                  
              </div>
                  `
  );

  displayProduct = displayProduct.join("");
  if (ProductsWrapper) {
    ProductsWrapper.innerHTML = displayProduct;
  }
};

/* ========== Filter Products =========== */
const MenuList = [...document.querySelectorAll(".filters span")];

MenuList.forEach((list) => {
  MenuList[0].classList.add("active"); //defaults selection

  list.addEventListener("click", async (e) => {
    const ListId = e.target.getAttribute("data-filter");
    const SelectedItem = e.target;
    const products = await getProducts();

    // removing active class from all other options in menu-list
    MenuList.forEach((category) => {
      category.classList.remove("active");
    });
    // add active class when selec
    SelectedItem.classList.add("active");

    let menuCategory = products.filter((product) => {
      if (product.category === ListId) {
        return product;
      }
    });

    if (ListId === "All Product") {
      displayProductItems(products);
      swiper.update();
    } else {
      displayProductItems(menuCategory);
      swiper.update();
    }
  });
});

// Get testimonial Data
const getTestimonials = async () => {
  try {
    const results = await fetch('./data/testimonials.json');
    const data = await results.json();
    const testimonials = data.testimonials;
    return testimonials;
  } catch (err) {
    console.log(err);
  }
};

const testimonialsWrapper = document.querySelector('.test-wrapper');
const cards = [...document.querySelectorAll('.testimonials .card')];

window.addEventListener('DOMContentLoaded', async function () {
  const testimonials = await getTestimonials();
  displayTestimonials(testimonials);
  filter();
});


// Display Testimonial 
const displayTestimonials = (items) => {
  let testimonials = items.map(
    (item) => `<div class="testimonial" data-id="${item.firstName}">
            <div class="d-flex">
              <div>
                <h4>${item.name}</h4>
                <span>${item.position}</span>
              </div>

              <div class="rating">
                <span><i class="bx bxs-star"></i></span>
                <span><i class="bx bxs-star"></i></span>
                <span><i class="bx bxs-star"></i></span>
                <span><i class='bx bxs-star-half' ></i></i></span>
                <span><i class='bx bxs-star-half' ></i></i></span>
              </div>
            </div>

            <p>
             ${item.info}
            </p>
          </div>`
  );

  testimonials = testimonials.join('');
  testimonialsWrapper.innerHTML = testimonials;
};



// Filter the testimonial
function filter() {
  const testimonials = [...document.querySelectorAll('.testimonial')];
  const cards = [...document.querySelectorAll('.card')];

  // Add active class to first card and testimonial
  cards[0].classList.add('active');
  testimonials[0].classList.add('active');

  // Set up click event listeners for cards
  cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Remove active class from all cards
      cards.forEach(card => card.classList.remove('active'));
      // Add active class to clicked card
      card.classList.add('active');

      // Hide all testimonials
      testimonials.forEach(testimonial => testimonial.classList.remove('active'));
      // Show testimonial with matching data-id attribute
      const filter = card.getAttribute('data-filter');
      const matchingTestimonial = testimonials.find(testimonial => testimonial.getAttribute('data-id') === filter);
      if (matchingTestimonial) {
        matchingTestimonial.classList.add('active');
      }
    });
  });
}
