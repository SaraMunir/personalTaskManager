import React from 'react'
import DragList from './drags/DragList'
import DropList from './drags/DropList'
function DragPage() {
    return (
        <div className="row">
            <DragList />
            <DropList />
        </div>
    )
}

export default DragPage
