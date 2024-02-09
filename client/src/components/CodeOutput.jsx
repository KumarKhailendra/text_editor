

import React, { useEffect, useRef, useState } from 'react'
import { Console, Decode, Hook, Unhook } from 'console-feed'

const CodeOutput = ({ preview, cssvalue, jsvalue }) => {

  const refTop = useRef(null);
  const refOut = useRef(null);
  const ref = useRef(null);
  const [logs, setLogs] = useState([])

  useEffect(() => {
    const resizeableEle = ref.current;
    const refOutEle = refOut.current;
    const styles = window.getComputedStyle(resizeableEle);

    let height = parseInt(styles.height, 10);

    let y = 0;

    resizeableEle.style.bottom = "0";
    resizeableEle.style.right = "0";

    const onMouseMoveTopResize = (e) => {
      const dy = e.clientY - y;
      y = e.clientY;
      height = height - dy;
      let outHeight = window.screen.height - height;
      if (height > 50) {

        refOutEle.style.height = `${outHeight}px`
        resizeableEle.style.height = `${height}px`;
      }
    }
    const onMouseUpTopResize = (e) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    }

    const onMouseDownTopResize = (e) => {
      y = e.clientY;
      resizeableEle.style.bottom = styles.bottom;
      resizeableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    }

    const resizerTop = refTop.current;
    resizerTop.addEventListener("mousedown", onMouseDownTopResize);

    return () => {
      resizerTop.removeEventListener("mousedown", onMouseDownTopResize);
    }
  }, []);

  useEffect(() => {
    const iframeDocument = refOut.current.contentDocument;
    const iframeConsole = refOut.current.contentWindow.console;


    iframeDocument.open();
    iframeDocument.write(`
    <html>
    <head>
    <style>${cssvalue}</style>
    </head>
    <body>${preview} <script>${jsvalue}</script></body>
    </html>
    `);
    iframeDocument.close();

    const updateLogs = (log) => setLogs((currLogs) => [...currLogs, Decode(log)]);
    const hookedConsole = Hook(iframeConsole.log, updateLogs, false);

    return () => Unhook(hookedConsole);
  }, [preview, cssvalue, jsvalue]);


  return (
    <div className='code-output-container'>
      <iframe title='output' ref={refOut} className='output-container' srcDoc={`
          <html>
            <head>
              <style>${cssvalue}</style>
            </head>
            <body>${preview} <script>${jsvalue}</script></body>
          </html>
        `}>
      </iframe>
      <div ref={ref} className='console-container'>
        <div ref={refTop} className='console-resizer'>
        </div>
        <Console logs={logs} variant="dark" />
      </div>
    </div>
  )
}

export default CodeOutput
// S-1-5-21-2283914877-414792472-1642471554-1001  