import { useState, useEffect, useRef } from "react";
import jsQR from "jsqr";
import { QRCodeCanvas } from "qrcode.react";


export const useQRCode = (uuid: string, isUsed: boolean) => {
  const [scannedUUID, setScannedUUID] = useState<string | null>(null);
  const [isScanned, setIsScanned] = useState(isUsed);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const generateQRCode = () => {
    return <QRCodeCanvas value={uuid} size={100} />;
  };

  const startScanner = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment" },
    });

    if (videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      scanQRCode();
    }
  };

  const scanQRCode = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const scan = () => {
      if (videoRef.current && videoRef.current.readyState === videoRef.current.HAVE_ENOUGH_DATA) {
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = ctx?.getImageData(0, 0, canvas.width, canvas.height);
        const code = imageData ? jsQR(imageData.data, canvas.width, canvas.height) : null;

        if (code) {
          setScannedUUID(code.data);
          setIsScanned(true);
        } else {
          requestAnimationFrame(scan);
        }
      } else {
        requestAnimationFrame(scan);
      }
    };

    scan();
  };

  return { generateQRCode, isScanned, scannedUUID, startScanner, videoRef };
};
