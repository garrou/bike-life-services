const nodemailer = require('nodemailer');
const fs = require("fs");

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
            attachments: [
                {
                    filename: 'logo.png',
                    content: fs.createReadStream('./assets/logo.png'),
                    cid: "bikeslifelogo"
                }
            ],
            html: `
<h1>Bienvenue chez Bike's life.</h1>

<p>Un service pour suivre l'usure de votre vélo et de ses composants</p>
<p>Cliquer sur le lien pour finaliser la création de votre compte :</p>
<a href="${url}">Confirmer</a>

<br />
<img src="cid:bikeslifelogo" width="200" height="200" alt="Logo" />
`
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

