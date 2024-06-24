Playwright

npm i --force 
npm init playwright@latest --force
npx playwright test
npx playwright test --project=chromium
npx playwright test --project=chromium --debug
npx playwright test --project=chromium --trace on
npx playwright test --project=chromium --ui
npx playwright test --project=chromium --headed
npx playwright test example.spec.ts --project=chromium
npx playwright test -g "has title" --project=chromium
