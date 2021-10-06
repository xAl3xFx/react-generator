import DroppableComponent from "./DroppableComponent";
import {cloneElement, useEffect, useState} from "react";
import {Toolbar} from "primereact/toolbar";
import {SplitButton} from "primereact/splitbutton";
import * as _ from 'lodash'
import {Card} from "primereact/card";
import {FormRow} from "../templates/FormRow";


const PrimereactPage = ({components}: any) => {
    const cardClassName = (i: number) => `p-col-12 p-md-${12 / i}`;
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
        const newPlaceHolders = _.clone(placeHolders);
        newPlaceHolders.push(columns);
        setPlaceholders(newPlaceHolders);
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
                            <FormRow>
                                {
                                    (row || []).map((el: any, colIndex: number) => {
                                        return cloneElement(el, {key: colIndex}, [<DroppableComponent
                                            droppableId={`ph-${rowIndex}-${colIndex}`}
                                            items={components[`ph-${rowIndex}-${colIndex}`] || []}/>])
                                    })
                                }
                            </FormRow>
                        )
                    }
                </Card>

            </div>
        }
    </>
}

export default PrimereactPage;