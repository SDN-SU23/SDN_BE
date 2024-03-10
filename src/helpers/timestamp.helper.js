const moment = require('moment');


const getNow = () => {
    return moment().format('YYYY-MM-DD HH:mm:ss')
}

const getNowDate = () => {
    return moment().format('YYYY-MM-DD')
}

const getNowTime = () => {
    return moment().format('HH:mm:ss')
}

const convertToNormalDate = (date) => {
    return moment(date).format('YYYY-MM-DD')
}

const payGetDate = () => {
    return moment().format('YYYYMMDD')
}

const payGetTime = (date) => {
    return moment(date).format('HHmmss')
}

const payGetNow = (date) => {
    return moment(date).format('yyyymmddHHmmss')
}

module.exports = {
    getNow,
    getNowDate,
    getNowTime,
    convertToNormalDate,
    payGetTime,
    payGetDate,
    payGetNow
}