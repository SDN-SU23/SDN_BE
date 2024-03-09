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
        callbackURL: process.env.OAUTH_CB
    },
    payment: {
        vnp_TmnCode: process.env.VNP_TMNCODE,
        vnp_HashSecret: process.env.VNP_HASHSECRET,
        vnp_Url: process.env.VNP_URL,
        vnp_ReturnUrl: process.env.VNP_RETURNURL
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