import {Splitter, SplitterPanel} from "primereact/splitter";
import PrimereactComponents from "./PrimereactComponents";
import {cloneElement, useEffect, useState} from "react";
import {Button} from "primereact/button";
import {DragDropContext, DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd";
import PrimereactPage from "./PrimereactPage";
import * as _ from 'lodash';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";
import {useDispatch} from "react-redux";
import { formRowActions } from '../../store/formRow';

const PrimereactGenerator = () => {
    const dispatch = useDispatch();

    const [components, setComponents] = useState([
        {id: '1', content: <Button disabled label={'Button1'} name={'Button'} className={'p-inputwrapper'} />},
        {id: '2', content: <InputText disabled placeholder={'InputText'} name={'Input Text'} />},
        {id: '3', content: <Dropdown disabled placeholder={'Dropdown'} name={'Dropdown'} />},
    ]);

    const [ actionToDispatch, setActionToDispatch ] = useState<any>({});

    const [distributedComponents, setDistributedComponents] = useState({});

    const onDragEnd = (result: any) => {
        if (!result.destination || result.source.droppableId === result.destination.droppableId)
            return;

        const newDistributedComponents : any = _.cloneDeep(distributedComponents);
        const component = components[result.source.index].content;

        newDistributedComponents[result.destination.droppableId] = [{
            id: new Date().getTime().toString(), content:
                <div className="p-inputgroup p-col-12 p-p-0">
                    {component}
                    <Button icon="pi pi-cog" className="p-button-warning"/>
                </div>
        }]

        if(component.props && component.props.name)
            setActionToDispatch({ droppableId: result.destination.droppableId, name : component.props.name});
        // const newComponents = reorder(
        //     components,
        //     result.source.index,
        //     result.destination.index
        // );
        console.log('newDistributedComponents', newDistributedComponents)
        setDistributedComponents(newDistributedComponents);
    }

    useEffect(() => {
        if(actionToDispatch.droppableId && actionToDispatch.name)
                dispatch(formRowActions.updateColumnName({ droppableId: actionToDispatch.droppableId, name : actionToDispatch.name}))

    }, [actionToDispatch]);

    const handleRowDelete = ( rowIndex : number ) => {
        const newDistributedComponents : any = _.cloneDeep(distributedComponents);
        Object.keys(newDistributedComponents).filter(el => el.startsWith(`ph-${rowIndex}`)).forEach(el => delete newDistributedComponents[el]);
        setDistributedComponents(newDistributedComponents);
    }

    return <>
        <div style={{height: '100%'}} className="card">
            <h2>Primereact Generator</h2>
            <DragDropContext onDragEnd={onDragEnd}>
                <Splitter style={{height: '100%'}} className="p-mb-5">
                    <SplitterPanel size={25} className="p-d-flex p-ai-start p-jc-center p-fluid">
                        <PrimereactComponents components={components}/>
                    </SplitterPanel>
                    <SplitterPanel size={75}>
                        <PrimereactPage components={distributedComponents} handleRowDelete={handleRowDelete}/>
                    </SplitterPanel>
                </Splitter>
            </DragDropContext>

        </div>
    </>
}

export default PrimereactGenerator