import { useState, useEffect, useRef } from 'react';
import * as QRCodeLib from 'qrcode';
import { Download, Share2, X } from 'lucide-react';

interface QRCodeProps {
  proofHash: string;
  featureName: string;
}

export function QRCode({ proofHash, featureName }: QRCodeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const shareUrl = `https://mignight-zkp-dapp.netlify.app/verify?hash=${proofHash}`;

  useEffect(() => {
    if (isOpen && !qrDataUrl) {
      QRCodeLib.toCanvas(canvasRef.current!, shareUrl, {
        width: 200,
        margin: 2,
        color: {
          dark: '#000000',
          light: '#ffffff'
        }
      }, (error) => {
        if (error) console.error(error);
      });

      QRCodeLib.toDataURL(shareUrl, {
        width: 200,
        margin: 2
      }, (error, url) => {
        if (error) console.error(error);
        if (url) setQrDataUrl(url);
      });
    }
  }, [isOpen, shareUrl, qrDataUrl]);

  const downloadQR = () => {
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = `${featureName}-proof.png`;
    link.click();
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-purple-100 text-purple-900 py-2 px-4 rounded-lg hover:bg-purple-200 transition-colors border border-purple-300"
      >
        <Share2 className="w-4 h-4" />
        Share Proof
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-900">Share {featureName} Proof</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex flex-col items-center mb-6">
          <div className="bg-white p-4 rounded-xl border-2 border-gray-200 mb-4">
            <canvas ref={canvasRef} className="w-[200px] h-[200px]" />
          </div>
          <p className="text-sm text-gray-600 text-center">
            Scan to verify {featureName} proof
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="text-xs text-gray-500 mb-1">Verification URL</div>
          <div className="text-xs text-gray-900 break-all font-mono">{shareUrl}</div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={downloadQR}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download QR
          </button>
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
            }}
            className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-900 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <Share2 className="w-4 h-4" />
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
}
