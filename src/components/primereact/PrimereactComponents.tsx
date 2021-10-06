import DroppableComponent from "./DroppableComponent";

const PrimereactComponents = ({components} : any) => {

    return <>
        <div className={'p-d-flex p-flex-column p-col-12 p-ai-start'}>
                <DroppableComponent className={'p-col-12'} droppableId={'components'} items={components} />
        </div>
    </>
}

export default PrimereactComponents