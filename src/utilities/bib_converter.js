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
                    title = line.substring(line.indexOf('{') + 1, line.indexOf('}') + 1)
                } else if(line.startsWith('journal')) {
                    venue = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('volume')) {
                    volume = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('number')) {
                    number = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('pages')) {
                    pages = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('year')) {
                    year = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('publisher')) {
                    publisher = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('howpublished')) {
                    howpublished = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('note')) {
                    note = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
                }
                else if(line.startsWith('author')) {
                    authors = line.substring(line.indexOf('{') + 1, line.indexOf('}'))
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
            if (publisher.length > 0 && venue.length < 0){
                bibitem+= `(${publisher},${year})`
            }
            if (year.length > 0 && publisher.length < 0 && venue.length < 0){
                bibitem+= ` (${year})`
            }
            if (howpublished.length > 0){
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
        const {type, id, title, author, issued } = bibtex

        const bibitem = creatXMLNode('bibitem', [{name: 'type', value: type}])
        const label = creatXMLNode('label', [])
        const authors = creatXMLNode('author', [])
        const bibTitle = creatXMLNode('title', [])
        const year = creatXMLNode('year', [])

        if (type === 'book'){
            const publisher = creatXMLNode('publisher', []) //publisher
            publisher.innerHTML = bibtex['publisher']
            bibitem.appendChild(publisher)

            const address = creatXMLNode('address', []) //publisher-place
            address.innerHTML = bibtex['publisher-place']
            bibitem.appendChild(address)
        } else {
            const journal = creatXMLNode('journal', [])
            journal.innerHTML = bibtex['container-title']
            bibitem.appendChild(journal)

            const bibVolume = creatXMLNode('volume', [])
            bibVolume.innerHTML = bibtex.volume
            bibitem.appendChild(bibVolume)

            const bibPages = creatXMLNode('pages', [])
            bibPages.innerHTML = bibtex['page']
            bibitem.appendChild(bibPages)
        }

        label.innerHTML = id
        bibitem.appendChild(label)

        bibTitle.innerHTML = title
        bibitem.appendChild(bibTitle)

        author.map((author) => {
            const firstname = creatXMLNode('firstname', [])
            firstname.innerHTML = author.family
            authors.appendChild(firstname)

            const lastname = creatXMLNode('lastname', [])
            lastname.innerHTML = author['given']
            authors.appendChild(lastname)
            return author
        })
        bibitem.appendChild(authors)

        year.innerHTML = issued['date-parts'].toString()
        bibitem.appendChild(year)

       bibliography.documentElement.appendChild(bibitem)
       return bibtex
    })

    const xmlDoc = new XMLSerializer().serializeToString(bibliography.documentElement)
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?>" + xmlDoc
}
