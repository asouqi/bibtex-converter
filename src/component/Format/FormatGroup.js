import React, {useCallback} from "react";
import {FormatButton} from "./FormatButton";

export const FormatGroup = ({setFormat}) => {
    const onGroupButtonClick = useCallback((event) => setFormat(event.target.id),[setFormat])

    return(
        <div className={'container-fluid py-5'}>
            <div className="mb-1 text-muted">Convert form BibTex:</div>
            <div className="btn-group d-flex justify-content-between" role="group" aria-label="Basic radio toggle button group" style={{marginBottom: '10px'}}>
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