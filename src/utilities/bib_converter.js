export const ConvertToBibItem = (bibtexs) => {
    let bibitem = ''

    const getAuthors = (authors) => authors.map(author => {
        const {family, given} = author
        if (family && given){
            return `${capitalize(family)}, ${given.charAt(0).toUpperCase()}.`
        }
        return given ? capitalize(given) : family && capitalize(family) || ''
    })

    bibtexs.map((bibtex) => {
        const { id, title, author, issued } = bibtex

        bibitem+= `\\bibitem{${id}}`

        const authors = getAuthors(author)
        if (authors.length === 1){
            bibitem+= `${authors[0]} ${title}. `
        } else {
            bibitem+= authors.slice(0,-1).join(', ') + ' \& ' + authors.slice(-1)[0] + ` ${title}. `
        }

        const journal = bibtex['container-title']
        if (journal){
            const {volume, page, issue} = bibtex

            bibitem+= `{\\em ${journal.split(' ').map((_ => capitalize(_))).join(' ')}}.`

            if (volume) {
                bibitem+= ` \\textbf{${volume}}`
            }
            if (page) {
                bibitem+= issue ? `, ${page}` : ` pp. ${page}`
            }
            if (issued && issued['date-parts'] && issued['date-parts'].length > 0) {
                bibitem+= ` (${issued['date-parts'].toString()})`
            }
        }

        const publisher = bibtex['publisher']
        if (!journal && publisher){
            bibitem+= (issued && issued['date-parts']) && `(${publisher},${issued['date-parts'].toString()})` || `(${publisher})`
        }

        if (issued && issued['date-parts'] && issued['date-parts'].length > 0 &&  !publisher && !journal){
            bibitem+= ` (${issued['date-parts'].toString()})`
        }

        const url = bibtex['URL']
        if (url && url !== publisher){
            bibitem+= `, ${url}`
        }

        const note = bibtex['note']
        if (note) {
            bibitem+= `, ${note}`
        }
        bibitem+= '\n'
    })
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