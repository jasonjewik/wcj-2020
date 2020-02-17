require('dotenv').config();
const express = require('express');

const UserController = (userModel) => {
    const router = express.Router();

    router.get('/', async (req, res) => {
        // Check if the auth key is correct
        if (!req.headers || req.headers.authorization != process.env.AUTH)
            return res.sendStatus(401);
        // Check if the query is valid
        if (req.query.id == undefined)
            return res.sendStatus(400);
        
        const id = req.query.id;
        const data = await userModel.getUser(id);

        if (data == null)
            return res.status(404).json({
                "message": "User not found!"
            });
        
        // Return the query results if successful!
        return res.status(200).json(data);
    });

    router.post('/', async(req, res) => {
        if (!req.headers || req.headers.authorization != process.env.AUTH)
            return res.sendStatus(401);
        if (Object.keys(req.body).length == 0)
            return res.sendStatus(400);

        // Get the arguments from the body
        // Now, we could just do Object.values(req.body) to get an array
        // of the arguments and then change all of our methods to accept
        // arrays (since the client.query method accepts an array anyway), 
        // but I find this to be much clearer, so I prefer this way.
        const firstName = req.body.first_name;
        const middleName = req.body.middle_name;
        const lastName = req.body.last_name;
        const userName = req.body.user_name;
        const emailAddress = req.body.email_address;
        
        const data = await userModel.createUser(firstName, middleName, lastName, userName, emailAddress);

        if (data == null)
            return res.status(400).json({
                "message": "Error creating user!"
            });
        
        return res.status(200).json(data);
    });

    router.patch('/upvotes', async(req, res) => {
        if (!req.headers || req.headers.authorization != process.env.AUTH)
            return res.sendStatus(401);
        if (req.query.id == undefined)
            return res.sendStatus(400);
        if (Object.keys(req.body).length == 0)
            return res.sendStatus(400);

        const id = req.query.id;
        const upvotes = req.body.upvotes;

        const data = await userModel.updateUpvotes(id, upvotes);

        if (data == null)
            return res.status(400).json({
                "message": "Error updating upvotes!"
            })

        return res.status(200).json(data);
    })

    return router;
};

module.exports = {
    UserController
}