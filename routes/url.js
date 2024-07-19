const express = require("express");
const router = express.Router();
const { handleGernerateShortURL, handleDisplayShortURL, handleDisplayAnalyics, handleDeleteShortURL } = require("../controllers/url");

router.post('/', handleGernerateShortURL);
// router.get('/:shortId', handleDisplayShortURL);
router.get('/analytics/:shortId', handleDisplayAnalyics);
router.delete('/:shortId', handleDeleteShortURL);

module.exports = router;