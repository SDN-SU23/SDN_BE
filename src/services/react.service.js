'use strict'

const reactModel = require("../models/react.model");
const notifcationModel = require("../models/notification.model");
const artworkModel = require("../models/artwork.model");

class ReactService {
    static createNewReact = async (data) => {
        try {
            // create a new react
            const result = await reactModel.create(data);

            // get detail artwork
            const artwork = await artworkModel.findOne({
                _id: data.artworkId
            });
            // 
            await artworkModel.findOneAndUpdate({
                _id: data.artworkId
            }, {
                reactNumber: artwork.reactNumber + 1
            })
            // // send notification to author of artwork
            // const sendNotification = await notifcationModel.create({
            //     userId: artwork.authorId,
            //     content: `New react in your artwork`
            // });

            return result;
        } catch (error) {
            // do something
            throw error;
        }
    }

    static deleteReact = async (query) => {
        try {
            // get artworkId and userId from params
            const { artworkId, userId } = query;
            // delete a react
            const result = await reactModel.findOneAndDelete({
                artworkId: artworkId,
                userId: userId
            })
            // get detail artwork
            const artwork = await artworkModel.findOne({
                _id: artworkId
            });
            let newReact;
            // update react number
            if (artwork.reactNumber === 0) {
                newReact = 0;
            } else {
                newReact = artwork.reactNumber - 1;
            }
            // update react number
            await artworkModel.findOneAndUpdate({
                _id: artworkId
            }, {
                reactNumber: newReact
            })
            return result;
        } catch (error) {
            // do something
            throw error;
        }
    }

    static getReactByArtworkId = async (artworkId) => {
        try {
            // get list react by artworkId
            const result = await reactModel.find({
                artworkId: artworkId
            }).populate('userId');
            return result;
        } catch (error) {
            // do something
            throw error;
        }
    }
}

module.exports = ReactService;