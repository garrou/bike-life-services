const nodemailer = require('nodemailer');

class Mailer {

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }
    
    /**
     * @param {String} from 
     * @param {String} to 
     * @param {String} subject 
     * @param {String} text 
     */
    sendEmail = (from, to, subject, text) => {
        this.transporter.sendMail({ from: from, to: to, subject: subject, text: text }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info.envelope);
                console.log(info.messageId);
            }
        });
    }

    /**
     * @param {String} to 
     * @param {String} url 
     */
    sendConfirmationEmail = (to, url) => {
        this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: to,
            subject: 'Confirmer votre email',
            html: `Cliquer sur le lien pour finaliser la création de votre compte : <a href="${url}">Confirmer</a>`
        }, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info.envelope);
                console.log(info.messageId);
            }
        });
    }
}

module.exports = Mailer;

