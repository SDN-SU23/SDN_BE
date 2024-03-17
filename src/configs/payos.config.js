const PayOS = require('@payos/node')
const payos = new PayOS(global.config.payos.client_id, global.config.payos.api_key, global.config.payos.checksum_key);

module.exports = payos;