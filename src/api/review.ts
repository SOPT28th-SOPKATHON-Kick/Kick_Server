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
      user,
    } = req.body;

    const add = {
      link: null,
      desc: null,
      image: null,
    };
    let url = req.body.content;

    // Build review object
    let reviewFields: IReviewInputDTO = {
      user: user.id,
    };
    if (title) reviewFields.title = title;
    if (endingCountry) reviewFields.endingCountry = endingCountry;
    if (endingAirport) reviewFields.endingAirport = endingAirport;
    if (isInstitution) reviewFields.isInstitution = isInstitution;
    if (institutionName) reviewFields.institutionName = institutionName;
    if (hashtags) reviewFields.hashtags = hashtags;
    if (content) reviewFields.content = content;
    
    // Build crawlingData object
    if (add.link) reviewFields.link = add.link;
    if (add.image) reviewFields.image = add.image;
    if (add.desc) reviewFields.desc = add.desc;

    try {
      //Create
      let review = new Review(reviewFields);
      await review.save();

      axios.get(url).then(html => {
        const $ = cheerio.load(html.data);
        const $bodyList = $('head');
        //each : list 마다 함수 실행, forEach와 동일
        $bodyList.each(function(i, elem) {
          add.link = $(this).find('meta[property="og:url"]').attr('content'),
          add.image = $(this).find('meta[property="og:image"]').attr('content'),
          add.desc = $(this).find('meta[property="og:description"]').attr('content')
        });
      }) //크롤링 끝

      review = await Review.findOne({ _id: review.id });
      review.crawlingData.unshift(add);
      await review.save();

      res.json(add);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);


module.exports = router;
