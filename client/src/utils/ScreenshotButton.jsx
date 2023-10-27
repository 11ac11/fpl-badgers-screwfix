import React, { useState, useEffect, useMemo } from 'react';
import html2canvas from 'html2canvas';

export const ScreenshotButton = ({contentRef, children}) => {
    const [isScreenshotCopied, setScreenshotCopied] = useState(false);

    const captureScreenshot = (contentRef) => {
        if (contentRef.current) {
          html2canvas(contentRef.current).then(function (canvas) {
            const imgData = canvas.toDataURL('image/png');

          // Create a temporary anchor element to copy the image as a Data URL
          const tempA = document.createElement('a');
          tempA.href = imgData;
          tempA.download = 'screenshot.png';
          tempA.style.display = 'none';

          document.body.appendChild(tempA);
          tempA.click();
          document.body.removeChild(tempA);

          setScreenshotCopied(true);
          });
        }
    }
    return (
    <>
        <button onClick={() => captureScreenshot(contentRef)}>Capture Screenshot</button>
        { isScreenshotCopied ? (
            <div>Screenshot has been copied to the clipboard.</div>
          ) : (
            children
        )}
    </>
    )
  };