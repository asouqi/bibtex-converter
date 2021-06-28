import React, {useCallback, useState} from "react";
import {FormatLabel} from "./Format/FormatLabel";
import {ButtonGroup, CancelButton, CopyButton, DownloadButton} from "./Buttons";
import useClipboardClick from "../hooks/clipboard";
import useDownloadClick from "../hooks/download";
import DocumentTextEditor from "./Ckeditor/DocumentTextEditor"
import { LatexEditor } from "./Latex/index"

export const BibTexContext = React.createContext('');

export default ({value,format,fileName,setEdit}) => {
    const [html, setHtml] = useState(value)
    const [latexDoc, setLatexDoc] = useState('')

    const onCancelClick = useCallback(() => setEdit(false),[setEdit])
    const onClipboardClick = useClipboardClick(html, format,false,'editor-clipboard')
    const onDownloadClick = useDownloadClick(format, html, fileName, false,'editor-download')

    return <BibTexContext.Provider value={{html,setHtml,latexDoc, setLatexDoc}}>
        <FormatLabel format={format} editorMessage={true}/>
        <ButtonGroup>
            <DownloadButton onDownloadClickHandler={onDownloadClick}/>
            <CopyButton onClipboardClick={onClipboardClick}/>
            <CancelButton onCancelClick={onCancelClick}/>
        </ButtonGroup>

        {format !== 'BIB' && (
            <DocumentTextEditor/>
        ) || (
            <LatexEditor/>
        )}

        <div id="snackbar">Edited Conversion result copied to clipboard</div>
    </BibTexContext.Provider>
}