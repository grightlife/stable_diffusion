// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { exec }  from 'child_process'
import path from 'path'
// { exec, execSync } 

type Data = {
  id: string
}

const pythonScript = path.join(process.cwd(), `stable-diffusion/generate.py`)
const modelsFile = path.join(process.cwd(), `stable-diffusion/models/ldm/stable-diffusion-v1-4/sd-v1-4.ckpt`)

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { width, height, step, prompt } = req.body
  try {
    // let id = null as null | string
    const childP = exec(`python ${pythonScript} --prompt "${prompt}" --plms --outdir public --ckpt ${modelsFile} --ddim_steps ${step} --H ${height} --W ${width} --seed 8`)
    childP.stdout?.on('data', (data)=> {
      if (data.indexOf('id:') === 0) {
        const id = data.replace('id:', '').split('\n')[0] as string
        return res.status(200).json({ id })
      }
    });
    childP.stdout?.on('exit', (data)=> {
      return res.status(400).json(data)
    });
  } catch (err) {
    console.log(err)
  }
  
}
