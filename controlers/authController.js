
import { comparePass, hassPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const registerController  = async (req,res)=>{
    try{
        const {name,email,password,phone,address} = req.body;

        //validation
        if(!name){
            return res.send({error:'name is required'});
        }
        if(!email){
            return res.send({error:'email is required'});
        }
        if(!password){
            return res.send({error:'password is required'});
        }
        if(!phone){
            return res.send({error:'phone is required'});
        }
        if(!address){
            return res.send({error:'address is required'});
        }

        //check user
        const existUser = await userModel.findOne({email});

        if(existUser){
            return res.status(200).send({
                success:true,
                message:'Already registered please login'
            })
        }

        //register user
        const hassedPassword = await hassPassword(password);

        //save
        const user = await new userModel({
            name,
            email,
            phone,
            address,
            password:hassedPassword
        }).save();

        res.status(201).send({
            success:true,
            message:'user register successfuly',
            user
        })
         

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in registration',
            error
        })
    }
};

//Post login
export const loginController = async (req,res)=>{
    try{
        const {email,password} = req.body;

        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'invalid in login'
            });
        }

        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email is not registered'
            })
        }
        const match = await comparePass(password, user.password);
        if(!match){
            return res.status(200).send({
                success:false,
                message:'invalid password'
            })
        }

        //token create
        const token = await JWT.sign({_id:user._id}, process.env.JWT_SECRET, {expiresIn:"7d"});
        res.status(200).send({
            success:true,
            message:'login successfully',
            user:{
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            },
            token,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in login',
            error
        });
    }
};


//test controller
export const testControlller = (req,res)=>{
 try{
    res.send('protected route');
 }catch(error){
  console.log(error);
  res.send({error});
 }
};

