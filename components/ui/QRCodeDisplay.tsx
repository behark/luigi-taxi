'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Download, Share2, Printer } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface QRCodeDisplayProps {
  className?: string;
  showActions?: boolean;
}

export default function QRCodeDisplay({ className = '', showActions = true }: QRCodeDisplayProps) {
  const [selectedVersion, setSelectedVersion] = useState<'standard' | 'branded'>('standard');

  const qrCodePath = selectedVersion === 'standard'
    ? '/qr/luigi-taxi-qr.png'
    : '/qr/luigi-taxi-qr-branded.png';

  const downloadQRCode = () => {
    const link = document.createElement('a');
    link.href = qrCodePath;
    link.download = `luigi-taxi-qr-${selectedVersion}.png`;
    link.click();
  };

  const printQRCode = () => {
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Luigi Taxi QR Code</title>
            <style>
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                margin: 0;
                font-family: system-ui, -apple-system, sans-serif;
              }
              .container {
                text-align: center;
              }
              img {
                max-width: 400px;
                margin: 20px auto;
              }
              h1 {
                color: #333;
                margin-bottom: 10px;
              }
              p {
                color: #666;
                margin-top: 20px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>Luigi Taxi</h1>
              <img src="${window.location.origin}${qrCodePath}" alt="Luigi Taxi QR Code" />
              <p>Scan to visit: luigitaxiat.netlify.app</p>
            </div>
            <script>
              window.onload = () => {
                setTimeout(() => {
                  window.print();
                  window.close();
                }, 500);
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const shareQRCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Luigi Taxi',
          text: 'Visit Luigi Taxi website',
          url: 'https://luigitaxiat.netlify.app/de'
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText('https://luigitaxiat.netlify.app/de');
      alert('Website URL copied to clipboard!');
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold mb-2">Quick Access QR Code</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Scan to visit our website instantly
        </p>
      </div>

      {/* Version Selector */}
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setSelectedVersion('standard')}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            selectedVersion === 'standard'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Standard
        </button>
        <button
          onClick={() => setSelectedVersion('branded')}
          className={`px-3 py-1 rounded-md text-sm transition-colors ${
            selectedVersion === 'branded'
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          Branded
        </button>
      </div>

      {/* QR Code Image */}
      <div className="relative w-64 h-64 mx-auto mb-4 bg-white p-4 rounded-lg">
        <Image
          src={qrCodePath}
          alt="Luigi Taxi QR Code"
          fill
          className="object-contain"
        />
      </div>

      {/* Website URL */}
      <div className="text-center mb-4">
        <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
          luigitaxiat.netlify.app
        </p>
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={downloadQRCode}
            className="flex items-center gap-2"
          >
            <Download size={16} />
            Download
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={printQRCode}
            className="flex items-center gap-2"
          >
            <Printer size={16} />
            Print
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={shareQRCode}
            className="flex items-center gap-2"
          >
            <Share2 size={16} />
            Share
          </Button>
        </div>
      )}
    </div>
  );
}