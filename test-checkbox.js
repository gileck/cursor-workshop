const { chromium } = require('@playwright/test');

async function testCheckboxToggle() {
  console.log('Starting test for checkbox toggle');
  
  // Запускаємо браузер
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Переходимо до додатку
  await page.goto('http://localhost:3000/todo-app');
  console.log('Page loaded');
  
  // Створюємо нове завдання
  await page.fill('input[placeholder="Add a new todo..."]', 'Test Todo Item');
  await page.press('input[placeholder="Add a new todo..."]', 'Enter');
  console.log('Added a new todo item');
  
  // Перевіряємо, що прапорець не відмічений
  const checkboxBefore = await page.locator('.todo-checkbox').first();
  const isCheckedBefore = await checkboxBefore.isChecked();
  console.log('Initial checkbox state:', isCheckedBefore);
  
  // Намагаємося позначити прапорець
  await page.click('.todo-checkbox');
  console.log('Clicked on checkbox');
  
  // Перевіряємо, чи змінився стан прапорця
  await page.waitForTimeout(1000);
  const checkboxAfter = await page.locator('.todo-checkbox').first();
  const isCheckedAfter = await checkboxAfter.isChecked();
  console.log('Checkbox state after click:', isCheckedAfter);
  
  if (isCheckedBefore === isCheckedAfter) {
    console.error('BUG: Checkbox state did not change after clicking');
  } else {
    console.log('SUCCESS: Checkbox state changed correctly');
  }
  
  // Закриваємо браузер
  await browser.close();
}

testCheckboxToggle().catch(error => {
  console.error('Test failed:', error);
}); 