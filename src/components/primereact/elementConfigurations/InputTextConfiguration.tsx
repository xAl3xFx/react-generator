import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {InputText} from "primereact/inputtext";
import {formRowActions} from "../../../store/formRow";

interface Props {
    droppableId: string
}

export const InputTextConfiguration: React.FC<Props> = (props) => {
    //@ts-ignore
    const formRow = useSelector((state) => state.formRow);
    const dispatch = useDispatch();

    return <>
        <p>Test</p>
        <InputText value={formRow[props.droppableId].elementStateName}
                   onChange={e => {
                       dispatch(formRowActions.updateElementStateName({
                           droppableId: props.droppableId,
                           elementStateName: e.target.value
                       }))
                   }}
                   placeholder={'State Property Name'}/>

    </>
}