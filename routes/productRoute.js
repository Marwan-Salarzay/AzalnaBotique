import e from "express";
const router = e.Router();
import { product } from "../models/products.js";

router.get('/allProducts', async (req, res) => {
    const productList = await product.find()
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  router.get('/summers', async (req, res) => {
    const productList = await product.find({productCategory:`summers`})
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  router.get('/winters', async (req, res) => {
    const productList = await product.find({productCategory:`winters`})
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  router.get('/partyWear', async (req, res) => {
    const productList = await product.find({productCategory:`partywear`})
    res.json(productList)
  
    if(!productList){
      res.status(500).json({success:false})
    }

  });
  
export default router