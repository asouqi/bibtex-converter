import {ConvertToBibItem} from "../utilities/bib_converter";

async function convertBibtex(input, format, style, csl) {
    await import(/* webpackChunkName: "citation-js" */'@citation-js/plugin-bibtex');
    await import(/* webpackChunkName: "citation-js" */'@citation-js/plugin-ris');
    await import(/* webpackChunkName: "citation-js" */'@citation-js/plugin-csl');
    const {Cite, plugins} = await import(/* webpackChunkName: "citation-js" */'@citation-js/core');

    if (style !== 'apa' && style !== 'harvard'){
        const cslPlugin = plugins.config.get('@csl')
        cslPlugin.templates.add(style, csl)
    }

    const cite = Cite(input,{ format: 'string'})
        switch (format){
            case 'BIB': {
                const jsonBibtex = JSON.parse(cite.format('data'))
                return ConvertToBibItem(jsonBibtex)
            }
            case 'XML': {
                return JSON.parse(cite.format('data'))
            }
            case 'PDF':
            case 'TXT':
            case 'CIT':
            case 'RIS':
            case 'HTML':
            case 'WORD': {
                return cite.format(((format === 'RIS' && 'ris') || (format === 'CIT' && 'citation') || 'bibliography'), {
                    format: (format === 'TXT' && 'text') || 'html',
                    template: style,
                    lang: 'en-US'
                })
            }
            default: {
                break
            }
        }
}

onmessage = (e) => {
    const {input, format, style, csl} = e.data
    convertBibtex(input, format, style, csl).then(((output) => {
        postMessage({output})
    })).catch(() => {
        postMessage({error: true})
    })
}