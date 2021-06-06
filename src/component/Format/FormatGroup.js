import React, {useCallback} from "react";
import {FormatButton} from "./FormatButton";

export const FormatGroup = ({setFormat, format}) => {
    const onGroupButtonClick = useCallback((event) => setFormat(event.target.id),[setFormat])

    return(
        <div className={'container-fluid py-1'}>
            <h4 className="mb-5 text-body alata-font">
                Convert your Bibtex bibliography text or file instantly.
            </h4>

            {!format && <h6 className="mb-2 alata-font">please select one of the following formats for conversion:</h6>}
            <div className="btn-group d-flex flex-wrap justify-content-between" role="group" aria-label="Basic radio toggle button group" style={{marginBottom: '10px'}}>
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