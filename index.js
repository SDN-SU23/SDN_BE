const app = require('./src/app');
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    if (socket) {
        console.log('a user connected');
    } else {
        console.log('a user disconnected');
    }
})

app.listen(global.config.app.port, () => {
    // global.logger.info(`Server is running on ${process.env.NODE_ENV}`)
    // global.logger.info(`Server is running on port ${global.config.app.port}`);
    console.log(`Server is running on port ${global.config.app.port}`);
})