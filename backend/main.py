import asyncio
import logging
import json
from collections import defaultdict

from fastapi import FastAPI, WebSocket, Request, WebSocketDisconnect
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware

from .docker_executor import DockerExecutor
from .connection_manager import ConnectionManager


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins="*",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mock_rooms = [
    {'id': 1, 'name': 'sample 1'},
    {'id': 2, 'name': 'sample 2'},
    {'id': 3, 'name': 'sample 3'},
]

input_connection_managers = defaultdict(ConnectionManager)
output_connection_managers = defaultdict(ConnectionManager)

@app.get('/api/rooms', response_class=JSONResponse)
async def get_rooms(request: Request) -> JSONResponse:
    return mock_rooms

@app.post("/api/rooms/{room_id}", response_class=JSONResponse)
async def run_code(room_id: int, request: Request):
    try:
        last_message = input_connection_managers[room_id].last_message
        if not last_message:
            return {'result': 'error', 'detail': 'No message yet'}

        message = json.loads(last_message)
        executor = DockerExecutor(message['language'])
        result = await executor.execute(message['code'])
        await output_connection_managers[room_id].broadcast(result)
        return {'result': 'success'}
    except Exception as e:
        logging.exception(e)
        return {
            'result': 'error',
            'detail': f'Error during execution: {e}'
        }

@app.websocket("/ws/{room_id}/input")
async def ws_input(room_id: int, websocket: WebSocket):
    await input_connection_managers[room_id].connect(websocket)
    try:
        while True:
            input = await websocket.receive_text()
            await input_connection_managers[room_id].broadcast(input, exclude=[websocket])
    except WebSocketDisconnect:
        input_connection_managers[room_id].disconnect(websocket)


@app.websocket('/ws/{room_id}/output')
async def ws_output(room_id: int, websocket: WebSocket):
    await output_connection_managers[room_id].connect(websocket)
    try:
        while True:
            await asyncio.sleep(0)
    except WebSocketDisconnect:
        output_connection_managers[room_id].disconnect(websocket)
