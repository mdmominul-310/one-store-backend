import config from "../config";
import axios from "axios";
import nodemailer from 'nodemailer'


class SmsEmailTransporter {
    private mailconfig: {
        host: string,
        port: number,
        secure: boolean,
        auth: {
            user: string,
            pass: string
        }
    };
    private smsConfig: {
        api: string,
        user: string,
        password: string,
        senderId: string,
        type: string
    };
    constructor() {
        this.mailconfig = {
            host: config.aws_email_host as string,
            port: 465,
            secure: true,
            auth: {
                user: config.aws_email_user as string,
                pass: config.aws_email_pass as string
            }
        };
        this.smsConfig = {
            api: config.sms_api as string,
            user: config.sms_api_user as string,
            password: config.sms_api_password as string,
            senderId: config.sms_api_sender_id as string,
            type: config.sms_api_type as string
        };
    }

    async sendSms(to: string, message: string) {
        // Create URL-encoded parameters
        const params = new URLSearchParams({
            Username: this.smsConfig.user,
            Password: this.smsConfig.password,
            From: this.smsConfig.senderId,
            To: "88" + to as string,
            Message: message,
        });

        const fullUrl = `${config.sms_api}?${params.toString()}`;
        try {
            const response = await axios.get(fullUrl);

            return response;
        } catch (error) {

        }
    }

    async sendEmail(data: { to: string, subject: string, message: string }) {
        try {
            // node mailer transporter configure with aws ses smtp service
            const transporter = nodemailer.createTransport({
                host: config.aws_email_host,
                port: 465,
                secure: true,
                auth: {
                    user: config.aws_email_user,
                    pass: config.aws_email_pass,
                },
            })
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '<noreplay@captake.com>', // sender address
                to: data?.to, // list of receivers
                subject: data?.subject, // Subject line
                text: data?.message, // plain text body
                html: `${data.message}`, // html body
            })

            return info.messageId
        } catch (err) {
            return 'failed'
        }
    }
}

const smsEmailTransporter = new SmsEmailTransporter();
export default smsEmailTransporter;
