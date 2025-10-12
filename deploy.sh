#!/bin/bash

# StatuscodeCheck.com Deployment Script
# This script rebuilds and deploys the website to S3

set -e

echo "🔨 Building Tailwind CSS..."
npm run build:css

echo "📤 Uploading files to S3..."
aws s3 sync . s3://statuscodecheck.com \
  --exclude "node_modules/*" \
  --exclude "src/*" \
  --exclude ".git/*" \
  --exclude "bucket-policy.json" \
  --exclude "package*.json" \
  --exclude "tailwind.config.js" \
  --exclude "deploy.sh" \
  --cache-control "public, max-age=3600" \
  --delete

echo "✅ Deployment complete!"
echo "📍 S3 Website URL: http://statuscodecheck.com.s3-website-us-east-1.amazonaws.com"
echo ""
echo "⏳ If you've set up CloudFront, invalidate the cache with:"
echo "   aws cloudfront create-invalidation --distribution-id YOUR_ID --paths '/*'"
