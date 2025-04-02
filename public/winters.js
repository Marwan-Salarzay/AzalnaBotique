let items = [];

async function fetchProducts() {
    try {
        const response = await fetch('http://azalna-botique.vercel.app/api/winters');
        if (!response.ok) throw new Error('Network response was not ok');
        items = await response.json();
        appendItems();
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function appendItems() {
  const clothesList = document.querySelector(".allClothes");
  clothesList.innerHTML = '';

  items.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
          <div id="${item._id}" class="item parent flexBetween" style="transition-delay: ${index * 0.25}s;">
              <div class="itemImg div1">
                  <img src="${item.image}" alt="${item.name}" height="400px" width="400px" />
              </div>
              <div class="info">
                  <div class="name">
                      <h5>${item.name}</h5>
                  </div>
                  <div class="price">
                      <h5>PKR ${item.price}</h5>
                  </div>
              </div>
          </div>
      `;

      li.querySelector('.item').addEventListener('click', () => {
          window.location.href = `specificProduct.html?itemId=${item._id}`;
      });

      clothesList.appendChild(li);
  });

  initializeObserver();
  
}

function initializeObserver() {
    const items = document.querySelectorAll(".item");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    items.forEach((item) => {
        observer.observe(item);
    });
}

document.addEventListener("DOMContentLoaded", fetchProducts);

document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navbar = document.querySelector(".navbar");

    if (menuToggle) {
        menuToggle.addEventListener("click", () => {
            navbar.classList.toggle("mobile-active");
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth",
            });
        });
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navContainer = document.getElementById('navContainer');

    menuToggle.addEventListener('click', function() {
        menuToggle.classList.toggle('active');
        navContainer.classList.toggle('active');
    });

    const navLinks = document.querySelectorAll('.nav-container a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
        });
    });


    document.addEventListener('click', function(event) {
        const isClickInsideNav = navContainer.contains(event.target);
        const isClickOnToggle = menuToggle.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnToggle && navContainer.classList.contains('active')) {
            menuToggle.classList.remove('active');
            navContainer.classList.remove('active');
        }
    });
});
