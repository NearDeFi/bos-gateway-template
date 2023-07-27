# BOS Gateway Template

## Setup & Development

Initialize repo:

```bash
pnpm i
```

Start development version:

```bash
cp .env.example .env
pnpm dev
```

The entry component is ```BosMain``` and it's located at
```/src/components/index.tsx```

It loads the ```ciocan.near/widget/hello-world``` BOS component. The source can be found [here](https://near.org/near/widget/ComponentDetailsPage?src=ciocan.near/widget/hello-world&tab=source).

## Deployment

This is a [Next.js](https://github.com/vercel/next.js/) app and a fork of [NEAR Discovery](https://github.com/near/near-discovery) gateway app.

For static exports just run ```next build``` and upload the build files to your hosting provider. More info [here](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).

For Vercel, Cloudflare or others that supports a Next app just connect the repo and follow the deploy steps from the dashboards.

More info on Next.js deployments [here](https://nextjs.org/docs/pages/building-your-application/deploying/static-exports).

## Running with docker

```bash
docker build -t bos-gateway-template .
docker run -p 3000:3000 bos-gateway-template
```
