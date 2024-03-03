const shortid = require('shortid')
const URL = require("../models/url")

async function handleGernerateShortURL(req, res) {
    const body = req.body;
    console.log(body);
    if (body === undefined) {
        return res.status(404).json({ error: 'body is required' })
    }
    if (!body.url) {
        return res.status(404).json({ error: 'url is required' })
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: [],
        createdBy: req.user._id, // req.user is coming from auth middleware
    });

    // return res.json({ id: shortID });
    res.render('home.ejs', { id: shortID });

}

async function handleDisplayShortURL(req, res) {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            },
        }
    );

    res.redirect(entry.redirectUrl);
}

async function handleDisplayAnalyics(req, res) {
    console.log("entry in display analytics")
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
        return res.status(404).json({ error: 'data not found' });
    }

    return res.json({
        totalClicks: entry.visitHistory.length,
        analytics: entry.visitHistory
    });
}


module.exports = {
    handleGernerateShortURL, handleDisplayShortURL, handleDisplayAnalyics,
}