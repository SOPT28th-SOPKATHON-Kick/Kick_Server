import { Router, Request, Response } from "express";

import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";

const router = Router();
const puppeteer = require("puppeteer");
const cheerio = require('cheerio');

/**
 *  @route POST api/reviews
 *  @desc Create reviews
 *  @access Private
*/
router.post(
  "/",
  //auth,
  async (req: Request, res: Response) => {
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
      const extractData = html => {

        const $ = cheerio.load(html);
        const $items = $('head');
        $items.each(function (i, elem) {
            add.link = $(this).find('meta[property="og:url"]').attr('content');
            add.image = $(this).find('meta[property="og:image"]').attr('content');
            add.desc = $(this).find('meta[property="og:description"]').attr('content');
        });
      }
    
      const browserOption = {
        headless : true,
      };
      const browser = await puppeteer.launch(browserOption);
      const page = await browser.newPage();
      // Crawling
      const url = req.body.content;
      const response = await page.goto(url);
      const html = await response.text();
      extractData(html);

      //Create
      let review = new Review(reviewFields);
      await review.save();

      review = await Review.findOne({ _id: review.id });
      review.crawlingData.unshift(add);
      await review.save();

      res.json(review);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
