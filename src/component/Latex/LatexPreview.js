import React, {useContext} from 'react';
import './style.css'
import {useEffect, useRef} from "react";
import {BibTexContext} from "../DocumentEditor";
import latexParser from "../../utilities/latex_parser";

export const LatexPreview = () => {
    const iframeRef = useRef()
    const {html} = useContext(BibTexContext)

    useEffect( () => {
        compile(html, iframeRef.current)
    }, [])

    return <div className={'d-flex'}>
        <iframe id="preview" ref={iframeRef} width={'100%'} height={'500px'} frameBorder={'0'} sandbox="allow-same-origin allow-scripts"/>
    </div>
}

let scrollY = 0

const links = () => {
    const as = document.getElementsByTagName("a")
    for (let i = 0; i < as.length; i++) {
        if (as[i].getAttribute("href").startsWith("#")) {
            as[i].addEventListener("click", function(ev) {
                ev.preventDefault()
                const target = ev.target.getAttribute("href").substr(1)
                const te = document.getElementById(target)
                document.scrollingElement.scrollTop = offsetTop(te)
            })
        }
    }
}

const definedOrElse = (value, fallback) => (typeof value !== "undefined" ? value : fallback);

const excerpt = (txt, o) => {
    let l = txt.length;
    let b = o - 20; if (b < 0) b = 0;
    let e = o + 20; if (e > l) e = l;
    let hex = function (ch) {
        return ch.charCodeAt(0).toString(16).toUpperCase();
    };
    let extract = function (txt, pos, len) {
        return txt.substr(pos, len)
            .replace(/\\/g,   "\\\\")
            .replace(/\x08/g, "\\b")
            .replace(/\t/g,   "\\t")
            .replace(/\n/g,   "\\n")
            .replace(/\f/g,   "\\f")
            .replace(/\r/g,   "\\r")
            .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(ch) { return "\\x0" + hex(ch); })
            .replace(/[\x10-\x1F\x80-\xFF]/g,    function(ch) { return "\\x"  + hex(ch); })
            .replace(/[\u0100-\u0FFF]/g,         function(ch) { return "\\u0" + hex(ch); })
            .replace(/[\u1000-\uFFFF]/g,         function(ch) { return "\\u"  + hex(ch); });
    };
    return {
        prolog: extract(txt, b, o - b),
        token:  extract(txt, o, 1),
        epilog: extract(txt, o + 1, e - (o + 1))
    };
}

const errorMessage = (e, noFinalNewline) => {
    const l = e.location;
    const prefix1 = "line " + e.line + " (column " + e.column + "): ";
    let prefix2 = "";
    for (let i = 0; i < prefix1.length + l.prolog.length; i++)
        prefix2 += "-";
    return prefix1 + l.prolog + l.token + l.epilog + "\n" +
        prefix2 + "^" + "\n" +
        e.message + (noFinalNewline ? "" : "\n");
}

/**
 * compile latex input into iframe
 * @param latex
 * @param iframe
 */
async function compile(latex, iframe) {
    const doc = iframe.contentDocument

    try {
        const latexDoc = await latexParser(latex)

        const linkScript = latexDoc.createElement('script')
        linkScript.text = 'document.addEventListener("DOMContentLoaded", ' + links.toString() + ')'
        latexDoc.head.appendChild(linkScript)

        const katex = doc.createElement('link')
        katex.type = 'text/css'
        katex.rel  = 'stylesheet'
        katex.href = '/css/katex.css'

        const article = doc.createElement('link')
        article.type = 'text/css'
        article.rel  = 'stylesheet'
        article.href = '/css/article.css'

        const base = doc.createElement('script')
        base.src = '/js/base.js'

        latexDoc.head.appendChild(katex)
        latexDoc.head.appendChild(article)
        latexDoc.head.appendChild(base)

        if (doc.head.innerHTML === latexDoc.head.innerHTML) {
            const newBody = doc.adoptNode(latexDoc.body)
            doc.documentElement.replaceChild(newBody, doc.body)
            doc.documentElement.style.cssText = latexDoc.documentElement.style.cssText
        } else {
            iframe.srcdoc = latexDoc.documentElement.outerHTML
        }
        if (scrollY) {
            iframe.contentWindow.scrollTo(0, scrollY)
            scrollY = 0
        }
    } catch (e) {
        if (!scrollY)
            scrollY = iframe.contentWindow.pageYOffset

        if (e.name === 'SyntaxError') {
            const error = {
                line:     definedOrElse(e.location.start.line, 0),
                column:   definedOrElse(e.location.start.column, 0),
                message:  e.message,
                found:    definedOrElse(e.found, ""),
                expected: definedOrElse(e.expected, ""),
                location: excerpt(latex, definedOrElse(e.location.start.offset, 0))
            };
            doc.body.innerHTML = '<pre class="error">ERROR: Parsing failure:\n\n' + errorMessage(error, true) + '</pre>'
        } else {
            doc.body.innerHTML = '<pre class="error">ERROR: ' + e.message + '</pre>'
        }
    }
}