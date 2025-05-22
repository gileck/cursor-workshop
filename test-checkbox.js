const { chromium } = require('@playwright/test');

async function testCheckboxToggle() {
  console.log('Starting test for checkbox toggle');
  
  // Launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Navigate to the app
  await page.goto('http://localhost:3000/todo-app');
  console.log('Page loaded');
  
  // Create a new todo
  await page.fill('input[placeholder="Add a new task..."]', 'Test Todo Item');
  await page.press('input[placeholder="Add a new task..."]', 'Enter');
  console.log('Added a new todo item');
  
  // Check that checkbox is not checked
  const checkboxBefore = await page.locator('.todo-checkbox').first();
  const isCheckedBefore = await checkboxBefore.isChecked();
  console.log('Initial checkbox state:', isCheckedBefore);
  
  // Try to check the checkbox
  await page.click('.todo-checkbox');
  console.log('Clicked on checkbox');
  
  // Check if checkbox state changed
  await page.waitForTimeout(1000);
  const checkboxAfter = await page.locator('.todo-checkbox').first();
  const isCheckedAfter = await checkboxAfter.isChecked();
  console.log('Checkbox state after click:', isCheckedAfter);
  
  if (isCheckedBefore === isCheckedAfter) {
    console.error('BUG: Checkbox state did not change after clicking');
  } else {
    console.log('SUCCESS: Checkbox state changed correctly');
  }
  
  // Close browser
  await browser.close();
}

testCheckboxToggle().catch(error => {
  console.error('Test failed:', error);
}); 