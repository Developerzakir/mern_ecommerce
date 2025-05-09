
import { comparePass, hassPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const registerController  = async (req,res)=>{
    try{
        const {name,email,password,phone,address,answer} = req.body;

        //validation
        if(!name){
            return res.send({message:'name is required'});
        }
        if(!email){
            return res.send({message:'email is required'});
        }
        if(!password){
            return res.send({message:'password is required'});
        }
        if(!phone){
            return res.send({message:'phone is required'});
        }
        if(!address){
            return res.send({message:'address is required'});
        }
        if(!answer){
            return res.send({message:'answer is required'});
        }

        //check user
        const existUser = await userModel.findOne({email});

        if(existUser){
            return res.status(200).send({
                success:false,
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
            password:hassedPassword,
            answer
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
                address: user.address,
                role:user.role
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


//forgot password controller
export const forgotPasswordController = async (req,res)=>{
    try{
        const {email,answer,newPassword} = req.body;

        if(!email){
            res.status(400).send({message:'Email is required'})
        }
        if(!answer){
            res.status(400).send({message:'answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message:'new password is required'})
        }

        //check
        const user = await userModel.findOne({email,answer});

        //validation
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'wrong email or question'
            })
        }

        const hashed = await hassPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success:true,
            message:'Password Reset Successfully'
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'something went wrong',
            error
        })
    }
}


//test controller
export const testControlller = (req,res)=>{
 try{
    res.send('protected route');
 }catch(error){
  console.log(error);
  res.send({error});
 }
};



//update prfole
export const updateProfileController = async (req, res) => {
  try {
    const { name, email, password, address, phone } = req.body;
    const user = await userModel.findById(req.user._id);
    //password
    if (password && password.length < 6) {
      return res.json({ error: "Passsword is required and 6 character long" });
    }
    const hashedPassword = password ? await hassPassword(password) : undefined;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        password: hashedPassword || user.password,
        phone: phone || user.phone,
        address: address || user.address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated SUccessfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error WHile Update profile",
      error,
    });
  }
};

