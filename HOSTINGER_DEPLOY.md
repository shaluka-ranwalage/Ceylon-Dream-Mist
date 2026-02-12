# Hostinger Deployment (Static)

This project is configured for Hostinger shared hosting using **Next.js static export**.

## 1. Build static files

```bash
npm install
npm run build:hostinger
```

This creates an `out/` folder.

## 2. Upload to Hostinger

Upload the **contents of `out/`** (not the folder itself) to your Hostinger `public_html/` directory.

Use one of:
- hPanel File Manager
- FTP/SFTP (FileZilla)
- Git deployment (if configured in Hostinger)

## 3. Important notes

- If deploying to a subfolder (e.g. `example.com/shop/`), you'll also need `basePath`/`assetPrefix` updates in `next.config.mjs`.
- If your site is at domain root (`example.com`), current config works as-is.
