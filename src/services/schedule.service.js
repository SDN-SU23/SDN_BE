const schedule = require('node-schedule');
const userModel = require('../models/user.model');

const scheduleJob = () => {
    schedule.scheduleJob('0 0 0 * * *', async () => {
        const listCreator = await userModel.find({ role: 'Creator' });
        // check expired_at
        listCreator.forEach(async (creator) => {
            if (new Date(creator.expired_at) < new Date()) {
                await userModel.findByIdAndUpdate({ _id: creator._id }, { role: 'Audience' });
            }
        });

    });
    console.log('Schedule job is running');
}


module.exports = scheduleJob