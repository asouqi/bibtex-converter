import React from "react";


const placeholder = " @ARTICLE{smit54,\n" +
    "    \tAUTHOR = {J. G. Smith and H. K. Weston},\n" +
    "    \tTITLE = {Nothing Particular in this Year's History},\n" +
    "    \tYEAR = {1954},\n" +
    "    \tJOURNAL = {J. Geophys. Res.},\n" +
    "    \tVOLUME = {2},\n" +
    "    \tPAGES = {14-15}\n" +
    "    }"

export const TextEditor = ({editorRef, format, onTextChangeHandler}) => {

    return (
        <textarea ref={editorRef} datatype={format} className="py-1" spellCheck="false"
             onInput={onTextChangeHandler}
             style={{minHeight: '210px', width: '100%',border: '1px solid #888', overflowY: 'auto'}}
             placeholder={placeholder}
        >
        </textarea>
    )
}
