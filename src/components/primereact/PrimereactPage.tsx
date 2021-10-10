import DroppableComponent from "./DroppableComponent";
import {cloneElement, useState} from "react";
import {Toolbar} from "primereact/toolbar";
import {SplitButton} from "primereact/splitbutton";
import * as _ from 'lodash'
import {Card} from "primereact/card";
import {FormRow} from "../templates/FormRow";
import {useDispatch, useSelector} from "react-redux";
import { formRowActions } from '../../store/formRow';
import {Button} from "primereact/button";

const PrimereactPage = ({ components, handleRowDelete } : any) => {
    const dispatch = useDispatch();

    const cardStyle = {
        height: "40px",
        border: ".5px solid lightgray",
        paddingLeft: 0,
        paddingRight: 0,
        borderRadius: '.25rem'
    }
    const [placeHolders, setPlaceholders] = useState<any>([]);

    const columnOptions = Array.from([1, 2, 3, 4, 6, 12], x => {
        return {
            icon: 'pi pi-check',
            label: `${x + (x === 1 ? ' column' : ' columns')}`,
            command: () => addRow(x)
        }
    });

    const addRow = (columnsCount: number) => {
        const columns = [];
        for (let i = 0; i < columnsCount; i++)
            columns.push(<div style={cardStyle}></div>);
        const newPlaceholders = _.clone(placeHolders);
        newPlaceholders.push(columns);
        setPlaceholders(newPlaceholders);
    }

    const deleteRow = ( index: number ) => {
        let newPlaceholders = _.clone(placeHolders);
        newPlaceholders.splice(index, 1);
        setPlaceholders(newPlaceholders);
        handleRowDelete(index);
    }

    const leftContents = <>
        <SplitButton label="Add Row" className="p-button-warning" model={columnOptions}/>
    </>

    return <>
        {
            <div className={'p-d-flex p-flex-column p-col-12'}>
                <Toolbar left={leftContents}/>
                <Card>
                    {
                        placeHolders.map((row: any, rowIndex: number) =>
                            <div className={"p-col-12 p-d-flex "}>
                                <div className={"p-col-11"}>
                                    <FormRow>
                                        {
                                            (row || []).map((el: any, colIndex: number) => {
                                                const droppableId = `ph-${rowIndex}-${colIndex}`;
                                                dispatch(formRowActions.createElementLabel({ droppableId : droppableId, elementLabel : ''}))
                                                return cloneElement(el, {key: colIndex}, [<DroppableComponent
                                                    droppableId={ droppableId }
                                                    items={components[droppableId] || []}/>])
                                            })
                                        }
                                    </FormRow>
                                </div>
                                <div className={'p-col-1 p-d-flex p-ai-center'}>
                                    <Button onClick={() => deleteRow(rowIndex)} className={'p-button-danger'} style={{marginBottom: '-0.75rem', width: '100%'}} icon={'pi pi-trash'} />
                                </div>
                            </div>
                        )
                    }
                </Card>
            </div>
        }
    </>
}

export default PrimereactPage;