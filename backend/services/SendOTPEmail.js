import nodemailer from 'nodemailer';

const SendOTPEmail = async (email, otp) => {
    try {
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_ADMIN, 
                pass: process.env.EMAIL_PASSWORD,  
            },
        });

        let mailOptions = {
            from: 'Admin of website.',
            to: email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}`,
        };

        await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully.');
    } catch (error) {
        console.error('Error sending OTP email: ', error);
        throw new Error('Failed to send OTP email.');
    }
};

export { SendOTPEmail };
