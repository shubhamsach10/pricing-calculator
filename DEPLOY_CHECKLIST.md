# ✅ Google Cloud Deployment Checklist

**For UI-driven deployment** (no terminal needed!)

Print this or keep it open while following `CLOUD_CONSOLE_GUIDE.md`

---

## Part 1: Google Cloud Account
- [ ] Go to https://cloud.google.com
- [ ] Click "Get started for free"
- [ ] Sign in with Google account
- [ ] Enter credit card details
- [ ] Verify you got $300 free credit

---

## Part 2: Create Project
- [ ] Go to https://console.cloud.google.com
- [ ] Click "Select a project" dropdown
- [ ] Click "NEW PROJECT"
- [ ] Name: `Birdeye Pricing Calculator`
- [ ] Click "CREATE"
- [ ] Wait for project to be created
- [ ] **Verify project is selected** in top dropdown

---

## Part 3: Enable APIs
- [ ] Go to https://console.cloud.google.com/apis/library
- [ ] Search and enable: **Cloud Run API**
- [ ] Search and enable: **Cloud Build API**
- [ ] Search and enable: **Container Registry API**

---

## Part 4: Connect GitHub
- [ ] Go to https://console.cloud.google.com/cloud-build/triggers
- [ ] Click "CONNECT REPOSITORY"
- [ ] Select "GitHub (Cloud Build GitHub App)"
- [ ] Authorize Google Cloud Build
- [ ] Select your repository: `birdeye-pricing-calculator`
- [ ] Click "CONNECT"
- [ ] Click "SKIP FOR NOW"

---

## Part 5: Create Build Trigger
- [ ] Go to https://console.cloud.google.com/cloud-build/triggers
- [ ] Click "CREATE TRIGGER"
- [ ] Name: `deploy-pricing-calculator`
- [ ] Event: "Push to a branch"
- [ ] Branch: `^main$`
- [ ] Configuration: "Cloud Build configuration file"
- [ ] Location: `/cloudbuild.yaml`
- [ ] Click "CREATE"

---

## Part 6: First Deployment
- [ ] Find your trigger in the list
- [ ] Click "RUN" button (three dots menu)
- [ ] Click "RUN TRIGGER"
- [ ] Go to: https://console.cloud.google.com/cloud-build/builds
- [ ] Watch the build progress (3-5 minutes)
- [ ] Wait for green checkmark ✅

---

## Part 7: Access Your App
- [ ] Go to https://console.cloud.google.com/run
- [ ] Click on service: `birdeye-pricing`
- [ ] Copy the URL (looks like: `https://birdeye-pricing-xxxxx-uc.a.run.app`)
- [ ] Open URL in browser
- [ ] **🎉 Your app is live!**

---

## Part 8: Connect Domain (Optional)
- [ ] Go to https://console.cloud.google.com/run
- [ ] Click your service
- [ ] Click "MANAGE CUSTOM DOMAINS" tab
- [ ] Click "ADD MAPPING"
- [ ] Enter your domain: `pricing.yourdomain.com`
- [ ] Copy the DNS records Google provides
- [ ] Log in to your domain registrar (GoDaddy, Namecheap, etc.)
- [ ] Add the DNS records
- [ ] Wait 15-30 minutes for DNS propagation
- [ ] Check domain mapping status shows "Active"
- [ ] Visit your custom domain
- [ ] **🎉 Custom domain works!**

---

## Future Updates (Automatic!)

Every time you make changes:
- [ ] Edit code locally
- [ ] Test with: `npm run dev`
- [ ] Commit: `git add . && git commit -m "message"`
- [ ] Push: `git push`
- [ ] Wait 3-5 minutes
- [ ] **✅ Changes automatically deploy!**

Check build progress at: https://console.cloud.google.com/cloud-build/builds

---

## 📌 Important URLs to Bookmark

| What | URL |
|------|-----|
| Cloud Console | https://console.cloud.google.com |
| Cloud Run (Your App) | https://console.cloud.google.com/run |
| Build History | https://console.cloud.google.com/cloud-build/builds |
| Build Triggers | https://console.cloud.google.com/cloud-build/triggers |
| Logs | https://console.cloud.google.com/logs |
| Billing | https://console.cloud.google.com/billing |

---

## 🆘 Quick Troubleshooting

**Build failed?**
- Check: https://console.cloud.google.com/cloud-build/builds
- Click failed build to see error
- See CLOUD_CONSOLE_GUIDE.md troubleshooting section

**App won't load?**
- Check logs: https://console.cloud.google.com/logs
- Filter by: Cloud Run → birdeye-pricing

**Domain not working?**
- Wait 30 minutes for DNS
- Check DNS with: https://dnschecker.org
- Verify records in your domain registrar

**Need help?**
- Full guide: `CLOUD_CONSOLE_GUIDE.md`
- Has detailed solutions for all issues

---

## ✨ That's It!

You now have:
- ✅ Production app on Google Cloud
- ✅ Automatic deployments from GitHub
- ✅ Custom domain (optional)
- ✅ ~$0-3/month cost (free tier covers most of it)

**Enjoy your pricing calculator! 🚀**

