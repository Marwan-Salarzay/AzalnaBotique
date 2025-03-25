
// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('shipping-form');
//     const inputs = form.querySelectorAll('input, select');
//     const progressBar = document.querySelector('.progress');
//     const submitBtn = document.querySelector('.submit-btn');


//     function updateProgress() {
//         const totalFields = inputs.length;
//         let filledFields = 0;

//         inputs.forEach(input => {
//             if (input.value.trim() !== '') {
//                 filledFields++;
//             }
//         });

//         const progress = (filledFields / totalFields) * 100;
//         progressBar.style.width = `${progress}%`;
//     }

//     inputs.forEach(input => {
//         input.addEventListener('focus', function () {
//             this.parentElement.classList.add('focused');
//         });

//         input.addEventListener('blur', function () {
//             if (this.value.trim() === '') {
//                 this.parentElement.classList.remove('focused');
//             }
//         });

//         input.addEventListener('input', updateProgress);

//         if (input.value.trim() !== '') {
//             input.parentElement.classList.add('focused');
//         }
//     });

//     form.addEventListener('submit', async function (e) {
//         e.preventDefault();
        
//         let tempItems = []
//         let imgName = ""
//         let imgSrc = ""
//         let allItemsPrice = 0
//         let quantity = ""
//         let size = ""
//         let produtUID = ""
//         let FBRtax = 10
//         let salestax = 800
    
//         let localList = localStorage.getItem("mylist")
//         if(localList){
//             JSON.parse(localList).forEach((element)=>{
//                 tempItems.push(element)
//             })
//             console.log(tempItems);
//         }
//         tempItems.forEach((e)=>{
//             produtUID += `__${e.uId}`
//             imgName += `__${e.imgName}`;
//             imgSrc += `__${e.imgSrc}`;
//             allItemsPrice += parseInt(e.allItemsPrice*e.quantity);
//             quantity += `__${e.quantity}`;
//             size += `__${e.size}`;
//         })
//         const formData = {
//             firstName: document.getElementById('first-name').value.trim(),
//             lastName: document.getElementById('last-name').value.trim(),
//             email: document.getElementById('email').value.trim(),
//             phone: document.getElementById('phone').value.trim(),
//             address: document.getElementById('address').value.trim(),
//             city: document.getElementById('city').value.trim(),
//             state: document.getElementById('state').value.trim(),
//             zip: document.getElementById('zip').value.trim(),
//             paymentMethod: document.getElementById('payment-method').value.trim(),
//             country: document.getElementById('country').value.trim(),
//             productId:produtUID,
//             imgName:imgName, 
//             imgSrc:imgSrc,
//             allItemsPrice:allItemsPrice+salestax+FBRtax ,
//             quantity:quantity,
//             size:size 
//         };
        

//         console.log("Collected Form Data:", formData); 
//         submitBtn.classList.add('loading');

//         try {
//             const response = await fetch('http://localhost:3000/api/checkout', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(formData),
//             });

//             if (!response.ok) {
//                 throw new Error('Failed to submit form');
//             }

//             const result = await response.json();
//             console.log("Server Response:", result);

//             submitBtn.classList.remove('loading');
//             submitBtn.classList.add('success');
//             submitBtn.querySelector('.btn-text').textContent = 'Order Placed!';
            
//             setTimeout(() => {
//                 form.reset();
//                 submitBtn.classList.remove('success');
//                 submitBtn.querySelector('.btn-text').textContent = 'Complete Order';
//                 progressBar.style.width = '0%';
//                 inputs.forEach(input => input.parentElement.classList.remove('focused'));
//                 showOrderSummary()
//                 localStorage.clear()
//                 showPopup()
//             }, 2000);

//         } catch (error) {
//             console.error("Error submitting form:", error);

//             alert("An error occurred while submitting the form. Please try again.");

//             submitBtn.classList.remove('loading');
//         }
//     });

//     updateProgress();
// });


// const overlay = document.getElementById('thankYouOverlay');
//     const continueBtn = document.getElementById('continueBtn');
    
//     function hidePopup() {
//         overlay.classList.remove('active');
//         window.location.href = "index.html"
//     }
//     function showPopup() {
//         overlay.classList.add('active');
//     }
    
//     continueBtn.addEventListener('click', hidePopup);

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('shipping-form');
    const inputs = form.querySelectorAll('input, select');
    const progressBar = document.querySelector('.progress');
    const submitBtn = document.querySelector('.submit-btn');


    function updateProgress() {
        const totalFields = inputs.length;
        let filledFields = 0;

        inputs.forEach(input => {
            if (input.value.trim() !== '') {
                filledFields++;
            }
        });

        const progress = (filledFields / totalFields) * 100;
        progressBar.style.width = `${progress}%`;
    }

    inputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.parentElement.classList.remove('focused');
            }
        });

        input.addEventListener('input', updateProgress);

        if (input.value.trim() !== '') {
            input.parentElement.classList.add('focused');
        }
    });

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        
        let tempItems = []
        let imgName = ""
        let imgSrc = ""
        let allItemsPrice = 0
        let quantity = ""
        let size = ""
        let produtUID = ""
        let FBRtax = 0
        let salestax = 800
    
        let localList = localStorage.getItem("mylist")
        if(localList){
            JSON.parse(localList).forEach((element)=>{
                tempItems.push(element)
            })
            console.log(tempItems);
        }
        tempItems.forEach((e)=>{
            produtUID += `__${e.uId}`
            imgName += `__${e.imgName}`;
            imgSrc += `__${e.imgSrc}`;
            allItemsPrice += parseInt(e.allItemsPrice*e.quantity);
            quantity += `__${e.quantity}`;
            size += `__${e.size}`;
        })
        const formData = {
            firstName: document.getElementById('first-name').value.trim(),
            lastName: document.getElementById('last-name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            address: document.getElementById('address').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value.trim(),
            zip: document.getElementById('zip').value.trim(),
            paymentMethod: document.getElementById('payment-method').value.trim(),
            country: document.getElementById('country').value.trim(),
            productId:produtUID,
            imgName:imgName, 
            imgSrc:imgSrc,
            allItemsPrice:allItemsPrice+salestax+FBRtax,
            quantity:quantity,
            size:size 
        };
        

        console.log("Collected Form Data:", formData); 
        submitBtn.classList.add('loading');

        try {
            const response = await fetch('http://localhost:3000/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await response.json();
            console.log("Server Response:", result);

            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            submitBtn.querySelector('.btn-text').textContent = 'Order Placed!';
            
            setTimeout(() => {
                form.reset();
                submitBtn.classList.remove('success');
                submitBtn.querySelector('.btn-text').textContent = 'Complete Order';
                progressBar.style.width = '0%';
                inputs.forEach(input => input.parentElement.classList.remove('focused'));
                localStorage.setItem('orderData', JSON.stringify({
                    items: tempItems,
                    formData: formData,
                    subtotal: allItemsPrice,
                    FBRtax: FBRtax,
                    salesTax: salestax,
                    total: allItemsPrice + FBRtax + salestax,
                    orderId: generateOrderId(),
                    orderDate: new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                    }),
                }));
                showOrderSummary();
            }, 2000);

        } catch (error) {
            console.error("Error submitting form:", error);

            alert("An error occurred while submitting the form. Please try again.");

            submitBtn.classList.remove('loading');
        }
    });

    updateProgress();
    
    // Order Summary Functionality
    const orderSummaryOverlay = document.getElementById('orderSummaryOverlay');
    const closeOrderSummaryBtn = document.getElementById('closeOrderSummary');
    const continueShoppingBtn = document.getElementById('continueShoppingBtn');
    const printReceiptBtn = document.getElementById('printReceiptBtn');
    const copyOrderNumberBtn = document.getElementById('copyOrderNumberBtn');
    
    function generateOrderId() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = 'ORD-';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }
    
    function formatCurrency(amount) {
        return 'PKR ' + parseFloat(amount).toFixed(2);
    }
    

    function showOrderSummary() {

        const orderDataString = localStorage.getItem('orderData');
        if (!orderDataString) return;
        
        const orderData = JSON.parse(orderDataString);
        
        document.getElementById('orderNumber').textContent = orderData.orderId;
        document.getElementById('orderDate').textContent = orderData.orderDate;
        document.getElementById('paymentMethodDisplay').textContent = orderData.formData.paymentMethod;
        
        const deliveryDate = new Date();
        deliveryDate.setDate(deliveryDate.getDate() + 7 + Math.floor(Math.random() * 4));
        const estimatedDelivery = deliveryDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
        document.getElementById('estimatedDelivery').textContent = estimatedDelivery;
        
        const addressDisplay = document.getElementById('shippingAddressDisplay');
        addressDisplay.innerHTML = `
            <b>First Name :</b> ${orderData.formData.firstName} ${orderData.formData.lastName}<br>
            <b>Complete Address :</b> ${orderData.formData.address}<br>
            <b>Residence City :</b> ${orderData.formData.city}, ${orderData.formData.state} ${orderData.formData.zip}<br>
            <b>Country :</b> ${orderData.formData.country}<br>
            <b>Phone No :</b> ${orderData.formData.phone}
        `;
        
        const itemsContainer = document.getElementById('orderedItems');
        itemsContainer.innerHTML = '';
        
        if (orderData.items.length === 0) {
            itemsContainer.innerHTML = '<p>No items in order</p>';
        } else {
            orderData.items.forEach((item, index) => {
                const itemElement = document.createElement('div');
                itemElement.className = 'item-card';
                itemElement.style.animationDelay = `${index * 0.1}s`;
                
                const imageHtml = item.imgSrc ? 
                    `<img src="${item.imgSrc}" alt="${item.imgName || 'Product image'}">` : 
                    `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>`;
                
                itemElement.innerHTML = `
                    <div class="item-image">
                        ${imageHtml}
                    </div>
                    <div class="item-details">
                        <div class="item-name">${item.imgName || `Product ${index + 1}`}</div>
                        <div class="item-meta">
                            <span>Quantity: ${item.quantity}</span>
                            ${item.size ? `<span>Size: ${item.size}</span>` : ''}
                            <span>Price: ${formatCurrency(item.allItemsPrice)}</span>
                        </div>
                    </div>
                    <div class="item-price">${formatCurrency(item.allItemsPrice * item.quantity)}</div>
                `;
                
                itemsContainer.appendChild(itemElement);
            });
        }
        
        document.getElementById('subtotalDisplay').textContent = formatCurrency(orderData.subtotal);
        document.getElementById('fbrTaxDisplay').textContent = formatCurrency(orderData.FBRtax);
        document.getElementById('salesTaxDisplay').textContent = formatCurrency(orderData.salesTax);
        document.getElementById('totalDisplay').textContent = formatCurrency(orderData.total);
        
        orderSummaryOverlay.classList.add('active');
    }
    
    function hideOrderSummary() {
        orderSummaryOverlay.classList.remove('active');
        localStorage.clear()
        showPopup()
    }
    
    function printReceipt() {
        window.print();
        
    }
    
    function copyOrderNumber() {
        const orderNumber = document.getElementById('orderNumber').textContent;
        navigator.clipboard.writeText(orderNumber)
            .then(() => {
                showToast('Order number copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    }
    

    function showToast(message) {

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            <p>${message}</p>
        `;
        
        document.body.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
    
    closeOrderSummaryBtn.addEventListener('click', hideOrderSummary);
    continueShoppingBtn.addEventListener('click', function() {
        hideOrderSummary();
        localStorage.clear()
        showPopup()
    });
    printReceiptBtn.addEventListener('click', printReceipt);
    copyOrderNumberBtn.addEventListener('click', copyOrderNumber);
});

const overlay = document.getElementById('thankYouOverlay');
const continueBtn = document.getElementById('continueBtn');

function hidePopup() {
    overlay.classList.remove('active');
    window.location.href = "index.html"
}

function showPopup() {
    overlay.classList.add('active');
}

continueBtn.addEventListener('click', hidePopup);