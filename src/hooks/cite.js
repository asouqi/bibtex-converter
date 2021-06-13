import { useEffect, useState} from "react";
import {ConvertToBibItem, ConvertToXML} from "../utilities/bib_converter";
import {xmlFormatter} from "../utilities/xml_formatter";
import {CSL} from "../utilities/csl";

export default (input, format, style) => {
    const [outputText, setOutputText] = useState(undefined)
    const [outputError, setOutputError] = useState(false)
    const [outputLoading, setOutputLoading] = useState(false)

    useEffect(() => {
        if (input.length > 1){
        (async () => {
            await import(/* webpackChunkName: "citation-js" */'@citation-js/plugin-bibtex');
            await import(/* webpackChunkName: "citation-js" */'@citation-js/plugin-ris');
            await import(/* webpackChunkName: "citation-js" */'@citation-js/plugin-csl');
            const {Cite, plugins} = await import(/* webpackChunkName: "citation-js" */'@citation-js/core');

            if (style !== 'apa' && style !== 'harvard'){
                const cslPlugin = plugins.config.get('@csl')
                const csl =  CSL[style] && CSL[style] || localStorage.getItem(style)
                cslPlugin.templates.add(style, csl)
            }

            const cite = Cite(input,{ format: 'string'})
            try {
                switch (format){
                    case 'BIB': {
                        const jsonBibtex = JSON.parse(cite.format('data'))
                        const bibitem = ConvertToBibItem(jsonBibtex)
                        setOutputLoading(false)
                        setOutputError(false)
                        setOutputText(bibitem)
                        break
                    }
                    case 'XML': {
                        const jsonBibtex = JSON.parse(cite.format('data'))
                        const xml = ConvertToXML(jsonBibtex)
                        setOutputLoading(false)
                        setOutputError(false)
                        setOutputText(xmlFormatter(xml))
                        break
                    }
                    case 'PDF':
                    case 'TXT':
                    case 'CIT':
                    case 'RIS':
                    case 'HTML':
                    case 'WORD': {
                        const output = cite.format(((format === 'RIS' && 'ris') || (format === 'CIT' && 'citation') || 'bibliography'), {
                            format: (format === 'TXT' && 'text') || 'html',
                            template: style,
                            lang: 'en-US'
                        })
                        setOutputLoading(false)
                        setOutputError(false)
                        setOutputText(output)
                        break
                    }
                    default: {
                        break
                    }
                }
            }catch (e) {
                setOutputText('')
                setOutputError(true)
                setOutputLoading(false)
            }
        })().catch(() => {
            setOutputText('')
            setOutputError(true)
            setOutputLoading(false)
        });
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
