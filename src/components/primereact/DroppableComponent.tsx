import {Draggable, Droppable} from "react-beautiful-dnd";


const DroppableComponent = ({items, droppableId} : any) => {

    const DroppableItem = ({ item, index } : any) =>  {
        console.log(item)
    return (
            <Draggable key={index} draggableId={item.id} index={index}>
                {provided => (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {item.content}
                    </div>
                )}
            </Draggable>
        );
    }

    const DropList = ({ items } : any) => {
        return items.map((item: any, index: number) => (
            <DroppableItem item={item} index={index} key={item.id} />
        ));
    };

    return <>
        <Droppable droppableId={droppableId}>
            {provided => (
                <div className={"p-col-12"} style={{marginTop: '-.5rem', paddingLeft: '0', paddingRight: '0'}} ref={provided.innerRef} {...provided.droppableProps}>
                    <DropList items={items} />
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    </>
}

export default DroppableComponent