import {useCallback} from "react";

export default (outputText, format, outputError, event = 'clipboard') => {
    return useCallback(() => {
        if (outputText && outputText.length > 1 && !outputError) {
            const toast = document.getElementById("snackbar");
            toast.className = "show";
            (async () =>{ await navigator.clipboard.writeText(outputText)})()
            setTimeout(function(){
                toast.className = toast.className.replace("show", "");
                dataLayer.push({event, format})
            }, 3000);
        }
    },[outputText, outputError])
}