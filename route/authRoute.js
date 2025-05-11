import express from 'express';
import {
     loginController,
     registerController,
     testControlller,
     forgotPasswordController,
     updateProfileController,
     getOrdersController,
     getAllOrdersController,
     orderStatusController,
    } from '../controlers/authController.js';

import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';

//router object 
const router = express.Router();

//routing
router.post('/register', registerController);
router.post('/login', loginController);

//forgot password
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get('/test', requireSignin, isAdmin, testControlller);

//user auth private route 
router.get('/user-auth',requireSignin, (req,res)=>{
 res.status(200).send({ok:true});
});

//admin auth private route 
router.get('/admin-auth',requireSignin, isAdmin, (req,res)=>{
    res.status(200).send({ok:true});
});


//update profile
router.put("/profile", requireSignin, updateProfileController);

//orders
router.get("/orders", requireSignin, getOrdersController);

//all orders
router.get("/all-orders", requireSignin, isAdmin, getAllOrdersController);

// order status update
router.put(
  "/order-status/:orderId",
  requireSignin,
  isAdmin,
  orderStatusController
);

export default router