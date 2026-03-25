const sharp = require('./node_modules/sharp');

const charSrc = 'C:\\Users\\81908\\.gemini\\antigravity\\brain\\bb666910-41f8-4985-a93c-df21e3bbf6f3\\media__1774387061433.jpg';
const aynSrc  = 'C:\\Users\\81908\\.gemini\\antigravity\\brain\\bb666910-41f8-4985-a93c-df21e3bbf6f3\\media__1774387151463.png';

async function run() {
  // Character: crop upper 60%
  let m = await sharp(charSrc).metadata();
  const cropH = Math.round(m.height * 0.60);
  await sharp(charSrc)
    .extract({ left: 0, top: 0, width: m.width, height: cropH })
    .toFile('D:\\Antigravity\\seishun-ijouron\\char_akari.jpg');
  console.log('char done');

  // AYN icon: crop right ~35%
  m = await sharp(aynSrc).metadata();
  const left = Math.round(m.width * 0.63);
  const top  = Math.round(m.height * 0.04);
  const w    = m.width - left - Math.round(m.width * 0.02);
  const h    = Math.round(m.height * 0.92);
  await sharp(aynSrc)
    .extract({ left, top, width: w, height: h })
    .toFile('D:\\Antigravity\\seishun-ijouron\\ayn_icon.png');
  console.log('icon done');
}

run().catch(console.error);
