import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

const sendOrderEmail = async (customerEmail, orderData) => {
  const orderSummaryHtml = generateOrderSummaryHtml(orderData)

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: customerEmail,
    subject: "Order Confirmation - Your Order has been Placed!",
    html: orderSummaryHtml,
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log("Email sent successfully!")
    return true
  } catch (error) {
    console.error("Error sending email:", error)
    return false
  }
}

function generateOrderSummaryHtml(orderData) {
  var totalItems = ``

  const deliveryDate = new Date()
  deliveryDate.setDate(deliveryDate.getDate() + 7 + Math.floor(Math.random() * 4))
  const estimatedDelivery = deliveryDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  orderData.items.forEach((item, index) => {
    const imageHtml = item.imgSrc
      ? `<img src="${item.imgSrc}" alt="${item.imgName || "Product image"}" style="width: 100%; height: 100%; object-fit: cover;">`
      : `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 30px; height: 30px; color: #94a3b8;">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
            </svg>`
    const itemElement = `
        <div style="display: flex; gap: 20px; padding: 15px; border-radius: 12px; background-color: #f8fafc; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05); transition: transform 0.2s ease, box-shadow 0.2s ease;">
          <div style="width: 80px; height: 80px; border-radius: 8px; background-color: #e2e8f0; overflow: hidden; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
              ${imageHtml}
          </div>
          <div style="flex-grow: 1; display: flex; flex-direction: column; justify-content: center;">
              <div style="font-weight: 600; font-size: 1.1rem; margin-bottom: 5px; color: #1e293b;">${
                item.imgName || `Product ${index + 1}`
              }</div>
              <div style="display: flex; justify-content: space-between; gap: 15px; font-size: 0.9rem; color: #64748b; flex-wrap: wrap;">
                  <span>Quantity: ${item.quantity}</span>
                  ${item.size ? `<span>Size: ${item.size}</span>` : ""}
                  <span>Price: ${item.allItemsPrice}</span>
              </div>
          </div>
          <div style="font-weight: 700; font-size: 1.1rem; color: #1e293b; margin-left: auto; align-self: center;">${
            item.allItemsPrice * item.quantity
          }</div>
        </div>
    `
    totalItems += itemElement
  })

  return `<!DOCTYPE html>
  <html lang="en">
  <head>
     <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap">
    <style>
      @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap");
    </style>
  </head>
  <body style="background-color: #f5f7fa; color: #333; line-height: 1.6; min-height: 100vh; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
    <div style="position: relative; width: 100%; max-width: 800px; margin: 0 auto; background-color: white; border-radius: 16px; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); overflow: hidden; transform-style: preserve-3d; transition: box-shadow 0.3s ease, transform 0.3s ease;">
        <div style="background: linear-gradient(135deg, #4776e6, #8e54e9); color: white; padding: 20px 30px; border-radius: 16px 16px 0 0; display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 10;">
            <div style="display: flex; align-items: center; gap: 15px;">
                <div style="width: 40px; height: 40px; background-color: rgba(255, 255, 255, 0.2); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                </div>
                <h2 style="font-size: 1.5rem; font-weight: 700; margin: 0; color: white;">Order Confirmation</h2>
            </div>
        </div>
            
        <div style="padding: 30px;">
            <div style="text-align: center; margin-bottom: 30px; animation: fadeInUp 0.6s ease-out;">
                <div style="width: 80px; height: 80px; background: linear-gradient(135deg, #4776e6, #8e54e9); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px; color: white; position: relative; overflow: hidden;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="color: white;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <div style="position: absolute; width: 100%; height: 100%; background: linear-gradient(90deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0)); transform: translateX(-100%);"></div>
                </div>
                <h3 style="font-size: 1.8rem; font-weight: 700; margin-bottom: 10px; color: #333;">Thank You For Your Order!</h3>
                <p style="color: #666; font-size: 1.1rem; margin-bottom: 30px;">Your order has been confirmed and will be shipped soon.</p>
            </div>
                
            <div style="display: grid; gap: 30px; animation: fadeInUp 0.8s ease-out;">
                <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);">
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <span style="font-size: 0.9rem; color: #64748b; font-weight: 500;">Order Number: </span>
                        <span style="font-size: 1.1rem; font-weight: 600; color: #1e293b; font-family: monospace; letter-spacing: 0.5px;" id="orderNumber"> ${orderData.orderId}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <span style="font-size: 0.9rem; color: #64748b; font-weight: 500;">Order Date: </span>
                        <span style="font-size: 1.1rem; font-weight: 600; color: #1e293b;" id="orderDate"> ${orderData.orderDate}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <span style="font-size: 0.9rem; color: #64748b; font-weight: 500;">Payment Method: </span>
                        <span style="font-size: 1.1rem; font-weight: 600; color: #1e293b;" id="paymentMethodDisplay"> ${orderData.formData.paymentMethod}</span>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 5px;">
                        <span style="font-size: 0.9rem; color: #64748b; font-weight: 500;">Estimated Delivery:  </span>
                        <span style="font-size: 1.1rem; font-weight: 600; color: #1e293b;" id="estimatedDelivery"> ${estimatedDelivery}</span>
                    </div>
                </div>
                    
                <div style="margin-top: 10px;">
                    <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 15px; color: #333; position: relative; display: inline-block;">Items Ordered
                      <span style="content: ''; position: absolute; width: 30%; height: 3px; bottom: -5px; left: 0; background: linear-gradient(90deg, #4776e6, #8e54e9); border-radius: 3px;"></span>
                    </h4>
                    <div style="display: grid; gap: 15px;" id="orderedItems">
                        ${totalItems}
                    </div>
                </div>
                    
                <div style="margin-top: 10px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td width="48%" valign="top">
                                <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 15px; color: #333; position: relative; display: inline-block;">Details / Shipping Address
                                  <span style="content: ''; position: absolute; width: 30%; height: 3px; bottom: -5px; left: 0; background: linear-gradient(90deg, #4776e6, #8e54e9); border-radius: 3px;"></span>
                                </h4>
                                <div style="background-color: #f8fafc; border-radius: 12px; padding: 20px; line-height: 1.6; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);" id="shippingAddressDisplay">
                                    <b>First Name :</b> ${orderData.formData.firstName} ${orderData.formData.lastName}<br>
                                    <b>Complete Address :</b> ${orderData.formData.address}<br>
                                    <b>Residence City :</b> ${orderData.formData.city}, ${orderData.formData.state} ${orderData.formData.zip}<br>
                                    <b>Country :</b> ${orderData.formData.country}<br>
                                    <b>Phone No :</b> ${orderData.formData.phone}
                                </div>
                            </td>
                            <td width="4%">&nbsp;</td>
                            <td width="48%" valign="top">
                                <h4 style="font-size: 1.2rem; font-weight: 600; margin-bottom: 15px; color: #333; position: relative; display: inline-block;">Order Summary
                                  <span style="content: ''; position: absolute; width: 30%; height: 3px; bottom: -5px; left: 0; background: linear-gradient(90deg, #4776e6, #8e54e9); border-radius: 3px;"></span>
                                </h4>
                                <div style="background-color: #f8fafc; border-radius: 12px; padding: 25px; display: grid; gap: 15px; box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08); border-left: 4px solid #8e54e9; animation: fadeInUp 0.8s ease-out;">
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; padding-bottom: 12px; border-bottom: 1px dashed #e2e8f0;">
                                        <span style="font-weight: 500; color: #475569;">Subtotal</span>
                                        <span style="font-weight: 600; color: #1e293b;" id="subtotalDisplay"> PKR ${orderData.subtotal}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; padding-bottom: 12px; border-bottom: 1px dashed #e2e8f0;">
                                        <span style="font-weight: 500; color: #475569;">FBR Tax</span>
                                        <span style="font-weight: 600; color: #1e293b;" id="fbrTaxDisplay"> PKR ${orderData.FBRtax}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-size: 1rem; padding-bottom: 12px; border-bottom: 1px solid #e2e8f0;">
                                        <span style="font-weight: 500; color: #475569;">Sales Tax</span>
                                        <span style="font-weight: 600; color: #1e293b;" id="salesTaxDisplay"> PKR ${orderData.salesTax}</span>
                                    </div>
                                    <div style="display: flex; justify-content: space-between; font-weight: 700; font-size: 1.25rem; color: #1e293b; margin-top: 5px; padding: 15px; background-color: rgba(142, 84, 233, 0.08); border-radius: 8px;">
                                        <span style="color: #334155;">Total</span>
                                        <span style="color: #8e54e9;" id="totalDisplay"> PKR ${orderData.total}</span>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <style>
      @keyframes fadeInUp {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    </style>
  </body>
</html>`
}

export default sendOrderEmail