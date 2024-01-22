const morgan = require('morgan');
const fs = require('fs');

class LoggerService {
    constructor(filePath) {
        this.filePath = filePath;
        this.init();
    }

    init() {
        const accessLogStream = fs.createWriteStream(this.filePath, { flags: 'a' });
        this.logger = morgan('combined', { stream: accessLogStream });
    }

    getLogger() {
        return this.logger;
    }
}

module.exports = new LoggerService();