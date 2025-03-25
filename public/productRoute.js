import e from "express";
const router = e.Router();
import { product } from "../models/products.js";


router.use((req, res, next) => {
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("Referrer-Policy", "no-referrer");
  res.setHeader("Permissions-Policy", "geolocation=(self), microphone=()");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
});

router.get('/allProducts', async (req, res) => {
    const productList = await product.find()
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  router.get('/summers', async (req, res) => {
    const productList = await product.find()
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  router.get('/winters', async (req, res) => {
    const productList = await product.find()
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  router.get('/partyWear', async (req, res) => {
    const productList = await product.find()
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  
export default router