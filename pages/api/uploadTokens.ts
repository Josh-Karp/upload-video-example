import ApiVideoClient from "@api.video/nodejs-client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = new ApiVideoClient({
      apiKey: process.env.API_KEY,
    });
    if (req.method === "GET") {
      const uploadTokensList = await client.uploadTokens.list();
      res.status(200).json({ uploadTokensList });
    } else if (req.method === "POST") {
      const newUploadToken = await client.uploadTokens.createToken();
      res.status(200).json({ newUploadToken });
    } else res.status(405).send("METHOD NOT ALLOWED");
  } catch (error) {
    res.status(401).send(error);
  }
}
