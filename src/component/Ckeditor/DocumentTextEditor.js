import './style.css'
import React from 'react';
import {useCallback, useState} from "react";
import {ButtonGroup, CancelButton, CopyButton, DownloadButton} from "../Buttons";
import useClipboardClick from "../../hooks/clipboard";
import useDownloadClick from "../../hooks/download";
import {toolbar, colors, fontSize} from "./CkeditorConfig";

import CKEditor from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";
import {FormatLabel} from "../Format/FormatLabel";

export default ({value,format,fileName,setEdit}) => {
  const [html, setHtml] = useState(value)

  const onCancelClick = useCallback(() => setEdit(false),[setEdit])
  const onTextChange = useCallback( ( event, editor ) => {
    const data = editor.getData();
    setHtml(data)
  },[setHtml]);

  const onClipboardClick = useClipboardClick(html, format,false)
  const onDownloadClick = useDownloadClick(format, html, fileName, false)

  return <>
    <FormatLabel format={format} editorMessage={true}/>
    <ButtonGroup>
      <DownloadButton onDownloadClickHandler={onDownloadClick}/>
      <CopyButton onClipboardClick={onClipboardClick}/>
      <CancelButton onCancelClick={onCancelClick}/>
    </ButtonGroup>
    <div className="document-editor">
      <div className="document-editor__toolbar"/>
      <div className="document-editor__editable-container">
        <CKEditor
            onInit={ editor => {
              window.editor = editor;
              const toolbarContainer = document.querySelector( '.document-editor__toolbar' );
              toolbarContainer.appendChild( editor.ui.view.toolbar.element );
            }}
            onChange={onTextChange}
            editor={ DecoupledEditor }
            data={html}
            config={{
              fontSize,
              fontColor: { colors },
              fontBackgroundColor: { colors },
              toolbar
            }}
        />
      </div>
    </div>

    <div id="snackbar">Edited Conversion result copied to clipboard</div>
  </>
}