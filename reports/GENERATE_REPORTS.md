# How to Generate Accessibility Reports

## 1. Lighthouse JSON Report

### Option A: Chrome DevTools (Manual Export)
```bash
# 1. Start your app
cd /Users/ranga/projects/blood-test/client
npm start

# 2. Open Chrome DevTools (Cmd+Option+I)
# 3. Go to Lighthouse tab
# 4. Check "Accessibility" only
# 5. Click "Analyze page load"
# 6. Once complete, click the gear icon → "Save as JSON"
# 7. Save as: reports/lh-accessibility.json
```

### Option B: CLI (Automated)
```bash
# Install Lighthouse globally (one-time)
npm install -g lighthouse

# Start your app first
cd /Users/ranga/projects/blood-test/client
npm start

# In another terminal, run:
cd /Users/ranga/projects/blood-test
lighthouse http://localhost:3000 \
  --only-categories=accessibility \
  --output=json \
  --output-path=./reports/lh-accessibility.json
```

---

## 2. Screenshots to Capture

### A. Lighthouse Score Screenshot
1. Run Lighthouse in DevTools
2. Wait for results
3. Take screenshot of the **entire report** showing:
   - 98/100 score
   - Date/time stamp
   - List of passed audits
4. Save as: `reports/screenshots/lighthouse-score.png`

### B. Contrast Before/After
**Before (use git):**
```bash
# Checkout the commit before contrast fixes
git stash
git checkout [commit-before-contrast-fix]

# Start app and screenshot the red text (#f87171)
# Use Chrome DevTools Color Picker to show 2.93:1 ratio
```
Save as: `reports/screenshots/contrast-before.png`

**After (current version):**
```bash
# Return to current version
git checkout master
git stash pop

# Screenshot the updated red text (#dc2626)
# Show Chrome DevTools Color Picker with 4.53:1 ratio
```
Save as: `reports/screenshots/contrast-after.png`

### C. Focus Indicators
1. Navigate site with Tab key
2. Screenshot a focused button/link showing the blue outline
3. Save as: `reports/screenshots/focus-indicators.png`

### D. ARIA Labels
1. Open Chrome DevTools → Elements tab
2. Select an icon button (cart, user account)
3. Show the HTML with aria-label attribute
4. Save as: `reports/screenshots/aria-labels.png`

---

## 3. Quick Screenshots Guide

### Contrast Check Steps:
1. Open page with text
2. Right-click text → Inspect
3. In Styles panel, click the color square next to `color: #dc2626`
4. Contrast ratio appears at the bottom of color picker
5. Screenshot showing:
   - The text on page
   - DevTools color picker
   - Contrast ratio: 4.53 (✓ AA)

### Focus Indicator Steps:
1. Press Tab key several times
2. Screenshot when focus is on a button showing the blue outline
3. Bonus: Screenshot the CSS in DevTools showing:
   ```css
   button:focus {
     outline: 2px solid #3b82f6;
     outline-offset: 2px;
   }
   ```

---

## 4. Package Everything

Once you have all files:
```bash
cd /Users/ranga/projects/blood-test

# Check what you have
ls -la reports/
ls -la reports/screenshots/

# Commit everything
git add reports/
git commit -m "docs: add accessibility audit reports and evidence

- Lighthouse 98/100 accessibility score
- Manual testing documentation
- Contrast before/after screenshots
- Focus indicator examples
- ARIA implementation screenshots"

git push origin master
```

---

## Quick Checklist

Before you commit, make sure you have:
- [ ] `reports/lh-accessibility.json` (or screenshot)
- [ ] `reports/screenshots/lighthouse-score.png`
- [ ] `reports/screenshots/contrast-before.png`
- [ ] `reports/screenshots/contrast-after.png`
- [ ] `reports/screenshots/focus-indicators.png`
- [ ] `reports/screenshots/aria-labels.png`
- [ ] `reports/README.md`
- [ ] `reports/TEST_STEPS.md`
- [ ] `ACCESSIBILITY_REPORT.md` (already created)

---

## What to Reference in Email

```
Evidence attached in GitHub repo:
- Lighthouse report: /reports/lh-accessibility.json
- Test documentation: /reports/TEST_STEPS.md
- Screenshots: /reports/screenshots/
```

