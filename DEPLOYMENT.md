# Status Code Check - Live Deployment Info

## Live URL
https://statuscodecheck.com

## Production Infrastructure

### S3 Bucket (PRODUCTION)
- **Bucket Name:** `statuscodecheck.com`
- **Purpose:** Production website hosting (static S3 website)
- **Files:** Multiple HTML files and assets
- **Last Updated:** October 13, 2025

### CloudFront Distribution
- **Distribution ID:** `E1CYARDGQLEQVQ`
- **Origin:** `statuscodecheck.com.s3-website-us-east-1.amazonaws.com` (S3 website endpoint)
- **Domain:** statuscodecheck.com

### Design
- **Primary Color:** Hot Pink (#ec4899)
- **Primary Dark:** Deep Pink (#db2777)
- **Background:** Light Gray (#f9fafb)
- **Navbar:** White with gray border, hot pink logo/title, clean minimal design
- **Hero Section:** Vibrant hot pink gradient background (#ec4899 → #db2777) with white text, NO white space
- **Features:**
  - Complete HTTP status code reference (1xx, 2xx, 3xx, 4xx, 5xx)
  - Search functionality for all status codes
  - Category browsing with colored cards
  - Links to detailed status code pages
  - Integration with URL Status Checker

## Recent Fixes (October 13, 2025)
1. ✅ Completely redesigned to match SnapIT brand (polls, forum, etc.)
2. ✅ Removed ALL white space - gradient hero goes directly after navbar
3. ✅ Changed navbar from black to clean white with gray borders
4. ✅ Added vibrant gradient hero section like other SnapIT apps
5. ✅ Updated all colors to proper hot pink (#ec4899) from forum
6. ✅ Changed background to light gray (#f9fafb) to match brand
7. ✅ Made buttons use gradient instead of solid colors
8. ✅ Added floating animation to hero title
9. ✅ Made design fun, exciting, and modern
10. ✅ CTA section now uses gradient background instead of dashed border

## Current Layout
- **Navbar:** White background, hot pink logo/title, minimal gray borders
- **Hero:** Full-width gradient section (#ec4899 → #db2777) with white text, search bar, NO spacing
- **Categories:** 6 colored cards (1xx-5xx, FAQ, Blog) with hover effects
- **Footer:** Black with hot pink hover links for all SnapIT products

## Deployment Commands
```bash
# Upload to production
aws s3 cp index.html s3://statuscodecheck.com/index.html --cache-control "no-cache, no-store, must-revalidate" --content-type "text/html"

# Invalidate CloudFront
aws cloudfront create-invalidation --distribution-id E1CYARDGQLEQVQ --paths "/*"
```

## Last Deploy
- **Date:** October 13, 2025 - 11:51 PM
- **Changes:**
  * **ICON SIZE FIX** - Increased all category card icons from text-3xl to text-5xl
  * Icon containers enlarged from 64px (w-16 h-16) to 80px (w-20 h-20)
  * Icons now highly visible and prominent on all devices
  * All 6 category cards updated: 1xx, 2xx, 3xx, 4xx, 5xx, FAQ, Blog
  * Material Icons properly displaying with white color on colored backgrounds
- **Status:** ✅ Live - icons now clearly visible and prominent

## Previous Deploy - October 13, 2025 - 11:44 PM
- **Changes:**
  * Complete responsive redesign - works perfectly on all devices
  * Simplified hero: "HTTP Status Code Directory" - clean and SEO-friendly
  * Compact cards with consistent sizing (p-4 sm:p-6)
  * Mobile-first with sm:, md: breakpoints throughout
  * Tighter spacing (gap-4 sm:gap-6, py-8 sm:py-12)
  * Improved conversion with prominent CTA
  * All colors match SnapIT brand (#ec4899, #db2777)
  * Fast loading, optimized, easy to use on any screen size
