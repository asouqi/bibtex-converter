import React, {useCallback, useState} from 'react';
import {ButtonGroup, EditButton, PreviewButton} from "../Buttons";
import {LatexViewer} from "./CodeViewer";
import {LatexPreview} from "./LatexPreview";

export const LatexEditor = () => {

    const [view,setView] = useState('edit')

    const onViewClick = useCallback(() => {
        dataLayer.push({event: 'latex-preview'})
        setView(view === 'edit' ? 'preview' : 'edit')
    }, [view,setView])

    return <>
        <ButtonGroup>
            {view === 'edit' && (
                <>
                    <PreviewButton onPreviewClick={onViewClick}/>
                    <LatexViewer/>
                </>
            )}
            {view === 'preview' && (
                <>
                    <EditButton onEditClick={onViewClick}/>
                    <div className={'d-flex'} style={{flexDirection: 'column', width: '100%', marginTop: '4px'}}>
                        <LatexPreview/>
                    </div>
                </>
            )}
        </ButtonGroup>
    </>
}