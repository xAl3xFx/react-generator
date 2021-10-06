import {Splitter, SplitterPanel} from "primereact/splitter";
import PrimereactComponents from "./PrimereactComponents";
import {cloneElement, useState} from "react";
import {Button} from "primereact/button";
import {DragDropContext, DraggingStyle, NotDraggingStyle} from "react-beautiful-dnd";
import PrimereactPage from "./PrimereactPage";
import * as _ from 'lodash';
import {InputText} from "primereact/inputtext";

const PrimereactGenerator = () => {
    const [components, setComponents] = useState([
        {id: '1', content: <Button disabled label={'Button1'} className={'p-col-12 '}/>},
        {id: '2', content: <InputText disabled placeholder={'InputText'} className={'p-col-12 '}/>},
    ]);

    const [distributedComponents, setDistributedComponents] = useState({});

    const onDragEnd = (result: any) => {
        console.log(result)
        if (!result.destination || result.source.droppableId === result.destination.droppableId)
            return;

        const newDistributedComponents : any = _.cloneDeep(distributedComponents);

        newDistributedComponents[result.destination.droppableId] = [{id: new Date().getTime().toString(), content: components[result.source.index].content}]
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