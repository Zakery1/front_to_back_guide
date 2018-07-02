import React, { Component } from 'react';
import axios from 'axios';


const DeleteAll = (props) => {
    
    return (
        <div className="loadreload">
            <button className="reviewButton" onClick={() => props.deleteAll()}>Delete All</button>
        </div>
    )
}

export default DeleteAll