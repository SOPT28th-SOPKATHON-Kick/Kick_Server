import mongoose from "mongoose";
import { ICrawlingData } from "./ICrawlingData";

export interface IReview {
  user: mongoose.Types.ObjectId;
  title: string;
  endingCountry: string;
  endingAirport: string;
  hashtags: Array<string>;
  isInstitution: string;
  institutionName: string;
  content: string;
  link: string;
  image: string;
  desc: string;
  //crawlingData: [ICrawlingData];
  writeDate: Date;
}

export interface IReviewInputDTO {
  user?: mongoose.Types.ObjectId;
  title?: string;
  endingCountry?: string;
  endingAirport?: string;
  hashtags?: Array<string>;
  isInstitution?: string;
  institutionName?: string;
  content?: string;
  link?: string;
  image?: string;
  desc?: string;
  //crawlingData?: ICrawlingData;
}