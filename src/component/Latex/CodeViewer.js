import React, {useCallback, useContext} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import '@uiw/codemirror-theme-sublime';
import '@uiw/codemirror-theme-monokai';
import {BibTexContext} from "../DocumentEditor";
import {EditorView} from "@codemirror/view";

export const LatexViewer = () => {
    const {html, setHtml} = useContext(BibTexContext)

    const onCodeChange = useCallback((editor) => setHtml(editor.getValue()), [setHtml])

    return <div className={'d-flex'} style={{width: '100%', height: '500px', marginTop: '4px'}}>
        <CodeMirror
            value={html}
            options={{
                theme: 'monokai',
                keyMap: 'sublime',
                mode: 'Latex',
                lineWrapping: true
            }}
            height={"500px"}
            extensions={[EditorView.lineWrapping]}
            onChange={onCodeChange}
        />
    </div>
}