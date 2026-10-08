# Image2Text

Paste a screenshot, get the text, copy it.

Image2Text is a static web page that runs OCR entirely in the browser using [Tesseract.js](https://github.com/naptha/tesseract.js). There is no backend, no API key and no cost, and images never leave your device.

## How to use

1. Paste a screenshot with Ctrl+V (⌘V on Mac), drop an image anywhere on the page, or choose a file.
2. Pick the text language (English, German, French or Italian). Changing it re-reads the current image.
3. Review the extracted text and click **Copy text**.

## Project files

| File         | Purpose                                         |
|--------------|-------------------------------------------------|
| `index.html` | Page markup; loads Tesseract.js from jsDelivr   |
| `style.css`  | Styling, including light and dark themes        |
| `app.js`     | Paste, drop and file handling, OCR, copy        |

## Run locally

Serve the folder with any local web server instead of opening `index.html` directly:

- VS Code: install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**.
- Or from a terminal in this folder: `npx serve .` or `python -m http.server 8000`, then open http://localhost:8000.

## Deploy to GitHub Pages

1. Create a **public** repository named `Image2Text` on GitHub (Pages on private repositories needs a paid plan).
2. Push the files:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Image2Text.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then click **Save**.
4. After a minute or two the app is live at `https://<your-username>.github.io/Image2Text/`.

## Notes

- The first OCR downloads the engine and language data (a few MB) from jsDelivr. The browser caches them, so later runs start much faster.
- Results are best on clear screenshots. Very small text, low contrast or complex tables may need manual corrections.
- Tesseract.js is pinned to version 7.0.0 in `index.html`. To upgrade, change the version in that script URL.

## Credits

OCR by [Tesseract.js](https://github.com/naptha/tesseract.js), licensed under Apache-2.0.
