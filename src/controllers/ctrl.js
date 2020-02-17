const express = require('express');

const Controller = () => {
    // We append these endpoints to the ones in index.js
    // See the return statement at the bottom
    const router = express.Router();
    
    // So for instance, this will be localhost:port/api/get
    router.get('/get', async (req, res) => {
        return res.send("Hello World!");
    });

    // And this will be localhost:port/api/post
    router.post('/post', async(req, res) => {
        if (Object.keys(req.body) == 0) {
            // The request is invalid without a body!
            return res.sendStatus(400);
        }

        // Typically you never do this, but for this example, let's
        // say we pass in our authorization credentials via the body.
        let auth = req.body.authorization;

        // If the auth key is valid, then...
        if (auth == 'super secret key') {
            return res.status(200).json({
                message: "secret message!"
            });
        }
        // Otherwise...
        else {
            return res.status(400).json({
                message: "Wrong auth key!"
            })
        }
    });

    // Returning this to index.js - think about why this would append!
    return router;
}

module.exports = {
    Controller
}