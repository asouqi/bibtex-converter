import React from "react";
import {FormatEncoder} from "./FormatEncoder";

export const FormatLabel = ({format, uploadMessage,editorMessage}) => (
    <div className="col d-flex align-items-start py-3">
        <svg className="me-2" viewBox="0 0 24 24" fill="none" width={24} height={24} xmlns="http://www.w3.org/2000/svg">
            <path
                d="M0 4C0 1.79086 1.79086 0 4 0H20C22.2091 0 24 1.79086 24 4V20C24 22.2091 22.2091 24 20 24H4C1.79086 24 0 22.2091 0 20V4Z"
                fill={FormatEncoder[format].color}/>
            <path d="M10.5 15.5H5.5V5.5H13.5V8.5" stroke="white"/>
            <rect x="10.5" y="8.5" width="8" height="10" stroke="white"/>
            <path d="M12 15.5H17" stroke="white"/>
            <path d="M12 13.5H17" stroke="white"/>
            <path d="M12 11.5H17" stroke="white"/>
        </svg>
        <div>
            {uploadMessage && (
                <h4 className="alata-font fw-bold mb-2">Choose your .bib or .json file for converting to {FormatEncoder[format].text}</h4>
            ) || editorMessage && (
                <h4 className="alata-font fw-bold mb-2">Edit converted BibTex, before downloading to {FormatEncoder[format].text} document</h4>
            ) || (
                <h4 className="alata-font fw-bold mb-2">Enter your Bibtex for Converting to {FormatEncoder[format].text}</h4>
            )}
        </div>
    </div>)