import bcrypt from 'bcrypt'

export const hassPassword = async (password)=>{
 try{
    const saltRound = 10;
    const hashPassed = await bcrypt.hash(password,saltRound);
    return hashPassed;
 }catch(error){
    console.log(error);
 }
};

export const comparePass = async (password,hashPassed)=>{
 return bcrypt.compare(password,hashPassed);
}