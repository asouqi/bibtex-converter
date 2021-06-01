import React, { useCallback, useRef, useState} from "react";
import {FormatGroup} from "./Format/FormatGroup";
import {TextEditor} from "./TextEditor";
import UseCite from '../hooks/cite'
import {jsPDF} from "jspdf";

import {FormatLabel} from "./Format/FormatLabel";
import {FormatEncoder} from "./Format/FormatEncoder";
import {ConversionControls} from "./ConversionControls";

export const Citation = (props) => {
  const editorRef = useRef()
  const uploadRef = useRef()

  const [format, setFormat] = useState(undefined)
  const [innerText, setInnerText] = useState('')
  const [style, setStyle] = useState('apa')
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadError, setUploadError] = useState(false)
  const [fileName, setFileName] = useState('untitled')

  const {outputText, outputError, outputLoading} = UseCite(innerText,format, style)

  const onTextChangeHandler = useCallback((event) => setInnerText(event.target.innerText), [])

  const onClearClickHandler = useCallback(() => {
      editorRef.current.innerText = ''
      uploadRef.current.value = null
      setInnerText('')
      setUploadProgress(0)
      setUploadError(false)
  },[])

  const onFileUpload = useCallback((event) => {
      const file = event.target.files[0]
      // eslint-disable-next-line no-undef
      const fileReader = new FileReader()

      fileReader.onload = () => {
          editorRef.current.innerText = ''
          setInnerText(fileReader.result)
      }

      fileReader.onprogress = (e) => setUploadProgress(Math.round((e.loaded * 100) / e.total))

      fileReader.onerror = () => setUploadError(true)

      fileReader.readAsText(file)
  },[])

  const onDownloadClickHandler = useCallback((event) => {
      if (format && innerText.length > 1 && !outputError){
          if (format === 'PDF'){
              const element = document.getElementsByClassName('output-viewer')[0].cloneNode(true);
              element.style.width = '648px';
              element.style.padding = '12px';

              const doc = new jsPDF('p', 'px', 'a4')
              doc.html(element, {
                  callback: function (doc) {
                      doc.setFontSize(12)
                      doc.save(fileName);
                  },
                  html2canvas: {
                      scale: 0.65
                  },
                  x: 25,
                  y: 50,
              })
          } else {
              const link = document.createElement('a');
              link.href = `data:${FormatEncoder[format].fileType};charset=UTF-8,` + escape(outputText);
              link.download = `${fileName}.${FormatEncoder[format].name}`;
              link.click();
          }
      }
  },[format, outputText, fileName, innerText, outputError])

  const handleOnStyleClick = useCallback((event) => setStyle(event.target.id),[])

  const onFileNameChange = useCallback((event) => setFileName(event.target.value), [setFileName])

  const onClipboardClick = useCallback((event) => {
      if (outputText && outputText.length > 1 && !outputError) {
          const toast = document.getElementById("snackbar");
          toast.className = "show";
          (async () =>{ await navigator.clipboard.writeText(outputText)})()
          setTimeout(function(){
              toast.className = toast.className.replace("show", "");
          }, 3000);
      }
  },[outputText, outputError])

  return(
      <div className="container-fluid py-5">
          <FormatGroup format={format} setFormat={setFormat}/>

          {format && <FormatLabel format={format}/>}

          <TextEditor editorRef={editorRef} format={format} onTextChangeHandler={onTextChangeHandler}/>

          {/* Upload Handler */}
          <div className="mb-3 py-3">
              {format && <label htmlFor="formFile" className="form-label">You could also upload .bib or .json file for converting to {FormatEncoder[format].text}:</label>}
              <input ref={uploadRef} className="form-control" type="file" id="formFile" onChange={onFileUpload}/>
              {uploadProgress > 0 && uploadProgress < 100 && (
                  <div className="progress" style={{marginTop: '10px'}}>
                      <div className="progress-bar" role="progressbar" style={{width: `${uploadProgress}%`}} aria-valuenow="25"
                           aria-valuemin="0" aria-valuemax="100">{uploadProgress}%
                      </div>
                  </div>
              )}
              {uploadProgress === 100 && (
                  <span className="badge bg-success" style={{marginTop: '10px'}}>Uploaded</span>
              )}
              {uploadError && (<span className="badge bg-danger">Unable to upload your file</span>)}
          </div>

          {/* Conversion Control */}
         <ConversionControls onDownloadClickHandler={onDownloadClickHandler}
                             onClearClickHandler={onClearClickHandler}
                             onFileNameChange={onFileNameChange}
                             onClipboardClick={onClipboardClick}
         />

          {/*  Output Viewer  */}
          {outputLoading && (
              <div className="spinner-grow text-info" role="status">
                  <span className="visually-hidden">Loading...</span>
              </div>
          )}
          {outputError && (<span className="badge bg-danger">sorry we are unable to convert your input ⚠️</span>)}
          {outputText && outputText.length > 1 && (
              <div>
                  <div className="h-100 bg-light">
                      <h6>Citation Style/Templates</h6>
                      <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                          <input checked={style === 'apa'} type="checkbox" className="btn-check" id="apa" autoComplete="off"
                                 onClick={handleOnStyleClick}/>
                          <label className="btn btn-outline-primary" htmlFor="apa">apa</label>

                          <input checked={style === 'harvard1'} type="checkbox" className="btn-check" id="harvard1" autoComplete="off"
                                 onClick={handleOnStyleClick}/>
                          <label className="btn btn-outline-primary" htmlFor="harvard1">harvard</label>

                          <input checked={style === 'ieee'} type="checkbox" className="btn-check" id="ieee" autoComplete="off"
                                 onClick={handleOnStyleClick}/>
                          <label className="btn btn-outline-primary" htmlFor="ieee">ieee</label>
                      </div>
                  </div>
              <div className="h-100 bg-light py-4">
                  <h6>Conversion Result</h6>
                  <div className="h-100 p-5 bg-light border rounded-3" style={{position: 'relative', left: -1}}>
                    <div className={'output-viewer'} dangerouslySetInnerHTML={{ __html: outputText }} />
                  </div>
              </div>
              </div>
          )}
      </div>
  )
}
