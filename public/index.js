document.querySelector('.newArrivals').addEventListener('click',()=>{
  window.location.href = "newArrivals.html"
})
document.querySelector('.allCatalouge').addEventListener('click',()=>{
  window.location.href = "allProducts.html"
})

document.querySelector('.summerCollection').addEventListener('click',()=>{
  window.location.href = "summers.html"
})

document.querySelector('.partyCollection').addEventListener('click',()=>{
  window.location.href = "partyWear.html"
})

document.querySelector('.winterCollection').addEventListener('click',()=>{
  window.location.href = "winters.html"
})


 document.addEventListener("DOMContentLoaded", () => {
  
    const menuToggle = document.querySelector(".menu-toggle")
    const navbar = document.querySelector(".navbar")
  
    if (menuToggle) {
      menuToggle.addEventListener("click", () => {
        navbar.classList.toggle("mobile-active")
      })
    }
  })
  
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
  
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })
  
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