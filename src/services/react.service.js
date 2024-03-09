'use strict'

const reactModel = require("../models/react.model");

class ReactService {
    static createNewReact = async (data) => {
        try {
            // create a new react
            const result = await reactModel.create(data);
            return result;
        } catch (error) {
            // do something
            throw error;
        }
    }

    static deleteReact = async (params) => {
        try {
            // get artworkId and userId from params
            const { artworkId, userId } = params;
            // delete a react
            const result = await reactModel.findOneAndDelete({
                artworkId: artworkId,
                userId: userId
            })
            return result;
        } catch (error) {
            // do something
            throw error;
        }
    }
}

module.exports = ReactService;