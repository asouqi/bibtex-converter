import React from "react";
import {NavBar} from './nav/NavBar'
import {Citation} from "./component/Citation";
import 'bootstrap/scss/bootstrap.scss'
import './fonts.css'

function App() {
  return (
    <div className="App">
      <div className="container py-4">
          {/* Nav */}
          <NavBar/>

          {/* Body */}
          <main className="p-3 mb-4 bg-light rounded-3">
              <Citation format={'Json'} datatype={'json'}/>
          </main>

          {/* Footer */}
          <footer>
                  <div className="alata-font h-100 p-5 bg-light border rounded-3">
                      <h3>Description</h3>
                      <p>This site converts a BibTex (*.json *.bib) file or text to a formatted Bibliography, with supports for a wide range of CSL style: (APA, Harvard, IEEE, Elsevier, Springer, ACM, ACS, MLA), and if you want to add a CSL style outside of this set you could click on the <b>Add Custom Style</b> button then enter style name with CSL code, this will be stored on your browser local storage.</p>
                      <p>
                          When you have an error and there no idea what is about, you can check Wikipedia for further information on
                          &nbsp;<a href="http://en.wikipedia.org/wiki/BibTeX">BibTeX</a>,
                          and to get more information about BibTex
                          &nbsp;<a href={"https://www.bibtex.com/format/#entries"}>entries</a>,
                          &nbsp;<a href={"https://www.bibtex.com/format/#fields"}>format</a>,
                          &nbsp;<a href={"https://www.bibtex.com/format/#templates"}>templates</a>.
                      </p>
                      <p>
                          To look at different bibtex styles and how they look in the resulting Document
                          &nbsp;<a href={"https://verbosus.com/bibtex-style-examples.html"}>BibTeX Style Examples</a>
                      </p>
                      <span>
                          Examples of the supported citation styles, with a view for Inline citations and Bibliography:
                          <ul>
                              <li>
                                  <a className={'bibtex-apa'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fapa'}>
                                      American Psychological Association APA
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-harvard'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fharvard1'}>
                                      Harvard
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-ieee'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fieee'}>
                                      Institute of Electrical and Electronics Engineers IEEE
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-springer'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fspringer-basic-author-date-no-et-al'}>
                                      Springer
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-elsevier'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Felsevier-with-titles'}>
                                      Elsevier
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-acm'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fassociation-for-computing-machinery'}>
                                      Association for Computing Machinery APA
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-mla'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fmodern-language-association'}>
                                      Modern Language Association MLA
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-acs'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Famerican-chemical-society'}>
                                      American Chemical Society ACS
                                  </a>
                              </li>
                          </ul>
                      {/*    Modern Language Association MLA*/}
                      </span>

                      <p>Supported Formats:</p>
                      <ul>
                          <li title={'bibtex-pdf'}>Pdf</li>
                          <li title={'bibtex-html'}>Html</li>
                          <li title={'bibtex-word'}>Word</li>
                          <li title={'bibtex-xml'}>Xml</li>
                          <li title={'bibtex-plain-text bibtex-text'}>Plain text</li>
                          <li title={'bibtex-bibitem'}>Bibitem</li>
                          <li title={'bibtex-citation'}>Citation</li>
                          <li title={'bibtex-ris'}>Ris</li>
                      </ul>
                  </div>
          </footer>

          <link rel="canonical" href={"https://asouqi.github.io/bibtex-converter"}/>
      </div>
    </div>
  );
}

export default App;
// This site converts a list of references in a wide range of styles to BibTeX. Minimal requirements for input file:
//Description
//
// This website allows you to convert a BibTex (*.bib) file to a nicely formatted PDF.
// It will include the bibliography in a rudimentary LaTeX file, using pdflatex to generate
// the output. It might come in handy, if you don't have a LaTeX environment or can't be bothered
// to compile the file on your own right now. Just enter your BibTeX file below and click submit
// to receive a PDF shortly.