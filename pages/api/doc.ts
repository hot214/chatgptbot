import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const directoryPath = 'lib';

    if (!fs.existsSync(directoryPath)) fs.mkdirSync(directoryPath);

    const files = fs.readdirSync(directoryPath);
    if (files.length == 0) {
      res.status(400).json([]);
    }
    res.status(200).json(files);
  }
}
