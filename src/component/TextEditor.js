import React from "react";


export const TextEditor = ({editorRef, format, onTextChangeHandler}) => {

    return (
        <div ref={editorRef} datatype={format} className="py-1" spellCheck="false"
             onInput={onTextChangeHandler} contentEditable="true" style={{height: '400px',border: '1px solid #888', overflowY: 'auto'}}>
        </div>
    )
}
