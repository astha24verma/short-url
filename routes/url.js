const express = require("express")
const router = express.Router();
const {handleGernerateShortURL, handleDisplayShortURL, handleDisplayAnalyics} = require("../controllers/url");

router.post('/', handleGernerateShortURL);
router.get('/:shortId', handleDisplayShortURL); 
router.get('/analytics/:shortId', handleDisplayAnalyics);

module.exports = router;