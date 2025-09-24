import React from 'react'
import CodeMirror from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';

const code = {
    'XML': 'XML',
    'WORD_XML': 'XML',
    'BIB': 'LaTex',
    'RIS': 'API',
}

export default ({format,value}) => {
    if (value.length > 1){
        return <div className={'d-flex'} style={{width: '100%', height: '500px', marginTop: '4px'}}>
            <CodeMirror
                value={value}
                height={"500px"}
                extensions={[EditorView.lineWrapping]}
                options={{
                    mode: code[format],
                    readOnly: true,
                    lineWrapping: true
                }}/>
        </div>
    } else{
        return <></>
    }
}