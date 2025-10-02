const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const websiteUrl = 'https://luigitaxiat.netlify.app/de';
const outputDir = path.join(__dirname, '..', 'public', 'qr');
const outputFile = path.join(outputDir, 'luigi-taxi-qr.png');
const outputFileSvg = path.join(outputDir, 'luigi-taxi-qr.svg');

// Create directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Generate QR Code as PNG with high quality
QRCode.toFile(outputFile, websiteUrl, {
  errorCorrectionLevel: 'H',
  type: 'png',
  width: 1024,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, (err) => {
  if (err) {
    console.error('Error generating PNG QR code:', err);
  } else {
    console.log(`✅ QR Code PNG saved to: ${outputFile}`);
  }
});

// Generate QR Code as SVG for scalability
QRCode.toFile(outputFileSvg, websiteUrl, {
  errorCorrectionLevel: 'H',
  type: 'svg',
  width: 1024,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, (err) => {
  if (err) {
    console.error('Error generating SVG QR code:', err);
  } else {
    console.log(`✅ QR Code SVG saved to: ${outputFileSvg}`);
  }
});

// Generate QR Code with Luigi Taxi branding
QRCode.toFile(path.join(outputDir, 'luigi-taxi-qr-branded.png'), websiteUrl, {
  errorCorrectionLevel: 'H',
  type: 'png',
  width: 1024,
  margin: 4,
  color: {
    dark: '#1a1a1a',
    light: '#FFFFFF'
  }
}, (err) => {
  if (err) {
    console.error('Error generating branded QR code:', err);
  } else {
    console.log(`✅ Branded QR Code saved to: ${path.join(outputDir, 'luigi-taxi-qr-branded.png')}`);
  }
});

// Also create a data URL for embedding
QRCode.toDataURL(websiteUrl, {
  errorCorrectionLevel: 'H',
  type: 'image/png',
  width: 512,
  margin: 2,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, (err, url) => {
  if (err) {
    console.error('Error generating data URL:', err);
  } else {
    // Save data URL to a JSON file for easy import
    const dataFile = path.join(outputDir, 'qr-data.json');
    fs.writeFileSync(dataFile, JSON.stringify({
      url: websiteUrl,
      dataUrl: url,
      generated: new Date().toISOString()
    }, null, 2));
    console.log(`✅ QR Code data URL saved to: ${dataFile}`);
  }
});

console.log(`
📱 QR Code Generation Complete!
================================
Website: ${websiteUrl}
Output directory: ${outputDir}

Generated files:
- luigi-taxi-qr.png (high resolution PNG)
- luigi-taxi-qr.svg (scalable vector)
- luigi-taxi-qr-branded.png (with branding colors)
- qr-data.json (data URL for embedding)

You can now:
1. Print these QR codes on business cards
2. Display them on marketing materials
3. Add them to your website
4. Share them on social media
`);