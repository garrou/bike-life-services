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
     * @param {String} to
     * @param {String} url
     */
    sendAskReset = (to, url) => {
        this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: to,
            subject: 'Demande de réinitialisation de votre mot de passe',
            attachments: [
                {
                    filename: 'logo.png',
                    content: fs.createReadStream('./assets/logo.png'),
                    cid: "bikeslifelogo"
                }
            ],
            html: `
<h3>Bonjour,</h3>

<p>Une demande de réinitialisation de votre mot de passe a été faite.</p>
<p>Si vous n'êtes pas à l'origine de la demande, merci d'ignorer ce mail.</p>
<p>
    Pour réinitialiser votre mot de passe, cliquer <a href="${url}">ici</a>, 
    vous serez redirigé vers le site web et recevrez un second email avec un mot de passe.
</p>

<br />
<img src="cid:bikeslifelogo" width="200" height="200" alt="Logo" />`
        }, (err, info) => {
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
     * @param {String} password
     */
    sendNewPassword = (to, password) => {
        this.transporter.sendMail({
            from: process.env.EMAIL_FROM,
            to: to,
            subject: 'Nouveau mot de passe',
            attachments: [
                {
                    filename: 'logo.png',
                    content: fs.createReadStream('./assets/logo.png'),
                    cid: "bikeslifelogo"
                }
            ],
            html: `
<p>Bonjour,</p>

<p>Voici le nouveau mot de passe.</p>
<p>${password}</p>

<br />
<p>Vous pouvez le changer dans Profil -> Modifier le mot de passe</p>

<br />
<img src="cid:bikeslifelogo" width="200" height="200" alt="Logo" />`
        }, (err, info) => {
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

<p>Un service pour suivre l'usure de votre vélo et de ses composants.</p>
<p>Cliquer sur le lien pour finaliser la création de votre compte, vous serez redirigé vers le site web :</p>
<a href="${url}">Confirmer</a>

<br />
<img src="cid:bikeslifelogo" width="200" height="200" alt="Logo" />`
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

