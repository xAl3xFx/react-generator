import { Splitter, SplitterPanel } from "primereact/splitter";
import PrimereactComponents from "./PrimereactComponents";
import {useEffect, useRef, useState} from "react";
import { Button } from "primereact/button";
import { DragDropContext } from "react-beautiful-dnd";
import PrimereactPage from "./PrimereactPage";
import * as _ from 'lodash';
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import {useDispatch, useSelector} from "react-redux";
import { formRowActions } from '../../store/formRow';
import { OverlayPanel } from "primereact/overlaypanel";
import {Calendar} from "primereact/calendar";
import {Checkbox} from "primereact/checkbox";
import {Card} from "primereact/card";

const PrimereactGenerator = () => {
    const overlayRefs = useRef<any>({});
    const [ actionToDispatch, setActionToDispatch ] = useState<any>({});
    const [distributedComponents, setDistributedComponents] = useState({});
    //@ts-ignore
    const formRow = useSelector((state) => state.formRow);

    const dispatch = useDispatch();

    const components = [
        {id: '1', content: <Button disabled label={'Button'} name={'Button'} className={'p-inputwrapper'} />},
        {id: '2', content: <InputText disabled placeholder={'InputText'} name={'Input Text'} />},
        {id: '3', content: <Dropdown disabled placeholder={'Dropdown'} name={'Dropdown'} />},
        {id: '4', content: <Calendar disabled placeholder={'Calendar'} name={'Calendar'} />},
        {id: '5', content: <Checkbox disabled name={'Checkbox'} className={'p-inputwrapper'} checked />},
    ];

    const onDragEnd = (result: any) => {
        if (!result.destination || result.source.droppableId === result.destination.droppableId)
            return;

        const newDistributedComponents : any = _.cloneDeep(distributedComponents);
        const component = components[result.source.index].content;

        newDistributedComponents[result.destination.droppableId] = [{
            id: new Date().getTime().toString(), content:
                <div className="p-inputgroup p-col-12 p-p-0">
                    {component}
                    <Button icon="pi pi-cog" className="p-button-warning" onClick={(e) => overlayRefs.current[result.destination.droppableId].toggle(e)} aria-haspopup aria-controls={`overlay_panel-${result.destination.droppableId}`} />
                    <OverlayPanel showCloseIcon ref={(el : any) => overlayRefs.current[result.destination.droppableId] = el} id={`overlay_panel-${result.destination.droppableId}`}>
                        <Card>
                            <InputText value={formRow[result.destination.droppableId].elementStateName} onChange={e => dispatch(formRowActions.updateElementStateName({ droppableId: result.destination.droppableId,    elementStateName: e.target.value }))} placeholder={'State Property Name'}/>
                        </Card>
                    </OverlayPanel>
                </div>
        }]

        if(component.props && component.props.name)
            setActionToDispatch({ droppableId: result.destination.droppableId, elementLabel : component.props.name});

        setDistributedComponents(newDistributedComponents);
    }

    useEffect(() => {
        if(actionToDispatch.droppableId && actionToDispatch.elementLabel)
                dispatch(formRowActions.updateElementLabel({ droppableId: actionToDispatch.droppableId, elementLabel : actionToDispatch.elementLabel}))

    }, [actionToDispatch]);

    const handleRowDelete = ( rowIndex : number ) => {
        //Delete row from distributedComponents
        const newDistributedComponents : any = _.cloneDeep(distributedComponents);
        Object.keys(newDistributedComponents).filter(el => el.startsWith(`ph-${rowIndex}`)).forEach(el => delete newDistributedComponents[el]);
        setDistributedComponents(newDistributedComponents);

        //Delete column names from store
        dispatch(formRowActions.removeAllLabelsForRow({ index: rowIndex }))
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