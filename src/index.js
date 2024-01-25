const { chromium } = require('playwright');
const { test, expect } = require('@playwright/test');
const respuesta ={}
async function scraping() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  //Pacifiko
  await page.goto('https://www.pacifiko.com/compras-en-linea/crayon-de-madera-faber-castell-supersoft-100-colores-8x2&pid=MjM0NTNmZW');
  const priceBox = await page.locator('.product_page_price span').first().textContent();
  const available = await page.locator('.product_page_price .model ');
  const res = await available.textContent()
  
  respuesta['Pacifiko']={
    'precio':priceBox?.trim(),
    'Disponible':res?.trim()
  }

  //Artist.com
  await page.goto('https://artist.com.gt/en/products/crayon-faber-castell-supersoft-100-colores');
  //chequiar el precio 
  const priceBox2 = await page.locator('#ProductSection-product-template').getByRole('definition').textContent();
  const available2 = await page.locator('#ProductSection-product-template dl .price__badges span[aria-hidden=true]');
  let res2 = await available2.textContent()
  res2 = res2?.trim()==='Sale'?'Sin Existencia':'Disponibles';
  respuesta['Artist.com']={
    'precio':priceBox2?.trim(),
    'Disponible':res2?.trim()
  }

  //TREINTA SHOP
  await page.goto('https://treinta.shop/helostoregt');
  await page.waitForURL('https://treinta.shop/helostoregt')
  //Buscar producto
  await page.getByPlaceholder('Buscar producto...').fill('faber castell super soft 100 colores');
  await page.keyboard.press('Enter');
  //esperar a la api
  await new Promise(resolve => setTimeout(resolve, 2000));
  const list = await page.locator('ul li')
  const price3 = await list.locator('a div >> nth=3').textContent();
  const available3 = await list.getByText('Producto no disponible').isVisible();
  
  respuesta['TREINTA SHOP']={
    'precio':price3?.trim(),
    'Disponible':available3?'Sin Existencia':'Disponibles'
  }
 //scrap_and_more
 await page.goto('https://www.scrapandmore.com/product-page/crayones-de-madera-faber-castell-supersoft-100-colores');
  const price4 = await page.locator('span[data-hook=formatted-primary-price]').textContent();
  let available4 = await page.locator('button[data-hook=add-to-cart]').textContent();
  if(available4==='Agregar al carrito'){
    available4='Disponibles'
  }else{
    available4='Sin Existencia'
  }
  respuesta['Scrap and more']={
    'precio':price4?.trim(),
    'Disponible':available4
  }

 //Platino
 await page.goto('https://platino.com.gt/?s=CRAYON+DE+MADERA+FABER+CASTELL+SUPERSOFT+100+COL');
 const title = await page.locator('h1').textContent()
 if(title!=='No se encontraron productos'){
   const price5 = await page.locator('.item-price').textContent();
   respuesta['Platino']={
    'precio':price5.trim(),
    'Disponible':"Disponibles"
  }
 }else{
    respuesta['Platino']={
        'precio':'Sin Info',
        'Disponible':"No disponibles"
      }
 }


  console.log(respuesta)
  await browser.close();
};
scraping();