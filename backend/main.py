import asyncio
import uuid

from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from .connection_manager import ConnectionManager
from .firecracker import Firecracker


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

input_manager = ConnectionManager()
output_manager = ConnectionManager()

mock_rooms = [
    {'id': 1},
    {'id': 2},
    {'id': 3},
]

@app.get('/api/rooms', response_class=JSONResponse)
async def get_rooms(request: Request) -> JSONResponse:
    return mock_rooms

@app.post("/api/rooms/{room_id}", response_class=JSONResponse)
async def run_code(room_id: int, request: Request):
    firecracker = await Firecracker.create()
    result = await firecracker.execute(input_manager.last_message)
    output = await output_manager.broadcast(result)
    return {'output': output}


@app.websocket("/ws/{room_id}/input")
async def ws_input(room_id: int, websocket: WebSocket):
    await input_manager.connect(websocket)
    try:
        while True:
            input = await websocket.receive_text()
            await input_manager.broadcast(input, exclude=[websocket])
    except WebSocketDisconnect:
        input_manager.disconnect(websocket)


@app.websocket('/ws/{room_id}/output')
async def ws_output(room_id: int, websocket: WebSocket):
    await output_manager.connect(websocket)
    try:
        while True:
            await asyncio.sleep(0)
    except WebSocketDisconnect:
        output_manager.disconnect(websocket)
