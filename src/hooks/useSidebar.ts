import {useContext} from "react";
import {SidebarContext} from "../context/SidebarContext";

export function useSidebar() : {isShown : boolean, showSidebar: (newContent : any, heading: string, onHideCallback?: () => void) => void, hideSidebar: () => void}{
    const sidebarHelpers = useContext(SidebarContext);
    return sidebarHelpers;
}