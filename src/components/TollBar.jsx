import React from 'react';
import toolState from "../store/toolState";
import Line from "../tools/Line";
import canvasState from "../store/canvasState";
import socketState from "../store/socketState";
import Square from "../tools/Square";

const TollBar = () => {
    //console.log(canvasState)
    return (
        <div>
            <button onClick={()=>toolState.setTool(new Line(canvasState.canvas, socketState.socket, 1))}>Линия</button>
            <button onClick={()=>toolState.setTool(new Square(canvasState.canvas, socketState.socket, 1))}>Выбор</button>
        </div>
    );
};

export default TollBar;