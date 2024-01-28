const _ = require('lodash');

const getInfo = ({ field = [], object = {} }) => {
    return _.pick(object, field);
}

const getListInfo = ({ field = [], object = [] }) => {
    return object.map(item => _.pick(item, field));
}

module.exports = {
    getInfo,
    getListInfo
}