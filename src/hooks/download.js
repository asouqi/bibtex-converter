import {useCallback} from "react";
import {FormatEncoder} from "../component/Format/FormatEncoder";

export default (format, outputText, fileName, outputError) => {
   return useCallback(async () => {
       if (format && outputText.length > 1 && !outputError){
           if (format === 'PDF'){
               const pdfMake = await import(/* webpackChunkName: "pdfmake" */'pdfmake/build/pdfmake');
               const pdfFonts = await import(/* webpackChunkName: "vfs_fonts" */'pdfmake/build/vfs_fonts');
               pdfMake.vfs = pdfFonts.pdfMake.vfs;
               const htmlToPdfmake = await import(/* webpackChunkName: "html-to-pdfmake" */'html-to-pdfmake');

               const pdfData = htmlToPdfmake.default(outputText)
               pdfMake.createPdf({content: pdfData},null,null,pdfFonts.pdfMake.vfs).download(fileName)
           } else {
               const link = document.createElement('a');
               if (format === 'WORD'){
                   const header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' "+
                       "xmlns:w='urn:schemas-microsoft-com:office:word' "+
                       "xmlns='http://www.w3.org/TR/REC-html40'>"+
                       "<head><meta charset='utf-8'></head><body>";
                   const footer = "</body></html>";
                   const source = header + outputText + footer
                   link.href = `data:${FormatEncoder[format].fileType};charset=UTF-8,` + encodeURIComponent(source)
               } else {
                   link.href = `data:${FormatEncoder[format].fileType};charset=UTF-8,` + encodeURIComponent(outputText);
               }
               link.download = `${fileName}.${FormatEncoder[format].name}`;
               link.click();
           }
           window.gtag('event','click',{
               download : format,
           });
       }
   },[format, outputText, fileName, outputError])

}