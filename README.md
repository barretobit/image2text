# Image2Text

**Instant OCR in your browser** — Paste a screenshot, get the text, copy it. ✨

[![HTML5](https://img.shields.io/badge/HTML-5-orange.svg)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2020+-yellow.svg)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Tesseract.js](https://img.shields.io/badge/Tesseract.js-7.0.0-blue.svg)](https://github.com/naptha/tesseract.js)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Image2Text is a **static web app** that runs OCR entirely in your browser using [Tesseract.js](https://github.com/naptha/tesseract.js). No backend, no API keys, no cost, and **your images never leave your device**. 🔒

---

## ✨ Features

- **Paste, drop, or upload** — Paste screenshots with `Ctrl+V` (⌘V on Mac), drag and drop images anywhere on the page, or choose a file from your device
- **Multi-language support** — Recognizes English, German, French, and Italian. Changing the language automatically re-processes the current image
- **Works offline after first load** — Once the OCR engine and language data are cached by your browser, it runs without an internet connection
- **Private by design** — Everything happens locally in your browser; no data is sent to any server
- **Clean, modern UI** — Supports both light and dark themes
- **One-click copy** — Instantly copy extracted text to your clipboard

---

## 🚀 Getting Started

### Just use it

Open the app directly in your browser, or host it yourself:

```text
https://<your-username>.github.io/Image2Text/
```

---

## 🖥️ How to Use

1. Paste a screenshot with `Ctrl+V` (⌘V on Mac), drop an image anywhere on the page, or choose a file
2. Pick the text language (English, German, French, or Italian). Changing it re-reads the current image
3. Review the extracted text and click **Copy text**

---

## 🧰 Tech Stack

| Layer      | Technology                                                              |
|------------|-------------------------------------------------------------------------|
| **Frontend** | HTML5 · CSS3 · Vanilla JavaScript                                       |
| **OCR Engine** | [Tesseract.js](https://github.com/naptha/tesseract.js) v7.0.0           |
| **Hosting** | GitHub Pages (static, free, HTTPS)                                     |

---

## 🏗️ Project Structure

```
Image2Text/
├── index.html  # Page markup; loads Tesseract.js from jsDelivr
├── style.css   # Styling, including light and dark themes
└── app.js      # Paste, drop and file handling, OCR, and copy functionality
```

---

## 💻 Run Locally

Serve the folder with any local web server instead of opening `index.html` directly:

- **VS Code:** Install the **Live Server** extension, right-click `index.html` and choose **Open with Live Server**
- **Terminal:** Run `npx serve .` or `python -m http.server 8000`, then open [http://localhost:8000](http://localhost:8000)

---

## 🌐 Deploy to GitHub Pages

1. Create a **public** repository named `Image2Text` on GitHub (Pages on private repositories requires a paid plan)
2. Push the files:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<your-username>/Image2Text.git
   git push -u origin main
   ```

3. In the repository, go to **Settings → Pages**. Under **Build and deployment**, set **Source** to **Deploy from a branch**, choose **main** and **/ (root)**, then click **Save**
4. After a minute or two, the app is live at `https://<your-username>.github.io/Image2Text/`

---

## 📝 Notes

- The first OCR downloads the engine and language data (a few MB) from jsDelivr. The browser caches them, so later runs start much faster
- Results are best on clear screenshots. Very small text, low contrast, or complex tables may need manual corrections
- Tesseract.js is pinned to version 7.0.0 in `index.html`. To upgrade, change the version in that script URL

---

## 🔒 Privacy

- ✅ **No data leaves your device** — All processing happens locally in your browser
- ✅ **No accounts, no tracking, no telemetry** — This app has no backend or analytics
- ✅ **Works offline** — After the initial download, no internet connection is required

---

## 🙏 Credits

OCR by [Tesseract.js](https://github.com/naptha/tesseract.js), licensed under Apache-2.0.
