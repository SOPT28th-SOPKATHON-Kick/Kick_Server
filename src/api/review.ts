import express from "express";
import config from "../config";
import Review from "../models/Review";
import { IReviewInputDTO } from "../interfaces/IReview";

const router = express.Router();

const axios = require('axios');
const cheerio = require('cheerio');

router.get('/', function(req, res, next) {
  let url = 'https://thegift.tistory.com/232';
  
  axios.get(url).then(html => {
    let ulList = [];
    const $ = cheerio.load(html.data);
    const $bodyList = $("head");
		//each : list 마다 함수 실행, forEach와 동일
    $bodyList.each(function(i, elem) {
      ulList[i] = {
        //find : 해당 태그가 있으면 그 요소 반환
          link: $(this).find('meta[property="og:url"]').attr('content'),
          image: $(this).find('meta[property="og:image"]').attr('content'),
          desc: $(this).find('meta[property="og:description"]').attr('content')
      };
    });

    const data = ulList.filter(n => n.title);
    //json으로 변환하여 app으로 전송
    return res.json(data);
  })
});

module.exports = router;
