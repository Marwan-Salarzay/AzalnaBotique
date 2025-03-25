
const finalBag = () => {
  const qty = Number.parseInt(document.querySelector(".quantity-input").value)
  const activeSizeButton = document.querySelector(".size-options .size-btn.active").innerText
  const imageSrc = document.querySelector("#featured-image").src
  const imageName = document.querySelector(".product-title").innerText
  const price = document.querySelector(".price").innerText

  const existingItems = JSON.parse(localStorage.getItem("mylist")) || []
  let urlParams = new URLSearchParams(window.location.search)
  let itemId = urlParams.get("itemId")
  
  // Check if the item with the same ID and size already exists in the cart
  const existingItemIndex = existingItems.findIndex(
    item => item.uId === itemId && item.size === activeSizeButton
  )
  
  if (existingItemIndex !== -1) {
    existingItems[existingItemIndex].quantity += qty
  } else {
    const newItem = {
      uId: itemId,
      imgSrc: imageSrc,
      imgName: imageName,
      allItemsPrice: price,
      size: activeSizeButton,
      quantity: qty,
      index: existingItems.length
    }
    existingItems.push(newItem)
  }

  console.log(existingItems)
  localStorage.setItem("mylist", JSON.stringify(existingItems))
}

document.addEventListener("DOMContentLoaded", async () => {
  let urlParams = new URLSearchParams(window.location.search)
  let itemId = urlParams.get("itemId")

  if (itemId) {
    try {
      const response = await fetch(`http://localhost:3000/api/allProducts/${itemId}`)
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Failed to fetch product")
      }
      const product = await response.json()

      document.querySelector(".product-title").innerText = product.name
      document.querySelector(".product-price .price").innerText = `${product.price}`
      document.querySelector("#featured-image").src = product.image
      console.log(product.name, product.image, product.price)

      document.querySelectorAll(".thumbnail").forEach((thumb) => {
        thumb.setAttribute("data-img", product.image)
        thumb.querySelector("img").src = product.image
      })
    } catch (error) {
      console.error("Error fetching product details:", error)
      document.querySelector(".product-info").innerHTML =
        `<div class="error-message">Product not found or error loading details</div>`
    }
  }
})

document.querySelectorAll(".thumbnail").forEach((thumb) => {
  thumb.addEventListener("click", function () {
    
    document.querySelectorAll(".thumbnail").forEach((t) => t.classList.remove("active"))

    this.classList.add("active")

    document.getElementById("featured-image").src = this.getAttribute("data-img")

    const mainImg = document.getElementById("featured-image")
    mainImg.classList.add("image-transition")
    setTimeout(() => {
      mainImg.classList.remove("image-transition")
    }, 500)
  })
})

const quantityInput = document.querySelector(".quantity-input")

document.querySelector(".minus").addEventListener("click", () => {
  if (quantityInput.value > 1) {
    quantityInput.value = Number.parseInt(quantityInput.value) - 1
  }
})

document.querySelector(".plus").addEventListener("click", () => {
  quantityInput.value = Number.parseInt(quantityInput.value) + 1
})

document.querySelectorAll(".size-btn").forEach((btn) => {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".size-btn").forEach((b) => b.classList.remove("active"))
    this.classList.add("active")
  })
})


document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", function () {
    const item = this.parentElement
    const isActive = item.classList.contains("active")


    document.querySelectorAll(".accordion-item").forEach((item) => {
      item.classList.remove("active")
      item.querySelector(".accordion-icon").textContent = "+"
    })

    if (!isActive) {
      item.classList.add("active")
      this.querySelector(".accordion-icon").textContent = "-"
    }
  })
})

document.querySelector(".add-to-bag").addEventListener("click", function () {

  this.classList.add("clicked")
  setTimeout(() => {
    this.classList.remove("clicked")
    this.textContent = "ADDED TO BAG"
    showPopup()
    setTimeout(() => {
      this.textContent = "ADD TO BAG"
    }, 1000)
  }, 300)
})


const popupOverlay = document.getElementById('popupOverlay');
        const closePopup = document.getElementById('closePopup');
        const backToShoppingBtn = document.getElementById('backToShoppingBtn');
        const viewBagBtn = document.getElementById('viewBagBtn');

        function showPopup() {
            popupOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function hidePopup() {
            popupOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
        function backToShop() {
          popupOverlay.classList.remove('active');
          document.body.style.overflow = '';
          window.location.href = "allProducts.html"
      }
        closePopup.addEventListener('click', hidePopup);
        backToShoppingBtn.addEventListener('click', backToShop);
        
        viewBagBtn.addEventListener('click', () => {
            hidePopup();
            window.location.href = 'cart.html';
        });
        popupOverlay.addEventListener('click', (e) => {
            if (e.target === popupOverlay) {
                hidePopup();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && popupOverlay.classList.contains('active')) {
                hidePopup();
            }
        });



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