import e from "express";
import { checkout } from "../models/checkouts.js";
import sendOrderEmail from "../public/sendmail.js";

const router = e.Router();

router.post("/checkout", async (req, res) => {
    try {
       
        const { firstName, lastName, email, phone, address, city, state, zip,paymentMethod, country,productId,imgName,imgSrc,allItemsPrice,quantity,size } = req.body;
        if (!firstName || !lastName || !email || !phone || !address || !city || !state || !zip || !paymentMethod || !country|| !productId|| !imgName|| !imgSrc|| !allItemsPrice|| !quantity|| !size) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        const shippingData = new checkout({
            firstName:firstName,
            lastName:lastName,
            email:email,
            phone:phone,
            address:address,
            city:city,
            state:state,
            zip:zip,
            paymentMethod:paymentMethod,
            country:country,
            productId:productId,
            imgName:imgName,
            imgSrc:imgSrc,
            allItemsPrice:allItemsPrice,
            quantity:quantity,
            size:size

        });

        const savedShipping = await shippingData.save();

        res.status(201).json({ success: true, data: savedShipping });

    } catch (error) {
        console.error("Error saving shipping data:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});


router.post("/process-order", async (req, res) => {
    try {
      const { orderData } = req.body
  
      if (!orderData || !orderData.formData || !orderData.items || !orderData.formData.email) {
        return res.status(400).json({
          success: false,
          message: "Invalid order data. Please provide complete order information.",
        })
      }
      const emailSent = await sendOrderEmail(orderData.formData.email, orderData)
      res.status(201).json({
        success: true,
        message: "Order processed successfully",
        emailStatus: emailSent ? "Email sent successfully" : "Failed to send email",
      })

    }
     catch (error) {
      console.error("Error processing order:", error)
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      })
    }
  })

export default router;