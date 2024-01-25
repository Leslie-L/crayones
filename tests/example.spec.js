// @ts-check
const { test, expect } = require('@playwright/test');

test('Pacifiko', async ({ page }) => {
  await page.goto('https://www.pacifiko.com/compras-en-linea/crayon-de-madera-faber-castell-supersoft-100-colores-8x2&pid=MjM0NTNmZW');
  //chequiar el precio 
  const priceBox = await page.locator('.product_page_price span').first().textContent();
  console.log('Precio:',priceBox?.trim())
  const available = await page.locator('.product_page_price .model ');
  const res = await available.textContent()
  console.log('Disponible:',res?.trim()) 
  
});

test('Artist.com', async ({ page }) => {
  await page.goto('https://artist.com.gt/en/products/crayon-faber-castell-supersoft-100-colores');
  //chequiar el precio 
  const priceBox = await page.locator('#ProductSection-product-template').getByRole('definition').textContent();
  console.log('Precio:',priceBox?.trim())
  const available = await page.locator('#ProductSection-product-template dl .price__badges span[aria-hidden=true]');
  let res = await available.textContent()
  res = res?.trim()==='Sale'?'Sin Existencia':'Disponibles';
  console.log('Disponible:',res) 
  
});

test('Treinta.shop', async ({ page }) => {
  const api= 'https://api.prod.treinta.co/shop/products/list/?limit=15&page=1&storeId=d1972880-f8b7-4107-91d5-49f18bb92b34&search=faber%20castell%20super%20soft%20100%20colores&filter=withDiscountVisible&category=Faber%20Castell%20'
  await page.goto('https://treinta.shop/helostoregt');
  await page.waitForURL('https://treinta.shop/helostoregt')
  //Buscar producto
  await page.getByPlaceholder('Buscar producto...').fill('faber castell super soft 100 colores');
  await page.keyboard.press('Enter');
  //esperar a la api
  await new Promise(resolve => setTimeout(resolve, 2000));

  const list = await page.locator('ul li')
  const price = await list.locator('a div >> nth=3').textContent();
  console.log('Precio:',price)
  const available = await list.getByText('Producto no disponible').isVisible();
  if(available){
    console.log('Disponible:','Sin existencia')
  }else{
    console.log('Disponible:','Disponibles')
  }

});
test('scrap_and_more', async ({ page }) => {
  await page.goto('https://www.scrapandmore.com/product-page/crayones-de-madera-faber-castell-supersoft-100-colores');
  const price = await page.locator('span[data-hook=formatted-primary-price]').textContent();
  console.log('Precio:',price)

  const available = await page.locator('button[data-hook=add-to-cart]').textContent();
  if(available==='Agregar al carrito'){
    console.log('Disponible:','Disponibles')
  }else{
    console.log('Disponible:','Sin existencia')
  }

});
test.only('Platino', async ({ page }) => {
  await page.goto('https://platino.com.gt/?s=CRAYON+DE+MADERA+FABER+CASTELL+SUPERSOFT+100+COL');
  const title = await page.locator('h1').textContent()
  if(title!=='No se encontraron productos'){
    const price = await page.locator('.item-price').textContent();
    console.log('Precio:',price?.trim())
    console.log('Disponible:','Disponibles')
  }else{
    console.log('Precio:','No info')
    console.log('Disponible:','Sin existencia')
  }

});