import DroppableComponent from "./DroppableComponent";
import {Dropdown} from "primereact/dropdown";

const PrimereactComponents = ({components} : any) => {

    return <>
        <DroppableComponent className={'p-grid p-fluid'} droppableId={'components'} items={components} />
    </>
}

export default PrimereactComponents