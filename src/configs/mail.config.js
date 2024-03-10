const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const oauth2Client = new google.auth.OAuth2(
    global.config.oauth.clientID,
    global.config.oauth.clientSecret,
    global.config.oauth.mailCallBackURL,
)

oauth2Client.setCredentials({ refresh_token: global.config.oauth.mailRefreshToken });

const sendMail = async (userMail, password) => {
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
            from: '"ArtWork 👻" Your password has change', // sender address
            to: `${userMail}`, // list of receivers
            subject: "Your password has change ✔", // Subject line
            text: `New pass: ${password}`, // plain text body
            html: `<b>New pass: ${password}<b>`, // html body
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