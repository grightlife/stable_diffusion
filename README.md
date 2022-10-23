
## first, install stable-diffusion


```
cd stable-diffusion
conda env create -f environment.yaml
conda activate ldm
conda install pytorch torchvision -c pytorch
pip install transformers==4.19.2 diffusers invisible-watermark
pip install -e .
```

(remember install sd-v1-4.ckpt)

## second, go back to root and install nextjs

```
cd ../
yarn install
yarn dev
```