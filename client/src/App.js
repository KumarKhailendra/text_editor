import { useState } from "react";
import "./App.css";
import CodeOutput from "./components/CodeOutput";
import TextEditor from "./components/TextEditor";

function App() {
  const [value, updateValue] = useState("");
  const [cssvalue, updatecssValue] = useState("");
  const [jsvalue, updatejsValue] = useState("");

  const [preview, setPreview] = useState("");
  const [csspreview, updatecssPreview] = useState("");
  const [jspreview, updatejsPreview] = useState("");

  const [selected, updateSelected] = useState("HTML");

  const handleOnclickValueChangePreview = () => {
    setPreview(value);
    updatecssPreview(cssvalue);
    updatejsPreview(jsvalue);

  }


  return (
    <>
      <div className="nav-bar">
        <div className="editor-controlers">
        <select
          className={`dropdown`}
          value={selected}
          style={{"padding": "6px 2px", "border": "none", "borderRadius": "4px", "backgroundColor": "#f1f1f1", "width": "200px", "height":"90%", "marginRight":"10px"}}
          onChange={(e) => {
            updateSelected(e.target.value);
          }}
        >
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="JS">JS</option>
        </select>
        <button style={{"backgroundColor": "#04AA6D", "border": "none", "color": "white", "padding": "7px 16px", "textAlign": "center", "fontSize": "16px", "cursor":"pointer"}} onClick={handleOnclickValueChangePreview}>Run</button>
        </div>
        <div className="logo">
          <h3>Learn<span>Time</span></h3>
        </div>
      </div>
      <div className="container">
        <TextEditor
          updateValue={updateValue}
          value={value}
          selected={selected}
          cssvalue={cssvalue}
          updatecssValue={updatecssValue}
          jsvalue={jsvalue}
          updatejsValue={updatejsValue}
        />
        <CodeOutput preview={preview} cssvalue={csspreview} jsvalue={jspreview} />
      </div>
    </>
  );
}

export default App;
