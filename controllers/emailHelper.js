import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rangachimalgi123@gmail.com',
        pass: 'zzza ezom lkee tdey'
    }
});

export const sendEmail = async (to, subject, text, attachments) => {
    const mailOptions = {
        from: 'rangachimalgi123@gmail.com',
        to,
        subject,
        text,
        attachments
    };

    return transporter.sendMail(mailOptions);
};
