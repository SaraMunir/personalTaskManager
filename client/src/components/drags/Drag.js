import React from "react";
import PropTypes from "prop-types";
import * as dropEffects from "./dropEffects";

const draggingStyle = {
    opacity: 0.8,
    background: 'pink'
};

function Drag(props) {
    const [isDragging, setIsDragging] = React.useState(false);
    const image = React.useRef(null);
    
    // React.useEffect(() => {
    //     image.current = null;
    //     if (props.dragImage) {
    //         image.current = new Image();
    //         image.current.src = props.dragImage;
    //     }
    // }, [props.dragImage]);

    const startDrag = ev => {
        setIsDragging(true);
        console.log('whats hapeinig here?')
        ev.dataTransfer.setData("drag-item", props.dataItem);
        ev.dataTransfer.effectAllowed = props.dropEffect;
        if (image.current) {
            ev.dataTransfer.setDragImage(image.current, 0, 0);
        }
    };
    const dragEnd = () => {
        console.log('did it drop?')
        setIsDragging(false)};

    return (
        <div style={isDragging ? draggingStyle : {}} draggable onDragStart={startDrag} onDragEnd={dragEnd} >
            {props.children}
        </div>
    )
};

Drag.propTypes = {
    dataItem: PropTypes.string.isRequired,
    dragImage: PropTypes.string,
    dropEffect: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Drag.defaultProps = {
    dragImage: null,
    dropEffect: dropEffects.All,
};

Drag.propTypes = {
    dataItem: PropTypes.string.isRequired,
    dragImage: PropTypes.string,
    dropEffect: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

Drag.defaultProps = {
    dragImage: null,
    dropEffect: dropEffects.All,
};

export default Drag;
