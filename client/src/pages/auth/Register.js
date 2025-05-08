import React, {useState} from 'react'
import Layouts from '../../components/Layout/Layouts'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const  [name,setName] = useState("");
    const  [email,setEmail] = useState("");
    const  [password,setPassword] = useState("");
    const  [phone,setPhone] = useState("");
    const  [address,setAddress] = useState("");
    const  [answer,setAnswer] = useState("");
    const navigate  = useNavigate();

    //form handle submit function
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(name,email,password,phone,address,answer);
        

        try{
            const res = await axios.post("/api/v1/auth/register",{
                name,email,password,phone,address,answer
            });

            if(res.data.success){
                toast.success(res.data.message);
                navigate('/login');
            }else{
                toast.error(res.data.message);
            }

        }catch(error){
            console.log(error);
            toast.error('Something went wrong');
        }
    }


  return (
    <Layouts title={'Register Page'}>
        <div className='register'>
            <h1>Register Page</h1>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                      value={name}
                      onChange={(e)=>setName(e.target.value)}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder='Enter Your Name'
                      required
                      />
                </div>
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
                <div className="mb-3">
                   <input 
                   value={phone} 
                   onChange={(e)=>setPhone(e.target.value)}
                   type="text" 
                   className="form-control" 
                   id="phone" 
                   placeholder='Enter Your Phone' 
                   required />
                </div>
                <div className="mb-3">
                   <input 
                   value={address} 
                   onChange={(e)=>setAddress(e.target.value)}
                   type="text" 
                   className="form-control" 
                   id="address" 
                   placeholder='Enter Your Address' 
                   required />
                </div>
                <div className="mb-3">
                   <input 
                   value={answer} 
                   onChange={(e)=>setAnswer(e.target.value)}
                   type="text" 
                   className="form-control" 
                   id="address" 
                   placeholder='What is your favorite pet?' 
                   required />
                </div>
               
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    </Layouts>
  )
}

export default Register