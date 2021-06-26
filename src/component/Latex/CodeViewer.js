import React, {useCallback, useContext} from 'react';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
import {BibTexContext} from "../DocumentEditor";

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
            onChange={onCodeChange}
        />
    </div>
}