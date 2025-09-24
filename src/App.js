import React from "react";
import {NavBar} from './nav/NavBar';
import {Citation} from "./component/Citation";
import 'bootstrap/dist/css/bootstrap.min.css';
import './fonts.css';

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
                                      American Psychological Association (APA)
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-harvard'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fharvard1'}>
                                      Harvard
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-ieee'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fieee'}>
                                      Institute of Electrical and Electronics Engineers (IEEE)
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
                                      Association for Computing Machinery (ACM)
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-mla'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Fmodern-language-association'}>
                                      Modern Language Association (MLA)
                                  </a>
                              </li>
                              <li>
                                  <a className={'bibtex-acs'} href={'https://csl.mendeley.com/styleInfo/?styleId=http%3A%2F%2Fwww.zotero.org%2Fstyles%2Famerican-chemical-society'}>
                                      American Chemical Society (ACS)
                                  </a>
                              </li>
                          </ul>
                      {/*    Modern Language Association MLA*/}
                      </span>

                      <p>If You need a Free Citation Generator:</p>
                      <ul>
                          <li>
                              <a className={'7 Apa Citation Generator'} href={'https://citationgenerators.com/apa_7th/'}>
                                  7 Apa Citation
                              </a>
                          </li>
                          <li>
                              <a className={'Mla Citation Generator'} href={'https://citationgenerators.com/mla/'}>
                                  Mla Citation
                              </a>
                          </li>
                          <li>
                              <a className={'8 Mla Citation Generator'} href={'https://citationgenerators.com/mla_8/'}>
                                  8 Apa Citation
                              </a>
                          </li>
                          <li>
                              <a className={'Harvard Citation Generator'} href={'https://citationgenerators.com/harvard/'}>
                                  Harvard Citation
                              </a>
                          </li>
                          <li>
                              <a className={'AMA Citation Generator'} href={'https://citationgenerators.com/ama/'}>
                                  AMA Citation
                              </a>
                          </li>
                          <li>
                              <a className={'Chicago Citation Generator'} href={'https://citationgenerators.com/chicago/'}>
                                  Chicago Citation
                              </a>
                          </li>
                          <li>
                              <a className={'ACS Citation Generator'} href={'https://citationgenerators.com/acs/'}>
                                  ACS Citation
                              </a>
                          </li>
                      </ul>

                      <p>Supported Formats:</p>
                      <ul>
                          <li title={'bibtex-pdf'}>Pdf</li>
                          <li title={'bibtex-html'}>Html</li>
                          <li title={'bibtex-word'}>Word Document</li>
                          <li title={'bibtex-word-bibliography-xml'}>Word Bibliography Xml(that can be imported to source manager)</li>
                          <li title={'bibtex-xml'}>Xml</li>
                          <li title={'bibtex-plain-text bibtex-text'}>Plain text</li>
                          <li title={'bibtex-bibitem'}>Bibitem</li>
                          <li title={'bibtex-citation'}>Citation</li>
                          <li title={'bibtex-ris'}>Ris</li>
                      </ul>

                      <h3>Edit Converted BibTeX.</h3>
                      <p>One of the extra functions the site provides, editing converted BibTeX by clicking on the edit button located at the output box.</p>

                      <div
                          className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                          <div className="col p-4 d-flex flex-column position-static">
                              <div className="mb-1 text-muted">Pdf, Html, Word, Citation</div>
                              <p className="card-text mb-auto">for those formats will open a rich text editor which you could edit and tweak the document before downloading it.</p>
                          </div>
                      </div>

                      <div
                          className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                          <div className="col p-4 d-flex flex-column position-static">
                              <div className="mb-1 text-muted">Bibitem</div>
                              <p className="card-text mb-auto">for this format the site provides a latex editor with the ability to inspect latex by clicking on the preview button which will compile and generate an HTML document.</p>
                          </div>
                      </div>

                      <div className={'d-flex flex-wrap justify-content-between'}>
                          <div className="card border rounded" style={{width: '18rem',}}>
                              <img src="/assets/document_editor.png" className="img-fluid card-img-top" alt="..."/>
                              <div className="card-body d-flex align-items-end justify-content-center">
                                  <h5 className="card-title">Rich text editor</h5>
                              </div>
                          </div>
                          <div className="card border rounded" style={{width: '18rem'}}>
                              <img src="/assets/latex_edit.png" className="img-fluid card-img-top" alt="..."/>
                              <div className="card-body d-flex align-items-end justify-content-center">
                                  <h5 className="card-title">Latex editor</h5>
                              </div>
                          </div>
                          <div className="card" style={{width: '18rem'}}>
                              <img src="/assets/latex_preview.png" className="img-fluid card-img-top" alt="..."/>
                              <div className="card-body d-flex align-items-end justify-content-center">
                                  <h5 className="card-title">Latex preview</h5>
                              </div>
                          </div>
                      </div>
                  </div>
          </footer>

          <link rel="canonical" href={"https://asouqi.github.io/bibtex-converter"}/>
      </div>
    </div>
  );
}

export default App;
