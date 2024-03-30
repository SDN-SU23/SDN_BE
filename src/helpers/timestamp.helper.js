const moment = require('moment');


const getNowFormat = (format) => {
    return moment().format(format)
}

const convertDateToFormat = (date, format) => {
    return moment(date).format(format)
}

const addTimeToNow = (time, numTime, typeTime) => {
    return moment().add(numTime, typeTime).format(time)
}

const addTimeToNowUnix = (numTime, typeTime) => {
    return moment().add(numTime, typeTime).unix()
}

module.exports = {
    getNowFormat,
    convertDateToFormat,
    addTimeToNow,
    addTimeToNowUnix
}