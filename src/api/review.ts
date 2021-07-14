import express from "express";
import config from "../config";
import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";

const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

/**
 *  @route POST api/reviews
 *  @desc Create reviews
 *  @access Private
*/
router.post(
  "/",
  //auth,
  async (req, res) => {
    const {
      title,
      endingCountry,
      endingAirport,
      hashtags,
      isInstitution,
      institutionName,
      content,
      //user,
    } = req.body;

    const add = {
      link: null,
      desc: null,
      image: null,
    };

    // Build review object
    let reviewFields: IReviewInputDTO = {
      //user: user.id,
    };
    if (title) reviewFields.title = title;
    if (endingCountry) reviewFields.endingCountry = endingCountry;
    if (endingAirport) reviewFields.endingAirport = endingAirport;
    if (isInstitution) reviewFields.isInstitution = isInstitution;
    if (institutionName) reviewFields.institutionName = institutionName;
    if (hashtags) reviewFields.hashtags = hashtags;
    if (content) reviewFields.content = content;
    
    // Build crawlingData object
    if (add.link) reviewFields.crawlingData.link = add.link;
    if (add.image) reviewFields.crawlingData.image = add.image;
    if (add.desc) reviewFields.crawlingData.desc = add.desc;

    try {
      let url = req.body.content;
      //Create
      let review = new Review(reviewFields);
      //review.crawlingData.unshift(add);
      await review.save();

      res.json(review);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


module.exports = router;
