import {Splitter, SplitterPanel} from "primereact/splitter";
import PrimereactComponents from "./PrimereactComponents";
import {cloneElement, useState} from "react";
import {Button} from "primereact/button";
import {DragDropContext, DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd";
import PrimereactPage from "./PrimereactPage";
import * as _ from 'lodash';
import {InputText} from "primereact/inputtext";
import {Dropdown} from "primereact/dropdown";

const PrimereactGenerator = () => {
    const [components, setComponents] = useState([
        {id: '1', content: <Button disabled label={'Button1'} name={'asd'} className={'p-inputwrapper'} />},
        {id: '2', content: <InputText disabled placeholder={'InputText'} name={'asd'} />},
        {id: '3', content: <Dropdown disabled placeholder={'Dropdown'} name={'asd'} />},
    ]);

    const [distributedComponents, setDistributedComponents] = useState({});

    const onDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination || result.source.droppableId === result.destination.droppableId)
            return;

        const newDistributedComponents : any = _.cloneDeep(distributedComponents);

        newDistributedComponents[result.destination.droppableId] = [{
            id: new Date().getTime().toString(), content:
                <div className="p-inputgroup p-col-12 p-p-0">
                    {components[result.source.index].content}
                    <Button icon="pi pi-cog" className="p-button-warning"/>
                </div>
        }]
        // const newComponents = reorder(
        //     components,
        //     result.source.index,
        //     result.destination.index
        // );
        console.log('newDistributedComponents', newDistributedComponents)
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
                        <PrimereactPage components={distributedComponents}/>
                    </SplitterPanel>
                </Splitter>
            </DragDropContext>

        </div>
    </>
}

export default PrimereactGenerator