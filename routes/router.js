import express  from "express";
import { getBill, signup } from "../controllers/controller.js";
const router = express.Router();


router.get('/', (req, res, next)=>{
    res.status(200).send("The is backend for the nodemailer tester.")

})

router.post('/user/signup', signup)

router.post('/product/bill', getBill); 

export default router;