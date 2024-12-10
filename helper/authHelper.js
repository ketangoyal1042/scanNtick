import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

export const hashedPassword = async (password) => {
  try {
    const hashedpassword = await bcrypt.hash(password, 10);
    return hashedpassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
}

export const mailTransporter = () => {
  return nodemailer.createTransport({
    // host: "smtp.ethereal.email",
    // port: 587,
    service: 'Gmail',
    auth: {
      user: 'kkgoyals1032@gmail.com',
      pass: 'kalg kaux pxvf yplo',
    },
  })
}