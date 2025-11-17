# ⚡ Quick Deploy Reference

This is your cheat sheet for deploying updates!

---

## 🚀 First Time Setup (Do Once)

### 1. Push to GitHub
```bash
# Create repo on GitHub first, then:
git remote add origin https://github.com/YOUR_USERNAME/birdeye-pricing-calculator.git
git branch -M main
git push -u origin main
```

### 2. Install Google Cloud CLI
```bash
brew install --cask google-cloud-sdk
gcloud auth login
```

### 3. Set Up Google Cloud Project
```bash
gcloud config set project YOUR_PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com containerregistry.googleapis.com
```

### 4. First Deployment
```bash
./deploy.sh
```

### 5. Add Your Domain (Optional)
```bash
gcloud run domain-mappings create \
  --service birdeye-pricing \
  --domain pricing.your-domain.com \
  --region us-central1
```

Then add the DNS records Google gives you to your domain registrar.

---

## 🔄 Regular Updates (Every Time You Make Changes)

### The 4-Step Workflow

```bash
# 1. Make sure you're in the project folder
cd "/Users/sachdeva/Desktop/Cursor Projects/pricing calculator"

# 2. Add and commit your changes
git add .
git commit -m "Brief description of what you changed"

# 3. Push to GitHub
git push

# 4. Deploy to Google Cloud
./deploy.sh
```

**That's it!** Your changes are live in 2-3 minutes. ✅

---

## 📝 Common Commands

### View Your Live App
```bash
# Get the URL
gcloud run services describe birdeye-pricing --region us-central1 --format 'value(status.url)'
```

### Check Deployment Status
```bash
gcloud run services list
```

### View Logs (if something breaks)
```bash
gcloud run services logs read birdeye-pricing --region us-central1 --limit 50
```

### Test Locally Before Deploying
```bash
npm run dev
# Opens at http://localhost:5173
```

### Build Production Version Locally (Optional)
```bash
npm run build
npm run preview
```

---

## 🆘 Quick Fixes

### If deploy.sh doesn't work:
```bash
chmod +x deploy.sh
./deploy.sh
```

### If you forgot your project ID:
```bash
gcloud projects list
gcloud config set project YOUR_PROJECT_ID
```

### If you need to re-authenticate:
```bash
gcloud auth login
gcloud auth application-default login
```

### To see all your Cloud Run services:
```bash
gcloud run services list
```

---

## 💡 Pro Tips

1. **Always test locally first:** Run `npm run dev` before deploying
2. **Use meaningful commit messages:** Helps you track changes
3. **Deploy often:** Small, frequent updates are safer
4. **Check logs if issues:** `gcloud run services logs read birdeye-pricing`
5. **Bookmark your app URL:** Save time accessing it

---

## 📱 Your URLs

Once deployed, save these:

- **GitHub Repo:** `https://github.com/YOUR_USERNAME/birdeye-pricing-calculator`
- **Google Cloud Console:** `https://console.cloud.google.com/run?project=YOUR_PROJECT_ID`
- **Live App (Cloud Run):** `https://birdeye-pricing-xxxxx-uc.a.run.app`
- **Custom Domain (if set up):** `https://pricing.your-domain.com`

---

**Remember:** The full deployment guide is in `DEPLOYMENT_GUIDE.md` if you need detailed instructions!

