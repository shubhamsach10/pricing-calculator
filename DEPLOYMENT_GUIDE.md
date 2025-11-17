# 🚀 Deployment Guide - Birdeye Pricing Calculator

This guide will walk you through deploying your pricing calculator to GitHub and Google Cloud with a custom domain.

---

## 📋 Prerequisites

Before starting, make sure you have:
- ✅ A GitHub account (create one at https://github.com/signup if needed)
- ✅ A Google Cloud account (create one at https://cloud.google.com)
- ✅ A domain name (from any registrar like GoDaddy, Namecheap, Google Domains, etc.)
- ✅ Credit card for Google Cloud (offers $300 free credit for new users)

---

## Part 1: Push to GitHub

### Step 1: Create a GitHub Repository

1. **Go to GitHub** and sign in: https://github.com
2. **Click the "+" icon** in the top right corner
3. **Select "New repository"**
4. **Fill in the details:**
   - Repository name: `birdeye-pricing-calculator`
   - Description: `Modern pricing calculator for Birdeye's usage-based credit system`
   - Make it **Private** (recommended for internal tools)
   - **DO NOT** check "Initialize with README" (we already have one)
5. **Click "Create repository"**

### Step 2: Push Your Code to GitHub

After creating the repository, GitHub will show you commands. Run these in your terminal:

```bash
cd "/Users/sachdeva/Desktop/Cursor Projects/pricing calculator"

# Add the GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/birdeye-pricing-calculator.git

# Rename branch to main (GitHub's default)
git branch -M main

# Push your code
git push -u origin main
```

**Replace `YOUR_USERNAME`** with your actual GitHub username!

✅ **Your code is now on GitHub!** You can view it at:
`https://github.com/YOUR_USERNAME/birdeye-pricing-calculator`

---

## Part 2: Set Up Google Cloud

### Step 1: Install Google Cloud CLI

**For Mac (using Homebrew):**
```bash
brew install --cask google-cloud-sdk
```

**Or download from:** https://cloud.google.com/sdk/docs/install

After installation, restart your terminal.

### Step 2: Authenticate with Google Cloud

```bash
gcloud auth login
```

This will open your browser. Sign in with your Google account.

### Step 3: Create a Google Cloud Project

1. **Go to Google Cloud Console:** https://console.cloud.google.com
2. **Click the project dropdown** (top left, next to "Google Cloud")
3. **Click "New Project"**
4. **Enter project details:**
   - Project name: `birdeye-pricing`
   - Click "Create"
5. **Wait for the project to be created** (takes ~30 seconds)

### Step 4: Enable Required APIs

```bash
# Set your project ID (replace with your actual project ID)
gcloud config set project birdeye-pricing

# Enable required APIs
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

This might take 1-2 minutes.

### Step 5: Set Up Billing

1. Go to: https://console.cloud.google.com/billing
2. Link a billing account to your project
3. If you're new, you'll get **$300 free credit**!

**Cost Estimate:** With Cloud Run's free tier, you'll likely pay **$0-5/month** for this app.

---

## Part 3: Deploy to Google Cloud

### Option A: Easy One-Command Deploy (Recommended)

```bash
cd "/Users/sachdeva/Desktop/Cursor Projects/pricing calculator"
./deploy.sh
```

That's it! The script will:
- ✅ Build your Docker image
- ✅ Push it to Google Container Registry
- ✅ Deploy to Cloud Run
- ✅ Give you a live URL

### Option B: Manual Deploy

If you prefer to do it manually:

```bash
cd "/Users/sachdeva/Desktop/Cursor Projects/pricing calculator"

# Build and deploy
gcloud run deploy birdeye-pricing \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 256Mi
```

### Step 6: Get Your App URL

After deployment, you'll see output like:

```
Service [birdeye-pricing] revision [birdeye-pricing-00001-xxx] has been deployed
and is serving 100 percent of traffic.
Service URL: https://birdeye-pricing-xxxxxxxxx-uc.a.run.app
```

**🎉 Your app is live!** Copy that URL and open it in your browser.

---

## Part 4: Connect Your Custom Domain

### Step 1: Add Domain to Cloud Run

```bash
# Replace 'your-domain.com' with your actual domain
gcloud run domain-mappings create \
  --service birdeye-pricing \
  --domain pricing.your-domain.com \
  --region us-central1
```

Google will give you DNS records to add.

### Step 2: Update Your Domain's DNS

Go to your domain registrar (GoDaddy, Namecheap, etc.) and add these DNS records:

**Example records (Google will give you the exact ones):**

| Type  | Name    | Value                              | TTL  |
|-------|---------|----------------------------------- |------|
| CNAME | pricing | ghs.googlehosted.com               | 3600 |

**Or if using root domain:**

| Type | Name | Value          | TTL  |
|------|------|----------------|------|
| A    | @    | 216.239.32.21  | 3600 |
| A    | @    | 216.239.34.21  | 3600 |
| A    | @    | 216.239.36.21  | 3600 |
| A    | @    | 216.239.38.21  | 3600 |

### Step 3: Wait for DNS Propagation

- DNS changes can take **5 minutes to 48 hours**
- Usually works within **15-30 minutes**
- Check status: `nslookup pricing.your-domain.com`

### Step 4: Verify SSL Certificate

Google Cloud automatically provisions an SSL certificate. Check status:

```bash
gcloud run domain-mappings describe \
  --domain pricing.your-domain.com \
  --region us-central1
```

Wait until you see: `Status: ACTIVE`

**🎉 Your app is now live at:** `https://pricing.your-domain.com`

---

## Part 5: Making Updates (Your Workflow)

### Every Time You Make Changes:

1. **Make your changes locally** in the code
2. **Test locally:**
   ```bash
   npm run dev
   ```
3. **Commit to Git:**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```
4. **Push to GitHub:**
   ```bash
   git push
   ```
5. **Deploy to Google Cloud:**
   ```bash
   ./deploy.sh
   ```

That's it! Your changes are live in 2-3 minutes.

---

## 🔧 Useful Commands

### View Deployment Logs
```bash
gcloud run services logs read birdeye-pricing \
  --region us-central1 \
  --limit 50
```

### Check Service Status
```bash
gcloud run services describe birdeye-pricing \
  --region us-central1
```

### Update Environment Variables (if needed)
```bash
gcloud run services update birdeye-pricing \
  --set-env-vars KEY=VALUE \
  --region us-central1
```

### Roll Back to Previous Version
```bash
# List revisions
gcloud run revisions list --service birdeye-pricing --region us-central1

# Route traffic to a specific revision
gcloud run services update-traffic birdeye-pricing \
  --to-revisions REVISION_NAME=100 \
  --region us-central1
```

---

## 💰 Cost Breakdown

**Cloud Run Pricing (as of 2024):**
- **Free tier:** 2 million requests/month
- **After free tier:**
  - $0.40 per million requests
  - $0.00002400 per vCPU-second
  - $0.00000250 per GiB-second

**Estimated cost for internal tool (50 users, light usage):**
- **$0-3 per month** (likely stays in free tier)

**With domain mapping:**
- **$0.20/month** (negligible)

---

## 🔒 Security Best Practices

### Add Authentication (Optional)

If you want to restrict access:

```bash
# Remove public access
gcloud run services remove-iam-policy-binding birdeye-pricing \
  --region us-central1 \
  --member "allUsers" \
  --role "roles/run.invoker"

# Add specific users
gcloud run services add-iam-policy-binding birdeye-pricing \
  --region us-central1 \
  --member "user:email@company.com" \
  --role "roles/run.invoker"
```

Now users need to authenticate with Google to access the app.

---

## 🆘 Troubleshooting

### Issue: Docker command not found
**Solution:** Install Docker Desktop from https://www.docker.com/products/docker-desktop

### Issue: Permission denied
**Solution:** 
```bash
gcloud auth application-default login
```

### Issue: Service deployment failed
**Solution:** Check logs:
```bash
gcloud run services logs read birdeye-pricing --region us-central1
```

### Issue: Domain not working
**Solution:** 
1. Verify DNS records: `nslookup your-domain.com`
2. Wait 15-30 minutes for DNS propagation
3. Check mapping status: `gcloud run domain-mappings list`

### Issue: App crashes after deployment
**Solution:** The app is static and shouldn't crash. Check:
```bash
gcloud run services logs read birdeye-pricing --region us-central1 --limit 100
```

---

## 📞 Need Help?

- **Google Cloud Documentation:** https://cloud.google.com/run/docs
- **GitHub Documentation:** https://docs.github.com
- **Docker Documentation:** https://docs.docker.com

---

## 🎉 You're All Set!

Your pricing calculator is now:
- ✅ Version controlled on GitHub
- ✅ Deployed to Google Cloud
- ✅ Accessible via your custom domain
- ✅ Ready for easy updates

**Workflow Summary:**
1. Make changes locally
2. Test with `npm run dev`
3. Commit: `git add . && git commit -m "message"`
4. Push: `git push`
5. Deploy: `./deploy.sh`

**Enjoy your production-ready pricing calculator! 🚀**

