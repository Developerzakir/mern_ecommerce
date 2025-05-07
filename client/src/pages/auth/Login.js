import React, {useState} from 'react'
import Layouts from '../../components/Layout/Layouts'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import { useAuth } from '../../context/auth';

const Login = () => {

        const  [email,setEmail] = useState("");
        const  [password,setPassword] = useState("");
        const  [auth, setAuth] = useAuth();
        
        const navigate  = useNavigate();
        const location = useLocation();


            //form handle submit function
            const handleSubmit = async(e)=>{
                e.preventDefault();
                console.log(email,password);
                
                try{
                    const res = await axios.post("/api/vi/auth/login",{
                       email,password
                    });

                    if(res.data.success){
                        toast.success(res.data.message);
                        setAuth({
                            ...auth,
                            user:res.data.user,
                            token:res.data.token,
                        });
                        localStorage.setItem("auth",JSON.stringify(res.data));
                        navigate(location.state || "/");
                    }else{
                        toast.error(res.data.message);
                    }

                }catch(error){
                    console.log(error);
                    toast.error('Something went wrong');
                }
            }

  return (
    <Layouts title={'Login  Page'}>
    <div className='register'>
        <h1>Login Page</h1>

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
               value={password} 
               onChange={(e)=>setPassword(e.target.value)}
               type="password" 
               className="form-control" 
               id="password" 
               placeholder='Enter Your Password' 
               required />
            </div>
           
         
           
           <div className='mb-3'>
           <button type="submit" className="btn btn-primary" onClick={()=>{navigate('/forgot-password')}} >
                Forget Password
            </button>
           </div>
            <button type="submit" className="btn btn-primary">Login</button>
        </form>

    </div>
</Layouts>
  )
}

export default Login