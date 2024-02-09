import React, { useState, useEffect } from "react";
import { Hook, Console, Decode, Unhook } from "console-feed";
import SplitPane from "components/SplitPane/SplitPane";

const WebViewer = ({ webTemplate }) => {
    const [contentRef, setContentRef] = useState(null);

    const useFrameObject = () => {
        const [logs, setLogs] = useState([]);
        const frameData = contentRef?.contentWindow?.console;
        useEffect(() => {
            function grabConsoleData() {
                console.log("grab console data", frameData);
                if (frameData) {
                    Hook(frameData, (log) =>
                        setLogs((curLogs) =>
                            log[0].data.length ? [...curLogs, Decode(log)] : [...curLogs]
                        )
                    );
                    console.log("hook ran now unhook");
                    return () => Unhook(contentRef);
                }
            }

            // For some reason the loop will not run unless this function is called but is always a undefined value so I have it called as a unused varible
            // eslint-disable-next-line
            let foundLog = frameData?.feed?.pointers.log();
            console.log("add"); // To keep track of when event listener is added
            document
                .getElementById("webPreviewFrame")
                .addEventListener("load", grabConsoleData);

            grabConsoleData();

            return () => {
                console.log("remove");// To keep track of when the event listener is removed
                document
                    .getElementById("webPreviewFrame")
                    .removeEventListener("load", grabConsoleData);
            };
        }, [frameData]); // If I have a dependency array it never catches logs, without it logs appear in logs state but endless loop
        console.log("return logs", logs);
        return logs;
    };
};

export default WebViewer;