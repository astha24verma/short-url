const shortid = require('shortid')
const URL = require("../models/url")
const user = require("../models/user")

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
    res.render('home', {
         id: shortID, 
         urls: await URL.find({ createdBy: req.user._id }) 
        });

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
    const shortId = req.params.shortId;
    const entry = await URL.findOne({ shortId });

    if (!entry) {
        return res.status(404).json({ error: 'data not found' });
    }

    // return res.json({
    //     totalClicks: entry.visitHistory.length,
    //     analytics: entry.visitHistory
    // }); 

    const timestamp = entry.visitHistory[entry.visitHistory.length - 1].timestamp;

    const date = new Date(timestamp*1000);
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var d = new Date(timestamp);
    var dayName = days[d.getDay()];

    const lastVisited = dayName + " "+ date.toLocaleTimeString();

    res.render('stats', {
        id : shortId, 
        totalClicks: entry.visitHistory.length, 
        lastVisitHistory: lastVisited, 
        user: (await user.find({_id: entry.createdBy}))[0].name,
    });
}


module.exports = {
    handleGernerateShortURL, handleDisplayShortURL, handleDisplayAnalyics,
}