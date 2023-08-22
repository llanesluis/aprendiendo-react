// @ts-check
import { test, expect } from '@playwright/test';

const LOCALHOST_URL = 'http://localhost:5173/';
const LINK_PREV = 'https://cataas.com/cat/says/';

test('app shows a fact and an image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph');
  const img = await page.getByRole('img');

  const textContent = await text.textContent();
  const imageSrc = await img.getAttribute('src');

  await expect(textContent?.length).toBeGreaterThan(0);
  await expect(imageSrc?.startsWith(LINK_PREV)).toBeTruthy;
});
