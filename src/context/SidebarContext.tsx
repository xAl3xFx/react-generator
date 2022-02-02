import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import {Sidebar} from "primereact/sidebar";

export const SidebarContext = createContext<any>(null);
export const SidebarContextProvider = (props : any) => {
    const [isShown, setIsShown] = useState(false);
    const [content, setContent] = useState<any>(null);
    const [heading, setHeading] = useState('');

    const onHideCallbackRef = useRef<any>(null);

    const showSidebar = (newContent : any, heading: string, onHideCallback: () => void) => {
        setContent(newContent);
        setHeading(heading);
        onHideCallbackRef.current = onHideCallback;
        setIsShown(true);
    }

    const hideSidebar = () => {
        setIsShown(false);
    }

    useEffect(() => {
        if(!isShown && onHideCallbackRef.current){
            onHideCallbackRef.current();
        }
    }, [isShown, onHideCallbackRef]);


    return<>
        <SidebarContext.Provider value={{ showSidebar, hideSidebar, isShown }}>
            <Sidebar position={'right'} style={{ marginTop : "100px" }} className={'responsiveSidebar'} visible={isShown} onHide={hideSidebar} blockScroll icons={() => (
                <React.Fragment>
                    <h1>{heading}</h1>
                </React.Fragment>
            )}>
                <div className={"p-mt-3"}>
                    { content }
                </div>
            </Sidebar>
            {props.children}
        </SidebarContext.Provider>
    </>
};
