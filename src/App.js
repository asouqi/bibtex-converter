import React from "react";
import {NavBar} from './nav/NavBar'
import {Citation} from "./component/Citation";
import 'bootstrap/scss/bootstrap.scss'
import './fonts/Alata-Regular.ttf';
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
                      <h2>Description</h2>
                      <p>This site converts a BibTex (*.json *.bib) file or text to a formatted Bibliography, with supports for apa harvard iee CSL style.</p>
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

                      <p>Supported Formats:</p>
                      <ul>
                          <li>bibtex to pdf</li>
                          <li>bibtex to html</li>
                          <li>bibtex to word</li>
                          <li>bibtex to xml</li>
                          <li>bibtex to plain text</li>
                          <li>bibtex to bibitem</li>
                          <li>bibtex to citation</li>
                          <li>bibtex to ris</li>
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