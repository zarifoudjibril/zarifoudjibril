# 🚀 Ultra-Modern Developer Portfolio

A responsive, high-performance, and easily customizable developer portfolio built with **React 18**, **Vite**, **Tailwind CSS**, and **Lucide Icons**. Pre-configured for instant zero-configuration deployment to **GitHub Pages** and **Netlify**.

---

## ✨ Features

- ⚡ **Blazing Fast**: Powered by Vite and Tailwind CSS.
- 🎨 **Modern Design System**: Dark/Light mode toggle, glassmorphic cards, gradient glow backdrops, and Bento Grid layout.
- 📁 **Centralized Data Configuration**: Update all your info, skills, projects, and work history in a single file: `src/data/portfolioData.js`.
- 🔍 **Interactive Project Showcase**: Category filter pills, live search bar, and full-screen project inspection modals.
- 📬 **Contact Ready**: Netlify Forms integrated, one-click copy email button with feedback, and celebratory confetti animation.
- 🌐 **Deploy Ready**: Includes `netlify.toml` and `.github/workflows/deploy.yml` for automated GitHub Pages hosting.

---

## 🛠️ Local Development

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.

4. **Build production bundle**:
   ```bash
   npm run build
   ```
   The compiled static files will be in the `dist/` directory.

---

## 📝 How to Personalize Your Portfolio

Open `src/data/portfolioData.js` and edit the configuration:

```javascript
export const portfolioData = {
  personal: {
    name: "Your Name",
    title: "Your Professional Title",
    tagline: "Your brief elevator pitch",
    location: "City, Country",
    status: "Available for new opportunities",
    avatar: "https://your-image-url.com/photo.jpg",
    bioParagraphs: [ ... ],
    resumeUrl: "#resume", // URL to your PDF resume
  },
  stats: [ ... ],
  socials: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    email: "your.email@example.com",
  },
  skills: [ ... ],
  projects: [ ... ],
  experience: [ ... ],
  education: [ ... ],
  testimonials: [ ... ],
};
```

---

## 🚀 How to Deploy

### Option 1: Deploy to GitHub Pages (Automated with GitHub Actions)

1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize git and push your code:
   ```bash
   git init
   git add .
   git commit -m "feat: initial modern portfolio"
   git branch -M main
   git remote add origin https://github.com/<YOUR_USERNAME>/<REPO_NAME>.git
   git push -u origin main
   ```
3. On GitHub, go to your repository **Settings** → **Pages**.
4. Under **Build and deployment** > **Source**, select **GitHub Actions**.
5. The included workflow `.github/workflows/deploy.yml` will automatically build and publish your site at `https://<YOUR_USERNAME>.github.io/<REPO_NAME>/`.

---

### Option 2: Deploy to Netlify

#### Method A: Connect with Git (Continuous Deployment)
1. Push your repository to GitHub / GitLab / Bitbucket.
2. Log into [Netlify](https://app.netlify.com/) and click **Add new site** → **Import an existing project**.
3. Select your repository.
4. Netlify will automatically detect settings from `netlify.toml`:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Click **Deploy**. Your site will be live instantly with automated SSL!

#### Method B: Netlify Drop (Manual Drag & Drop)
1. Run `npm run build` locally.
2. Go to [Netlify Drop](https://app.netlify.com/drop).
3. Drag and drop the generated `dist/` folder into the browser.

---

## 📄 License
MIT License - feel free to use and adapt this portfolio for your personal or commercial use!
