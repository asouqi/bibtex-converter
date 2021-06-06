export const ConvertToBibItem = (bibtex) => {
    let bibitem = ''
    const rows = bibtex.split('\n')
    let i = 0
    while (i < rows.length){
        const line = rows[i].trim()
        if (line.length <= 0) {
            i+= 1
        }
        if ('@' === line[0]){
            const code = line.substring(line.indexOf('{') + 1, line.length -1 )
            let title = '', venue = '',  volume = '', number = '', pages = '', year = '', publisher = '', howpublished = '', note = '', authors = ''
            const output_authors = []
            i += 1
            while (i < rows.length && !rows[i].includes('@')) {
                const line = rows[i].trim()
                if (line.startsWith('title')){
                    title = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                } else if(line.startsWith('journal')) {
                    venue = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('volume')) {
                    volume = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('number')) {
                    number = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('pages')) {
                    pages = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('year')) {
                    year = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('publisher')) {
                    publisher = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('howpublished')) {
                    howpublished = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('note')) {
                    note = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                }
                else if(line.startsWith('author') || line.startsWith('editor')) {
                    authors = line.substring(line.indexOf('{') + 1, line.lastIndexOf('}'))
                    // eslint-disable-next-line array-callback-return,no-loop-func
                    authors.split('and').map((LastFirst) => {
                        const lf = LastFirst.replace(/ /g, '').split(',')
                        if (lf.length !== 2){
                            output_authors.push(`${capitalize(authors)}`)
                        } else {
                            output_authors.push(`${capitalize(lf[0])}, ${lf[1].charAt(0).toUpperCase()}.`)
                        }
                    })
                }
                i+= 1
            }

            title = title.trim()
            venue = venue.trim()
            volume = volume.trim()
            number = number.trim()
            pages = pages.trim()
            year = year.trim()
            publisher = publisher.trim()
            howpublished = howpublished.trim()
            note = note.trim()
            authors = authors.trim()

            bibitem+= `\\bibitem{${code}}`

            if (output_authors.length === 1){
                bibitem+= `${output_authors[0]} ${title}. `
            } else {
                bibitem+= output_authors.slice(0,-1).join(', ') + ' & ' + output_authors.slice(-1)[0] + ` ${title}. `
            }

            if (venue.length > 0){
                bibitem+= `{\\em ${venue.split(' ').map((_ => capitalize(_))).join(' ')}}.`
               if (volume.length > 0) {
                   bibitem+= ` \\textbf{${volume}}`
               }
               if (pages.length > 0) {
                   bibitem+= number.length > 0 ? `, ${pages}` : ` pp. ${pages}`
               }
               if (year.length > 0) {
                   bibitem+= ` (${year})`
               }
            }
            if (publisher.length > 0 && venue.length < 1){
                bibitem+= `(${publisher},${year})`
            }
            if (year.length > 0 && publisher.length < 1 && venue.length < 1){
                bibitem+= ` (${year})`
            }
            if (howpublished.length > 1){
                bibitem+= `, ${howpublished}`
            }
            if (note.length > 0) {
                bibitem+= `, ${note}`
            }
            bibitem+= '\n'
        }
    }
    return bibitem
}

const capitalize = (input) => input.charAt(0).toUpperCase() + input.slice(1)

export const ConvertToXML = (bibtexs) => {
    const parser = new DOMParser();
    const bibliography = parser.parseFromString("<bibliography></bibliography>","text/xml");

    const creatXMLNode = (name, attributes) => {
        const newNode = bibliography.createElement(name);
        attributes.map(attribute => newNode.setAttribute(attribute.name, attribute.value))
        return newNode
    }

    bibtexs.map((bibtex) => {
        const setValueIfExist = (key, nodeName, object = bibtex, parent = bibitem) => {
            if (object[key]){
                const node = creatXMLNode(nodeName, [])
                node.innerHTML = encodeXML(object[key].toString())
                parent.appendChild(node)
            }
        }

        const {type, id, title, author, editor, issued } = bibtex

        const bibitem = creatXMLNode('bibitem', [{name: 'type', value: type}])
        const label = creatXMLNode('label', [])
        const authors = creatXMLNode('authors', [])
        const bibTitle = creatXMLNode('title', [])
        const year = creatXMLNode('year', [])

        // BOOK
        setValueIfExist('collection-title', 'series')
        setValueIfExist('publisher', 'publisher')
        setValueIfExist('publisher-place', 'address')
        setValueIfExist('edition', 'edition')

        if (type === 'paper-conference' || type === 'chapter'){
            setValueIfExist('container-title','booktitle')
        } else {
            setValueIfExist('container-title','journal')
        }
        setValueIfExist('volume','volume')
        setValueIfExist('issue','number')

        setValueIfExist('page','pages')
        setValueIfExist('language','language')

        if (type === 'chapter'){
            setValueIfExist('chapter-number','chapter')
        }

        label.innerHTML = id
        bibitem.appendChild(label)

        bibTitle.innerHTML = title
        bibitem.appendChild(bibTitle)

        if (author){
          author.map((auth) => {
            const nodeAuthor = creatXMLNode('author', [])
            setValueIfExist('family','firstname', auth, nodeAuthor)
            setValueIfExist('given','lastname', auth, nodeAuthor)
            authors.appendChild(nodeAuthor)
            return author
          })
          bibitem.appendChild(authors)
        }

        if (editor){
            const editors = creatXMLNode('editors', [])
            editor.map((edit) => {
                const nodeEditor = creatXMLNode('editor', [])
                setValueIfExist('family','firstname', edit, nodeEditor)
                setValueIfExist('given','lastname', edit, nodeEditor)
                editors.appendChild(nodeEditor)
                return editor
            })
            bibitem.appendChild(editors)
        }

        year.innerHTML = issued['date-parts'].toString()
        bibitem.appendChild(year)

        setValueIfExist('note', 'note')

       bibliography.documentElement.appendChild(bibitem)
       return bibtex
    })

    const xmlDoc = new XMLSerializer().serializeToString(bibliography.documentElement)
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + xmlDoc
}

const encodeXML = (data) => {
    const node = document.createElement('div');
    node.appendChild(document.createTextNode(data));
    return node.innerHTML;
}