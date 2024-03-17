require('dotenv').config();

const dev = {
    app: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    },
    db: {
        host: process.env.DB_HOST,
        name: process.env.DB_NAME,
        pass: process.env.DB_PASSWORD
    },
    cloud: {
        name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRT

    },
    oauth: {
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        callbackURL: process.env.OAUTH_CB,
        mailCallBackURL: process.env.OAUTH_MAIL_CB,
        mailRefreshToken: process.env.OAUTH_MAIL_REFRESH_TOKEN,
    },
    payment: {
        vnp_TmnCode: process.env.vnp_TmnCode,
        vnp_HashSecret: process.env.vnp_HashSecret,
        vnp_Url: process.env.vnp_Url,
        vnp_ReturnUrl: process.env.vnp_ReturnUrl,
        vnp_ReturnUrlUpgrade: process.env.vnp_ReturnUrlUpgrade
    },
    supabase: {
        url: process.env.SUPABASE_URL,
        key: process.env.SUPABASE_KEY
    },
    payos: {
        client_id: process.env.PAYOS_CLIENT_ID,
        api_key: process.env.PAYOS_API_KEY,
        checksum_key: process.env.PAYOS_CHECKSUM_KEY
    }
}

const product = {
    app: {
        port: process.env.APP_PORT,
        host: process.env.APP_HOST
    },
    db: {
        host: process.env.DB_HOST_PRO,
        port: process.env.DB_PORT_PRO,
        name: process.env.DB_NAME_PRO
    }
}

const config = { dev, product };


module.exports = config[process.env.NODE_ENV || 'dev'];

// const config = s