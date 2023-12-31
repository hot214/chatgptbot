import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { errors as formidableErrors } from 'formidable';
import run from 'scripts/ingest-data';
import fs from 'fs';
import path from 'path';
import IncomingForm from 'formidable/Formidable';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    //parsing the file
    if (!fs.existsSync('docs/')) fs.mkdirSync('docs');
    const file = await new Promise<formidable.File | null>(
      (resolve, reject) => {
        const form = formidable({ keepExtensions: true });
        form.parse(req, (err, fields, files) => {
          if (err) {
            console.error('Error parsing form data:', err);
            reject(err);
          } else {
            const uploadedFile = files?.file as formidable.File;
            resolve(uploadedFile || null);
          }
        });
      },
    );

    // check if file is valid
    if (!file) {
      res.status(400).json({ message: 'No file received.' });
      return;
    }

    const originName = JSON.parse(JSON.stringify(file))[0]['originalFilename'];
    const filePath = JSON.parse(JSON.stringify(file))[0]['filepath'];
    const docPath = 'docs/' + originName;
    const dstPath =
      'lib/' + JSON.parse(JSON.stringify(file))[0]['originalFilename'];
    // fs.renameSync(filepath, 'docs/source.pdf');

    console.log(filePath, docPath, dstPath);

    fs.copyFileSync(filePath, docPath);
    await run();

    if (!fs.existsSync('lib/')) fs.mkdirSync('lib');

    fs.renameSync(docPath, dstPath);
    fs.rmdirSync('docs');
    fs.unlinkSync(filePath);

    res.status(200).send('success');
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
