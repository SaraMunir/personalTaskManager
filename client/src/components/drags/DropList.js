import React from 'react'
import DropTarget from "./DropTarget";

function DropList() {

    // const items = ["Item 44", "Item 22"];

    const [items, setItems] = React.useState(["Item 44", "Item 22"]);
    const itemDropped = item => setItems([...items, item]);


    return (
        <DropTarget onItemDropped={itemDropped} dropEffect="link">
            <div className="drag-drop-container">
                {items.map(item => (
                    <div key={item} className="item">
                        {item}
                    </div>
                ))}
            </div>
        </DropTarget>
    )
}

export default DropList
