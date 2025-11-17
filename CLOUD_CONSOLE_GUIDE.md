# 🖱️ Google Cloud Deployment - UI Guide (No Terminal Required!)

This guide walks you through deploying your pricing calculator using **only the Google Cloud Console** (web interface). No terminal commands needed!

---

## 📋 What You'll Need

- ✅ Google account (Gmail)
- ✅ Credit card (for verification - you get $300 free credit!)
- ✅ Your GitHub repository URL
- ⏱️ **Time needed:** 20-30 minutes

---

## Part 1: Set Up Google Cloud Account

### Step 1: Create Google Cloud Account

1. **Go to:** https://cloud.google.com
2. **Click "Get started for free"** (top right)
3. **Sign in** with your Google account
4. **Select your country** and accept terms
5. **Choose "Individual" account type**
6. **Enter your credit card details**
   - Don't worry! You won't be charged without permission
   - New users get **$300 free credit** for 90 days
   - This app costs ~$0-3/month, well within free tier
7. **Click "Start my free trial"**

✅ **You now have a Google Cloud account!**

---

## Part 2: Create Your Project

### Step 2: Create a New Project

1. **Go to:** https://console.cloud.google.com
2. **Look at the top navigation bar** - you'll see "Select a project" dropdown
3. **Click the dropdown** → **Click "NEW PROJECT"**
4. **Fill in the details:**
   - **Project name:** `Birdeye Pricing Calculator`
   - **Project ID:** `birdeye-pricing` (or it will auto-generate one)
   - **Location:** Leave as "No organization"
5. **Click "CREATE"**
6. **Wait 30 seconds** for the project to be created

**Important:** After creation, **make sure the new project is selected** in the dropdown at the top!

✅ **Your project is ready!**

---

## Part 3: Enable Required APIs

### Step 3: Enable Cloud Run API

1. **Go to:** https://console.cloud.google.com/apis/library
2. **Make sure** your project is selected (check top dropdown)
3. **Search for:** `Cloud Run API`
4. **Click** on "Cloud Run API"
5. **Click "ENABLE"** button
6. **Wait** ~30 seconds for it to enable

### Step 4: Enable Cloud Build API

1. **Go to:** https://console.cloud.google.com/apis/library
2. **Search for:** `Cloud Build API`
3. **Click** on "Cloud Build API"
4. **Click "ENABLE"** button
5. **Wait** ~30 seconds for it to enable

### Step 5: Enable Container Registry API

1. **Go to:** https://console.cloud.google.com/apis/library
2. **Search for:** `Container Registry API`
3. **Click** on "Container Registry API"
4. **Click "ENABLE"** button
5. **Wait** ~30 seconds for it to enable

✅ **All APIs enabled!**

---

## Part 4: Connect GitHub Repository

### Step 6: Set Up Cloud Build with GitHub

1. **Go to:** https://console.cloud.google.com/cloud-build/triggers
2. **Click "CONNECT REPOSITORY"** button
3. **Select source:** Choose **"GitHub (Cloud Build GitHub App)"**
4. **Click "CONTINUE"**
5. **Authenticate GitHub:**
   - Click "Authorize Google Cloud Build"
   - Sign in to GitHub if needed
   - Grant permissions
6. **Select repository:**
   - Find your repository: `birdeye-pricing-calculator`
   - Click the checkbox next to it
   - Click "CONNECT"
7. **Skip the trigger creation** (click "SKIP FOR NOW")

✅ **GitHub connected!**

---

## Part 5: Deploy Your Application

### Step 7: Create Cloud Build Trigger

1. **Go to:** https://console.cloud.google.com/cloud-build/triggers
2. **Click "CREATE TRIGGER"** button
3. **Fill in the trigger details:**

   **Name:** `deploy-pricing-calculator`
   
   **Region:** `global`
   
   **Event:** Select **"Push to a branch"**
   
   **Source:** 
   - Repository: `YOUR_GITHUB_USERNAME/birdeye-pricing-calculator`
   - Branch: `^main$` (or `^master$` if your branch is called master)
   
   **Configuration:**
   - Type: **"Cloud Build configuration file (yaml or json)"**
   - Location: `/ cloudbuild.yaml`
   
   **Scroll down to "Logging" section:**
   - **Logging:** Select **"Cloud Logging only"** (Important!)
   
4. **Click "CREATE"** at the bottom

### Step 8: Run Your First Build

1. **On the Triggers page**, find your trigger
2. **Click the "RUN" button** (three dots → Run trigger)
3. **Click "RUN TRIGGER"** to confirm
4. **You'll be redirected** to the build history page

### Step 9: Monitor the Build

1. **Go to:** https://console.cloud.google.com/cloud-build/builds
2. **Watch your build** in progress (takes 3-5 minutes)
3. **You'll see** these steps:
   - ✅ Building Docker image
   - ✅ Pushing to Container Registry
   - ✅ Deploying to Cloud Run
4. **Wait for** the green checkmark ✅

If the build fails, see the troubleshooting section below.

---

## Part 6: Access Your Application

### Step 10: Get Your App URL

1. **Go to:** https://console.cloud.google.com/run
2. **You'll see** your service: `birdeye-pricing`
3. **Click on** the service name
4. **At the top**, you'll see your app URL like:
   ```
   https://birdeye-pricing-xxxxx-uc.a.run.app
   ```
5. **Click the URL** to open your app!

🎉 **Your pricing calculator is live!**

---

## Part 7: Connect Custom Domain (Optional)

### Step 11: Verify Your Domain First

Before you can map your domain, Google needs to verify you own it.

1. **Go to:** https://console.cloud.google.com/run/domains
2. **Click "VERIFY A NEW DOMAIN"** button
3. **Enter your root domain:** `yourdomain.com` (not `pricing.yourdomain.com`)
4. **Click "CONTINUE"**
5. **Google shows you a verification code** (TXT record)
6. **Copy the verification code** (long string starting with `google-site-verification=`)

### Step 11b: Add TXT Record to Your Domain

Go to your domain registrar and add a TXT record:

**Record details:**
- Type: `TXT`
- Name: `@` (or leave blank)
- Value: Paste the verification code from Google
- TTL: 600 or Auto

**Common registrars:**
- **GoDaddy:** My Products → DNS → Add → TXT Record
- **Namecheap:** Domain List → Manage → Advanced DNS → Add TXT Record
- **Google Domains:** DNS → Custom resource records → TXT
- **Cloudflare:** DNS → Add record → TXT

**Wait 15-30 minutes** for DNS propagation.

### Step 11c: Verify Domain Ownership

1. **Go back to:** https://console.cloud.google.com/run/domains
2. **Click "VERIFY"** next to your domain
3. **Wait for:** Status changes to ✅ "Verified"
4. **If still pending:** Wait another 10-15 minutes and try again

### Step 12: Map Your Subdomain

Now that your domain is verified:

1. **Go to:** https://console.cloud.google.com/run
2. **Click** on your service `birdeye-pricing`
3. **Click** the "MANAGE CUSTOM DOMAINS" tab at the top
4. **Click "ADD MAPPING"** button
5. **Fill in details:**
   - **Service:** birdeye-pricing
   - **Region:** us-central1
   - **Domain:** Type your subdomain (e.g., `pricing.yourdomain.com`)
6. **Click "CONTINUE"**

### Step 12: Update DNS Records

Google will show you DNS records to add. For example:

```
Type:  CNAME
Name:  pricing
Value: ghs.googlehosted.com.
```

**Now go to your domain registrar:**

#### If you use GoDaddy:
1. Log in to GoDaddy
2. Go to "My Products" → "DNS"
3. Click "Add" under Records
4. Select "CNAME"
5. Enter the values Google gave you
6. Click "Save"

#### If you use Namecheap:
1. Log in to Namecheap
2. Go to "Domain List" → Click "Manage"
3. Click "Advanced DNS" tab
4. Click "Add New Record"
5. Select "CNAME Record"
6. Enter the values Google gave you
7. Click the checkmark to save

#### If you use Google Domains:
1. Log in to Google Domains
2. Click your domain → "DNS"
3. Scroll to "Custom resource records"
4. Enter the values Google gave you
5. Click "Add"

### Step 14: Wait for SSL Certificate

1. **DNS propagation** takes 15-30 minutes (sometimes up to 48 hours)
2. **Go back to** Cloud Run console
3. **Check the domain mapping** - it will show:
   - 🟡 "Pending" - Still setting up
   - 🟢 "Active" - Ready to use!
4. **Once active**, visit your custom domain!

🎉 **Your app is now at:** `https://pricing.yourdomain.com`

---

## Part 8: Making Updates

### Every Time You Make Code Changes:

**Good news:** It's automatic now! ✨

1. **Make changes** to your code locally
2. **Test locally:**
   ```bash
   npm run dev
   ```
3. **Commit and push to GitHub:**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push
   ```
4. **That's it!** Cloud Build automatically:
   - Detects the push
   - Builds your app
   - Deploys to Cloud Run
   - Takes 3-5 minutes

**Watch the build:**
- Go to: https://console.cloud.google.com/cloud-build/builds
- See your build running in real-time
- Wait for the ✅ green checkmark

**Your changes are live!**

---

## 🎛️ Useful Cloud Console Pages (Bookmark These!)

### Main Dashboard
https://console.cloud.google.com/home/dashboard

### Cloud Run Services (Your App)
https://console.cloud.google.com/run

### Build History (Monitor Deployments)
https://console.cloud.google.com/cloud-build/builds

### Build Triggers (Automation)
https://console.cloud.google.com/cloud-build/triggers

### Domain Mappings
https://console.cloud.google.com/run → Click your service → "Manage Custom Domains"

### Logs (Troubleshooting)
https://console.cloud.google.com/logs

### Billing (Check Costs)
https://console.cloud.google.com/billing

---

## 📊 Understanding Your Dashboard

### Cloud Run Service Details

When you click your service, you'll see:

**Metrics Tab:**
- Request count
- Request latency
- Container instances
- Memory usage

**Revisions Tab:**
- All your deployments
- Can roll back to previous versions
- Traffic splitting options

**Logs Tab:**
- Application logs
- Error messages
- Access logs

**Triggers Tab:**
- Connected GitHub repository
- Auto-deploy settings

---

## 🔒 Security & Permissions (Optional)

### Make Your App Private

If you want to restrict access to specific people:

1. **Go to:** https://console.cloud.google.com/run
2. **Click** your service
3. **Click "PERMISSIONS" tab** at the top
4. **Find "allUsers"** in the principals list
5. **Click the trash icon** to remove it
6. **Click "ADD PRINCIPAL"**
7. **Enter email:** user@company.com
8. **Select role:** Cloud Run Invoker
9. **Click "SAVE"**

Now only those users can access the app (they'll need to sign in with Google).

---

## 💰 Monitor Your Costs

### Check Your Spending

1. **Go to:** https://console.cloud.google.com/billing
2. **Click** "Reports" in the left menu
3. **See** your spending breakdown
4. **Set alerts** if spending exceeds a threshold

**Expected cost:** $0-3/month (usually free tier is enough)

---

## 🆘 Troubleshooting

### Build Failed?

1. **Go to:** https://console.cloud.google.com/cloud-build/builds
2. **Click** on the failed build
3. **Read the error message**

**Common issues:**

#### Error: "service_account is specified... logging options"
This is a logging configuration error. **Two quick fixes:**

**Fix A - Edit the Trigger (Easiest):**
1. Go to: https://console.cloud.google.com/cloud-build/triggers
2. Click on your trigger name
3. Scroll to "Logging" section
4. Change to: **"Cloud Logging only"**
5. Click "SAVE"
6. Try running again

**Fix B - Already Fixed in Code:**
- Your latest `cloudbuild.yaml` includes the fix
- Just pull the latest code from GitHub
- The trigger will use the updated config automatically

#### Error: "cloudbuild.yaml not found"
**Solution:** Make sure `cloudbuild.yaml` is in the root of your repository
- Check GitHub: https://github.com/YOUR_USERNAME/birdeye-pricing-calculator
- Look for `cloudbuild.yaml` in the file list

#### Error: "Permission denied"
**Solution:**
1. Go to: https://console.cloud.google.com/iam-admin/iam
2. Find "Cloud Build Service Account"
3. Click "Edit" (pencil icon)
4. Add roles:
   - Cloud Run Admin
   - Service Account User
5. Click "Save"

#### Error: "Billing not enabled"
**Solution:** Enable billing at https://console.cloud.google.com/billing/linkedaccount

### Deployment Succeeded but App Won't Load?

1. **Check logs:** https://console.cloud.google.com/logs
2. **Filter by:** Cloud Run → birdeye-pricing
3. **Look for** error messages

### Domain Not Working?

1. **Check DNS records** are correct in your domain registrar
2. **Wait 30 minutes** for DNS propagation
3. **Use this tool:** https://dnschecker.org
   - Enter your domain
   - Should show the CNAME pointing to Google

### App is Slow?

1. **Go to:** https://console.cloud.google.com/run
2. **Click** your service → "EDIT & DEPLOY NEW REVISION"
3. **Change settings:**
   - Memory: 512 MiB (instead of 256)
   - CPU: 1 (or 2 for better performance)
   - Min instances: 1 (keeps app warm)
4. **Click "DEPLOY"**

---

## 🎓 Understanding Cloud Run

### What is Cloud Run?

Cloud Run is a **serverless platform** that:
- Runs your app in a container
- Scales automatically (0 to 1000+ instances)
- Only charges when app is running
- Provides HTTPS automatically
- Handles load balancing

### Your App Architecture

```
GitHub (Code)
    ↓
Cloud Build (Builds Docker image)
    ↓
Container Registry (Stores image)
    ↓
Cloud Run (Runs your app)
    ↓
Your Domain → Users see your app
```

### Scaling

- **Min instances: 0** (saves money, but cold starts)
- **Max instances: 100** (handles traffic spikes)
- Each instance can handle multiple requests
- Scales up/down automatically based on traffic

---

## 📈 Advanced Features (Optional)

### Set Up Staging Environment

Create a separate service for testing:

1. **Create another Cloud Build trigger**
   - Name: `deploy-staging`
   - Branch: `^staging$`
2. **Create a `staging` branch** in GitHub
3. **Push to staging** to test changes before production

### Monitor Performance

1. **Go to:** https://console.cloud.google.com/run
2. **Click** your service → **Metrics** tab
3. **See:**
   - Request count
   - Response times
   - Error rates
   - Container utilization

### Set Up Alerts

1. **Go to:** https://console.cloud.google.com/monitoring/alerting
2. **Click "CREATE POLICY"**
3. **Set conditions:**
   - Metric: Cloud Run request count
   - Condition: Above/below threshold
4. **Add notification:** Email, SMS, etc.
5. **Save**

---

## 🎉 You're All Set!

### What You've Done:
✅ Created Google Cloud account  
✅ Set up a project  
✅ Connected GitHub  
✅ Enabled auto-deployment  
✅ Deployed your app  
✅ (Optional) Connected custom domain  

### Your Workflow Now:
1. Make code changes
2. Commit to GitHub: `git push`
3. Wait 3-5 minutes
4. App updates automatically!

### Useful Links:
- **Your App:** https://console.cloud.google.com/run
- **Build History:** https://console.cloud.google.com/cloud-build/builds
- **Logs:** https://console.cloud.google.com/logs
- **Billing:** https://console.cloud.google.com/billing

---

## 💡 Pro Tips

1. **Bookmark** the Cloud Console pages you use often
2. **Check logs** if something isn't working
3. **Monitor costs** weekly (though it's usually free)
4. **Test locally first** before pushing to GitHub
5. **Use meaningful commit messages** to track deployments

---

**Need help?** Everything is visual in the Cloud Console - just click around and explore! 🚀

