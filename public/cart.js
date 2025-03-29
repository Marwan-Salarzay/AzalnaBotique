var items = []
const localList = localStorage.getItem("mylist")

if (localList) {
  JSON.parse(localList).forEach((element) => {
    items.push(element)
  })
}
console.log(items)
const salesTax = 800
const FBRtax = 0
var totalPrice = 0

function proceedToCheckout() {
  if (items.length === 0) {
    alert(`shop something before proceeding to checkout`)
  } else {
    window.location.href = "checkout.html"
  }
}
function appendItems() {
  const bagItemList = document.querySelector(".bagContent")
  bagItemList.innerHTML = ``

  if (items.length === 0) {
    bagItemList.innerHTML = `<h1>Your Bag Is Empty! Shop Some Items To Proceed!</h1>
    <br>
    <h1>Happy Shopping :)</h1>`
  } else {
    items.forEach((item, index) => {
      bagItemList.innerHTML += `
        <div class="bagItemCard relative flexCenter shadow">
            <div class="imgDetailsContainer flexBetween">
                <div class="itemImageContainer">
                    <img src="${item.imgSrc}" alt="" height="200px" width="150px" />
                </div>
                <div class="itemAttributes">
                    <div class="itemName">
                        <h5 style="font-weight: bold">${item.imgName}</h5>
                    </div>
                    <br />
                    <div class="itemPrice"><h4>PKR ${item.allItemsPrice}</h4></div>
                    <br />
                    <div class="itemSize"><p>Size:<b> ${item.size}</b></p></div>
                    <br />
                </div>
            </div>
            <div class="itemQuantity relative flexCenter">
                <div class="itemCounterContainer">
                    <div class="counter flexCenter">
                        <div class="itemPcs"><h5>PCS ${item.quantity}</h5></div>
                    </div>
                </div>
                <button class="delete" onclick="deleteItem(${index})"><img src="/svg/delete.svg" alt="" /></button>
            </div>
        </div>
      `
    })
  }
  appendOrder()
  // updateCartBadge()
}

function appendOrder() {
  const orderSummary = document.querySelector(".orderContainer")
  orderSummary.innerHTML = ``

  if (items.length === 0) {
    orderSummary.innerHTML = `<div class="order-summary">
          <h2>Order Summary</h2>
          <br />
          <div class="order-item">
            <span>Price incl. tax</span>
            <span>PKR 0</span>
          </div>
          <div class="order-item">
            <span>Sales Tax</span>
            <span>PKR 0</span>
          </div>
          <div class="order-item">
            <span>FBR service charges</span>
            <span>PKR 0</span>
          </div>
          <div class="totalLine"></div>
          <div class="order-item total">
            <span>Total</span>
            <span>PKR 0</span>
          </div>
        </div>
        <div class="order-summary voucher">
          <h2>Enter Voucher Code:</h2>
          <div class="voucherInput">
            <input type="text" name="voucherCode" id="voucherCode">
          </div>
        </div>
        <div class="proceedToCheckout flexCenter"><button onclick="proceedToCheckout()" id="Proceed">Proceed To Checkout</button></div>`
  } else {
    totalPrice = 0
    items.forEach((item) => {
      totalPrice += Number.parseInt(item.allItemsPrice*item.quantity)
    })
    orderSummary.innerHTML = `<div class="order-summary">
          <h2>Order Summary</h2>
          <br />
          <div class="order-item">
            <span>Price incl. tax</span>
            <span><b>PKR ${totalPrice}</b></span>
          </div>
          <div class="order-item">
            <span>Sales Tax</span>
            <span><b>PKR ${salesTax}</b></span>
          </div>
          <div class="order-item">
            <span>FBR service charges</span>
            <span><b>PKR ${FBRtax}</b></span>
          </div>
          <div class="totalLine"></div>
          <div class="order-item total">
            <span>Total</span>
            <span><b>PKR ${totalPrice + salesTax + FBRtax}</b></span>
          </div>
        </div>
        <div class="order-summary voucher">
          <h2>Enter Voucher Code:</h2>
          <div class="voucherInput">
            <input type="text" name="voucherCode" id="voucherCode">
          </div>
        </div>
        <div class="proceedToCheckout flexCenter"><button onclick="proceedToCheckout()" id="Proceed">Proceed To Checkout</button></div>`
  }
}

function increment(x) {
  const quantityInput = document.getElementById(x)
  let quantity = Number.parseInt(quantityInput.value)
  quantity++
  quantityInput.value = quantity
}

function decrement(x) {
  const quantityInput = document.getElementById(x)
  let quantity = Number.parseInt(quantityInput.value)
  if (quantity > 1) {
    quantity--
    quantityInput.value = quantity
  }
}

function deleteItem(index) {
  items.splice(index, 1);
  localStorage.setItem('mylist', JSON.stringify(items));
  console.log(localStorage.getItem('mylist'));
  items.forEach((item, newIndex) => {
    item.index = newIndex;
  });

  appendItems();
}
document.addEventListener("DOMContentLoaded", appendItems)


// function updateCartBadge() {
//   const cartBadge = document.getElementById("cart-badge")
//   const localList = localStorage.getItem("mylist")

//   if (localList) {
//     const itms = JSON.parse(localList)
//     cartBadge.textContent = itms.length
//     cartBadge.style.display = itms.length > 0 ? "flex" : "none"
//   } else {
//     cartBadge.style.display = "none"
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  // updateCartBadge()

  window.addEventListener("storage", (e) => {
    if (e.key === "mylist") {
      updateCartBadge()
    }
  })
})

const originalAppendItems = appendItems
appendItems = () => {
  originalAppendItems()
  // updateCartBadge()
}

const originalDeleteItem = deleteItem
deleteItem = (index) => {
  originalDeleteItem(index)
  // updateCartBadge()
}