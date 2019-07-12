const express = require("express");
const router = express.Router();
const shortid = require("shortid");
const config = require("../node_modules/config");
const validUrl = require("valid-url");

//Bring in URL model
const Url = require("../models/Url");

//Bring in baseUrl
const baseUrl = config.get("baseURI");

// @route   /api/url/shorten
// @desc    POST
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;

  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json("Invalid long url");
  }

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  } else {
    //Check if Url already in DB
    let url = await Url.findOne({ longUrl });
    try {
      if (url) {
        res.json(url);
      } else {
        //Generate url code
        const urlCode = shortid.generate();
        //Create ShortUrl
        const shortUrl = baseUrl + "/" + urlCode;
        url = new Url({
          urlCode,
          longUrl,
          shortUrl,
          date: new Date()
        });

        await url.save();
        res.json(url);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json("Internal Server error");
    }
  }
});

module.exports = router;
