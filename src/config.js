import { createHttpLink } from "@apollo/client";

export const httpLink = createHttpLink({
  uri: "",
});

export const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
export const S3_BUCKET_IMAGES = process.env.REACT_APP_AWS_S3_BUCKET_IMAGES;
export const region = process.env.REACT_APP_AWS_REGION;
export const accessKeyId = process.env.REACT_APP_AWS_ACCESS_KEY;
export const secretAccessKey = process.env.REACT_APP_AWS_SECRET_ACCESS_KEY;
