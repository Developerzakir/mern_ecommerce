import React, {useState} from 'react'
import Layouts from '../../components/Layout/Layouts'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';

const ForgotPassword = () => {

     const  [email,setEmail] = useState("");
            const  [newPassword,setNewPassword] = useState("");
            const  [answer,setAnswer] = useState("");
            
            const navigate  = useNavigate();
          
    
    
                //form handle submit function
                const handleSubmit = async(e)=>{
                    e.preventDefault();
                    
                    
                    try{
                        const res = await axios.post("/api/vi/auth/forgot-password",{
                           email,newPassword,answer
                        });
    
                        if(res.data.success){
                            toast.success(res.data.message);
                            navigate("/login");
                        }else{
                            toast.error(res.data.message);
                        }
    
                    }catch(error){
                        console.log(error);
                        toast.error('Something went wrong');
                    }
                }

  return (
    <Layouts title={"Forgot Password"}>
        <div className='form-container'>
        <h1>Reset Password</h1>

        <form onSubmit={handleSubmit}>
          
            <div className="mb-3">
               <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="text" 
                className="form-control" 
                id="email" 
                placeholder='Enter Your Email'
                required />
            </div>

            <div className="mb-3">
               <input
                value={answer}
                onChange={(e)=>setAnswer(e.target.value)}
                type="text" 
                className="form-control" 
                id="email" 
                placeholder='Enter Your Secret Answer'
                required />
            </div>

            <div className="mb-3">
               <input 
               value={newPassword} 
               onChange={(e)=>setNewPassword(e.target.value)}
               type="password" 
               className="form-control" 
               id="password" 
               placeholder='Enter Your New Password' 
               required />
            </div>
           
         
         
            <button type="submit" className="btn btn-primary">Reset</button>
        </form>

    </div>
    </Layouts>
  )
}

export default ForgotPassword