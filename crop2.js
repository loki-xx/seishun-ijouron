const sharp = require('./node_modules/sharp');

const aynSrc = 'C:\\Users\\81908\\.gemini\\antigravity\\brain\\bb666910-41f8-4985-a93c-df21e3bbf6f3\\media__1774387151463.png';

async function run() {
  const m = await sharp(aynSrc).metadata();
  const w = Math.round(m.width * 0.6);
  await sharp(aynSrc)
    .extract({ left: 0, top: 0, width: w, height: m.height })
    .toFile('D:\\Antigravity\\seishun-ijouron\\ayn_logo_text.png');
  console.log('text logo done');
}

run().catch(console.error);
