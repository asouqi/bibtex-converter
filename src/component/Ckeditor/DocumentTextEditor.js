import './style.css'
import React, {useContext, useCallback} from 'react';
import {toolbar, colors, fontSize} from "./CkeditorConfig";

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {BibTexContext} from "../DocumentEditor";

export default () => {
  const {html, setHtml} = useContext(BibTexContext)

  const onTextChange = useCallback( ( event, editor ) => {
    const data = editor.getData();
    setHtml(data)
  },[setHtml]);

  return <>
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
            editor={ ClassicEditor }
            data={html}
            config={{
              licenseKey: 'GPL',
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