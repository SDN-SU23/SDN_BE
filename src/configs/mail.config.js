const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oauth2Client = new google.auth.OAuth2(
    global.config.oauth.clientID,
    global.config.oauth.clientSecret,
    global.config.oauth.mailCallBackURL,
)

oauth2Client.setCredentials({ refresh_token: global.config.oauth.mailRefreshToken });

const sendMail = async ({ userMail, subject, text, html }) => {
    try {
        const accessToken = await oauth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'baohc110902@gmail.com',
                clientId: global.config.oauth.clientID,
                clientSecret: global.config.oauth.clientSecret,
                refreshToken: global.config.oauth.mailRefreshToken,
                accessToken: accessToken
            }
        });

        const info = await transporter.sendMail({
            from: `"ArtWork 👻" ${subject}`, // sender address
            to: `${userMail}`, // list of receivers
            subject: `${subject}`, // Subject line
            text: `${text}`, // plain text body
            html: `${html}`, // html body
        });

        return info;

    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    sendMail
};