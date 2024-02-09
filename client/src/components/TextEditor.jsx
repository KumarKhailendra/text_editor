import React, { useRef } from "react";
import { useEffect } from "react";
import Editor from "./Editor";


const TextEditor = ({ updateValue, value, selected, cssvalue, updatecssValue, jsvalue, updatejsValue }) => {

  const dark = true;

  const refS = useRef(null);
  const refSide = useRef(null);

  useEffect(() => {
    const resizeableEle = refS.current;
    const refOutEle = refSide.current;
    const styles = window.getComputedStyle(resizeableEle);
    let width = parseInt(styles.width, 10);
    let x = 0;

    resizeableEle.style.top = "0";
    resizeableEle.style.left = "0";

    const onMouseMoveTopResize = (e) => {
      const dx = e.clientX - x;
      x = e.clientX;
      width = width + dx;
      resizeableEle.style.width = `${width}px`;
    };
    const onMouseUpTopResize = (e) => {
      document.removeEventListener("mousemove", onMouseMoveTopResize);
    };

    const onMouseDownTopResize = (e) => {
      x = e.clientX;
      resizeableEle.style.left = styles.left;
      resizeableEle.style.top = null;
      document.addEventListener("mousemove", onMouseMoveTopResize);
      document.addEventListener("mouseup", onMouseUpTopResize);
    };
    refOutEle.addEventListener("mousedown", onMouseDownTopResize);
    return () => {
      refOutEle.removeEventListener("mousedown", onMouseDownTopResize);
    };
  }, []);

  const handleTextEditorChangeValueWithLunguage = (e, type) => {
      if(type==="html" || type === "HTML"){
        updateValue(e);
      }else if(type === "css" || type === "CSS"){
        updatecssValue(e);
      }else if(type === "javascript" || type === "JS"){
        updatejsValue(e);
      }else{
        return;
      }
  }

  const editors= [
    {
      mode: "html",
      type: "HTML",
      value: value
    },
    {
      mode: "css",
      type: "CSS",
      value: cssvalue
    },
    {
      mode: "javascript",
      type: "JS",
      value: jsvalue
    }
    ]
 
  return (
    <div ref={refS} className="text-editor-container">
      <div ref={refSide} className="resizer"></div>
      {
        editors.map((editor,index)=>(
          selected === editor.type && (
            <Editor
              key={index}
              mode={editor.mode}
              dark={dark}
              onChange={(e) => {
                handleTextEditorChangeValueWithLunguage(e, editor.type);
              }}
              value={editor.value}
            />
          )
        ))
      }
    </div>
  );
};

export default TextEditor;
