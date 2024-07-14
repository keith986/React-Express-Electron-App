import React from 'react'
import QrScanner from 'qr-scanner';
import { useEffect, useRef, useState } from 'react';
import './QRScanner.css';

const QRScanner = (props) => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState('');

  useEffect(() => {
    const video = videoElementRef.current;
    const qrScanner = new QrScanner(
                      video,
                      (result) => {
                       //console.log('decoded qr code:', result);
                       setScannedText(result.data);
                      },
                      {
                       returnDetailedScanResult: true,
                       highlightScanRegion: true,
                       highlightCodeOutline: true,
                       }
                                 );

    qrScanner.start();

    return () => {
      //console.log(qrScanner);
      qrScanner.stop();
      qrScanner.destroy();
    };
  }, []);

  // const qrScanner = new QrScanner(videoElement, (result) =>
  //   console.log('decoded qr code:', result)
  // );

  return (
    <>
      <div className="videoWrapper">
        <video className="qrVideo" ref={videoElementRef} />
      </div>
      <p className="scannedText">SCANNED: <span id='scannedtext'>{scanned}</span></p>
    </>
  );
};

export default QRScanner;
