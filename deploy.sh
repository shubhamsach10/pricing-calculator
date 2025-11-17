#!/bin/bash

# Birdeye Pricing Calculator - Deployment Script
# This script helps you deploy your app to Google Cloud Run

set -e

echo "🚀 Birdeye Pricing Calculator - Deployment"
echo "=========================================="
echo ""

# Check if gcloud is installed
if ! command -v gcloud &> /dev/null; then
    echo "❌ gcloud CLI is not installed."
    echo "📥 Please install it from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Get project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)

if [ -z "$PROJECT_ID" ]; then
    echo "❌ No Google Cloud project is set."
    echo "Please run: gcloud config set project YOUR_PROJECT_ID"
    exit 1
fi

echo "📦 Project: $PROJECT_ID"
echo ""

# Configuration
SERVICE_NAME="birdeye-pricing"
REGION="us-central1"
IMAGE_NAME="gcr.io/$PROJECT_ID/$SERVICE_NAME"

echo "🔨 Building Docker image..."
docker build -t $IMAGE_NAME:latest .

echo ""
echo "📤 Pushing image to Google Container Registry..."
docker push $IMAGE_NAME:latest

echo ""
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy $SERVICE_NAME \
    --image $IMAGE_NAME:latest \
    --platform managed \
    --region $REGION \
    --allow-unauthenticated \
    --memory 256Mi \
    --cpu 1 \
    --max-instances 10

echo ""
echo "✅ Deployment complete!"
echo ""

# Get the service URL
SERVICE_URL=$(gcloud run services describe $SERVICE_NAME --platform managed --region $REGION --format 'value(status.url)')

echo "🌐 Your app is live at:"
echo "   $SERVICE_URL"
echo ""
echo "📝 To map a custom domain, run:"
echo "   gcloud run domain-mappings create --service=$SERVICE_NAME --domain=your-domain.com --region=$REGION"
echo ""

