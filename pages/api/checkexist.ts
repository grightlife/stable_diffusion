// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs'
import path from 'path'

// { exec, execSync } 

type Data = {
  isExist: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { query } = req
  const isExist = fs.existsSync(path.join(process.cwd(), `public/samples/${query?.id}.png`));
  if (isExist) {
    return res.status(200).json({ isExist: true })
  } else {
    return res.status(200).json({ isExist: false })
  }
}
