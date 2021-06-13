import React, {Fragment, useCallback, useMemo, useState} from "react";

export const CustomStyle = ({style, handleOnStyleClick}) => {
       const [toggle, setToggle] = useState(false)
       const [update, setUpdate] = useState(false)
       const [styleName, setStyleName] = useState('')
       const [csl, setCSL] = useState('')

       const onToggleClick = useCallback(() => setToggle(!toggle), [setToggle, toggle])
       const onStyleNameChange = useCallback((event) => setStyleName(event.target.value), [setStyleName])
       const onCSLCodeChange = useCallback((event) => setCSL(event.target.value), [setCSL])
       const onSaveClick = useCallback(() => {
           if (styleName.length > 1 && csl.length > 1){
               localStorage.setItem(styleName, csl)
               setUpdate(!update)
               setStyleName('')
               setCSL('')
           }
       }, [styleName, csl, setUpdate, update])
       const onClearClickHandler = useCallback(() => {
             if (styleName.length > 1 && localStorage.getItem(styleName)){
                 localStorage.removeItem(styleName)
                 setUpdate(!update)
                 setStyleName('')
                 setCSL('')
             } else {
             //    TODO:: show error
             }
       },[setStyleName,setCSL, styleName])

       const styles = useMemo(() => {
        const csl = {}
        if (localStorage.length > 0) {
            [...Array(localStorage.length).keys()].map((index) => {
                const key = localStorage.key(index)
                csl[key] = localStorage.getItem(key)
            })
        }
        return csl
        },[update])

       return (
           <>
               <div className="btn-group d-flex flex-wrap" role="group" aria-label="Basic checkbox toggle button group">
                   {Object.keys(styles).map(csl => (
                       <Fragment key={csl}>
                           <input checked={style === csl} type="checkbox" className="btn-check" id={csl} autoComplete="off"
                                  onChange={handleOnStyleClick}/>
                           <label className="btn btn-outline-success" htmlFor={csl} style={{width: '25px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{csl}</label>
                       </Fragment>
                   ))}
               </div>
               <div className="d-flex" style={{justifyContent: 'flex-end', marginTop: '20px'}}>
                 <button type="button" className="btn btn-outline-success" style={{border: 'none'}} onClick={onToggleClick}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                        className="me-2" viewBox="0 0 16 16">
                       <path fillRule="evenodd"
                             d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z"/>
                   </svg>
                   {!toggle && 'Add Custom Style' || 'Hide Custom Style Input'}
                 </button>
           </div>

           {toggle && (
               <div className="h-100 p-5 rounded-3" style={{backgroundColor: '#e9ecef'}}>
                    <div className="input-group py-2">
                           <span className="input-group-text">Style Name</span>
                           <input type="text" aria-label="CSL style name" className="form-control" value={styleName} onInput={onStyleNameChange}/>
                    </div>

                    <div className="form-floating py-2">
                           <textarea className="form-control" id="floatingTextarea2" style={{minHeight: '100px'}} value={csl} onInput={onCSLCodeChange}/>
                           <label htmlFor="floatingTextarea2">Add your CSL code</label>
                    </div>

                    <p>you can get CSL code from <a href={'https://csl.mendeley.com/searchByName/'}>csl.mendeley</a> by searching the name of the publisher.</p>

                   <div className="btn-group d-flex flex-wrap" role="group" aria-label="Basic button group" style={{justifyContent: 'space-between'}}>
                       <button type="button" className="btn btn-success" onClick={onSaveClick}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="me-2" viewBox="0 0 16 16">
                               <path
                                   d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                           </svg>
                           Save to the styles
                       </button>
                       <button type="button" className="btn btn-danger" style={{border: 'none'}} onClick={onClearClickHandler}>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                className="me-2" viewBox="0 0 16 16">
                               <path
                                   d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                               <path fillRule={"evenodd"}
                                     d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                           </svg>
                           Delete Custom Style
                       </button>
                   </div>
              </div>
           )}
           </>
       )
}