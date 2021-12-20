import React, {useEffect, useRef, useState} from 'react';
import '../styles/canvas.scss'
import {useParams} from "react-router-dom";
import canvasState from "../store/canvasState";
import {observer} from "mobx-react-lite";
import Line from "../tools/Line";
import toolState from "../store/toolState";
import socketState from "../store/socketState";
import Square from "../tools/Square";

const Canvas = observer(() => {

        const canvasRef = useRef()
        const [name, setName] = useState('')
        const [show, setShow] = useState(true);
        const params = useParams()

        const drawHandler = (msg) => {
            const figure = msg.figure
            console.log(figure)
            const ctx = canvasRef.current.getContext('2d')
            switch (figure.figureName) {
                case "line":
                    Line.staticDraw(ctx, figure.start, figure.finish)
                    break
                /*case "rect":
                    Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.fillColor)
                    break*/
                case'finish':
                    ctx.beginPath()
                    break
            }
        }

        useEffect(() => {
            canvasState.setCanvas(canvasRef.current)
            const socket = new WebSocket('ws://localhost:5000/')
            socketState.setSocket(socket)
            socketState.setSessionId(params.id)
            toolState.setTool(new Line(canvasRef.current, socket, params.id))
            socket.onopen = () => {
                socket.send(JSON.stringify({
                    method: 'connection',
                    id: params.id,
                    userName: name
                }))
            }
            socket.onmessage = (event) => {
                let msg = JSON.parse(event.data)
                console.log(msg.method)
                switch (msg.method) {
                    case'connection':
                        console.log(`Пользователь ${msg.userName} подключился`)
                        break
                    case'draw':
                        drawHandler(msg)
                        break
                }
            }
            setShow(false)
        }, [])
        return (
            <div className='canvas'>
                <canvas ref={canvasRef} width={600} height={400}/>
            </div>
        );
    }
);

export default Canvas;