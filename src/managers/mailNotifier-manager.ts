import nodemailer, {SentMessageInfo} from 'nodemailer';
import {mailDataType} from "../adapters/mailNotifier-adapter";

export const mailNotifierManager = {
    sendEmailNotification: async (mailData: mailDataType) => {
        const transporter = nodemailer.createTransport({
            service: 'SMTP',
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: mailData.auth
        });
        const mailOptions = {
            from: mailData.from,
            to: mailData.email,
            subject: mailData.subject,
            html: mailData.html,
        };
        try {
         await   transporter.sendMail(mailOptions)
            return true
        } catch (error) {
            return false
        }

    }
}