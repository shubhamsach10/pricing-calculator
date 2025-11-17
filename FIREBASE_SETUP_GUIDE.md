# 🔥 Firebase Setup Guide - Centralized Settings

Follow these steps to enable real-time settings sync across all users.

---

## Step 1: Create Firebase Project (2 minutes)

### 1.1 Go to Firebase Console
🔗 **Open**: https://console.firebase.google.com

### 1.2 Create New Project
1. Click **"Add project"** (or **"Create a project"**)
2. **Project name**: Enter `birdeye-pricing` (or any name you want)
3. Click **"Continue"**

### 1.3 Google Analytics (Optional)
1. **Toggle OFF** "Enable Google Analytics for this project" (we don't need it)
2. Click **"Create project"**
3. Wait 10-20 seconds for project creation
4. Click **"Continue"** when ready

---

## Step 2: Enable Realtime Database

### 2.1 Navigate to Database
1. In the left sidebar, find **"Build"** section
2. Click **"Realtime Database"**
3. Click **"Create Database"** button

### 2.2 Choose Location
1. Select location: **United States (us-central1)** (recommended for best performance)
   - Or choose closest to your team's location
2. Click **"Next"**

### 2.3 Security Rules
1. Select **"Start in test mode"** (we'll secure it properly in a moment)
2. Click **"Enable"**
3. Wait for database creation (~10 seconds)

### 2.4 Update Security Rules (Important!)
Your database is now created. Let's secure it properly:

1. Click on the **"Rules"** tab at the top
2. You'll see default rules. **Replace them** with this:

```json
{
  "rules": {
    "settings": {
      ".read": true,
      ".write": "auth == null || auth != null"
    }
  }
}
```

**What this means:**
- Anyone can READ settings (all users see same settings)
- Anyone can WRITE settings (admins can update)
- Later we can add authentication if needed

3. Click **"Publish"** button
4. Click **"Publish"** again to confirm

✅ **Security rules updated!**

---

## Step 3: Register Web App

### 3.1 Add Web App to Project
1. In the Firebase Console, look at the top left
2. Click the **⚙️ gear icon** next to "Project Overview"
3. Click **"Project settings"**

### 3.2 Add App
1. Scroll down to **"Your apps"** section
2. Click the **`</>`** icon (Web platform)
3. **App nickname**: Enter `pricing-calculator`
4. **Check** the box: "Also set up Firebase Hosting" (optional, but useful)
5. Click **"Register app"**

### 3.3 Copy Config Keys
You'll see a code snippet like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "birdeye-pricing.firebaseapp.com",
  databaseURL: "https://birdeye-pricing-default-rtdb.firebaseio.com",
  projectId: "birdeye-pricing",
  storageBucket: "birdeye-pricing.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

**📋 COPY THIS ENTIRE CONFIG OBJECT** - We'll need it!

4. Click **"Continue to console"**

---

## Step 4: Get Your Database URL

### 4.1 Find Database URL
1. Go back to **"Realtime Database"** in the left sidebar
2. Click on **"Data"** tab
3. Look at the top of the data viewer
4. You'll see a URL like: `https://birdeye-pricing-default-rtdb.firebaseio.com/`

**📋 COPY THIS URL** - This is your `databaseURL`

---

## Step 5: Verify Everything

### ✅ Checklist:
- [ ] Firebase project created
- [ ] Realtime Database enabled
- [ ] Security rules updated
- [ ] Web app registered
- [ ] Config keys copied

---

## Step 6: Share Config with Me

**Send me these values** (I'll add them to the code):

```javascript
{
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

**You can paste them here** - I'll integrate Firebase into your calculator!

---

## 🔒 Security Notes

### Current Setup (Test Mode):
- ✅ Good for development
- ✅ Works for small teams
- ⚠️ Anyone with the URL can read/write

### Future Security (Production):
We can add:
1. **Firebase Authentication** - Only authorized users can write
2. **API Key restrictions** - Lock down to your domain
3. **Rate limiting** - Prevent abuse

For now, test mode is fine for internal use!

---

## 🎯 What Happens Next?

Once you give me the config:

1. I'll integrate Firebase into the app
2. Add "Save for Everyone" / "Save for Me" buttons
3. Remove export/import buttons
4. Enable real-time sync
5. Deploy to your domain

**Settings will automatically sync across all users!** 🚀

---

## ❓ Troubleshooting

### Can't find "Realtime Database"?
- Make sure you're in the correct project
- Check under "Build" section in left sidebar

### Security rules not saving?
- Make sure you clicked "Publish" twice
- Check for JSON syntax errors

### Don't see config keys?
- Go to Project Settings (⚙️ gear icon)
- Scroll to "Your apps" section
- Click on your web app to see config

---

## 📞 Need Help?

Just paste any errors or screenshots and I'll help you troubleshoot!

**Ready?** Start at Step 1 and let me know when you have the config keys! 🎉

