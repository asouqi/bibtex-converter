import React, {useCallback} from "react";
import {FormatButton} from "./FormatButton";
import {Helmet} from "react-helmet";

export const FormatGroup = ({setFormat, format}) => {
    const onGroupButtonClick = useCallback((event) => setFormat(event.target.id),[setFormat])

    return(
        <div className={'container-fluid py-1'}>

            {/*<AddsBlock />*/}

            <h2 className="mb-5 text-body alata-font" style={{fontSize: '1.5em'}}>
                Convert your Bibtex bibliography text or file instantly.
            </h2>

            {!format && <div className="mb-2 alata-font alata-font" style={{fontWeight: 'bold', lineHeight: '1.6'}}>please select one of the following formats for conversion:</div>}
            <div className="btn-group d-flex flex-wrap justify-content-between" role="group" aria-label="converted formats" style={{marginBottom: '10px'}}>
                <input type="radio" className="btn-check" name="btnradio" id="PDF" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'PDF'}/>

                <input type="radio" className="btn-check" name="btnradio" id="HTML" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'HTML'}/>

                <input type="radio" className="btn-check" name="btnradio" id="WORD" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'WORD'}/>

                <input type="radio" className="btn-check" name="btnradio" id="XML" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'XML'}/>

                <input type="radio" className="btn-check" name="btnradio" id="TXT" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'TXT'}/>

                <input type="radio" className="btn-check" name="btnradio" id="BIB" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'BIB'}/>

                <input type="radio" className="btn-check" name="btnradio" id="CIT" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'CIT'}/>

                <input type="radio" className="btn-check" name="btnradio" id="RIS" autoComplete="off"
                       onClick={onGroupButtonClick}/>
                <FormatButton format={'RIS'}/>
            </div>
        </div>
    )
}

// const AddsBlock = () => <Helmet>
//     <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8835129466793937"
//             crossOrigin="anonymous"></script>
//     <ins className="adsbygoogle"
//          style="display:block"
//          data-ad-client="ca-pub-8835129466793937"
//          data-ad-slot="1631505271"
//          data-ad-format="auto"
//          data-full-width-responsive="true"></ins>
//     <script>
//         (adsbygoogle = window.adsbygoogle || []).push({});
//     </script>
// </Helmet>
