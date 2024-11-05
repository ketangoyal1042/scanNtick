import bcrypt from 'bcrypt';

export const hashedPassword = async (password) => {
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    return hashedpassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword);
}