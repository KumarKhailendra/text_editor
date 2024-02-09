import React from "react";
import AceEditor from "react-ace";
// import "ace-builds/src-noconflict/theme-chaos";
// import "ace-builds/src-noconflict/theme-github";
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/ext-language_tools';

const ace = require("ace-builds/src-noconflict/ace");
ace.config.set(
  "basePath",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/"
);
ace.config.setModuleUrl(
  "ace/mode/javascript_worker",
  "https://cdn.jsdelivr.net/npm/ace-builds@1.4.3/src-noconflict/worker-javascript.js"
);

export default function Editor(data) {
  return (
    AceEditor && (
      <AceEditor
        mode={data.mode}
        width="100%"
        height="100%"
        theme={"monokai"}
        onChange={data.onChange}
        fontSize={20}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={data.value}
        wrapEnabled={true}
        setOptions={{
          useWorker: false,
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          spellcheck: true,
          tabSize: 2
        }}
      />
    )
  );
}
