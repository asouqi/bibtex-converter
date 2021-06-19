import { useEffect, useState} from "react";
import {ConvertToXML} from "../utilities/bib_converter";
import {xmlFormatter} from "../utilities/xml_formatter";
import {CSL} from "../utilities/csl";
import Worker from "./bibtex.worker";

export default (input, format, style) => {
    const [outputText, setOutputText] = useState(undefined)
    const [outputError, setOutputError] = useState(false)
    const [outputLoading, setOutputLoading] = useState(false)
    const worker = new Worker('./hooks/bibtex.worker.js')

    useEffect(() => {
        if (input.length > 1 && format){
          const csl =  CSL[style] && CSL[style] || localStorage.getItem(style)

          worker.postMessage({input,format,style, csl})
          setOutputLoading(true)

          worker.onerror = () => {
              setOutputLoading(false)
              setOutputError(true)
              setOutputText('')
          }

          worker.onmessage = (e) => {
              const {output, error} = e.data
              if (error){
                  setOutputLoading(false)
                  setOutputError(true)
                  setOutputText('')
              } else {
                  setOutputLoading(false)
                  setOutputError(false)
                  if (format === 'XML'){
                      const xml = ConvertToXML(output)
                      setOutputText(xmlFormatter(xml))
                  } else {
                      setOutputText(output)
                  }
                  ga('send', {
                      hitType: 'event',
                      eventCategory: 'Output',
                      eventAction: `To ${format}`,
                  });
              }
          }
        } else {
            setOutputText('')
            setOutputLoading(false)
            setOutputError(false)
        }
    },[input, format, style])

    return{
        outputLoading,
        outputError,
        outputText
    }
}
