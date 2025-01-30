import {mailNotifierManager} from "../managers/mailNotifier-manager";
import {strict} from "node:assert";
export type mailDataType={
    email: string,
    html:string,
    auth:{
        user: string,
        pass: string,
    }
    from: string,
    subject: string,
}
export const mailNotifierAdapter = {
    sendEmailNotification:async (email: string,subject:string,html:string) => {
        const mailData:mailDataType={
            email,
            html,
            auth: {
                user: process.env.MAIL_USER||'user',
                pass: process.env.MAIL_PASS||'pass',
            },
            from: 'hrytsevivan@gmail.com',
            subject
        }
    const result= await  mailNotifierManager.sendEmailNotification(mailData)
return result
    }
}