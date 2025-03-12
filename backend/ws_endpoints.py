import asyncio

from fastapi import WebSocket, WebSocketDisconnect, APIRouter

from .connection_manager import (input_connection_managers, output_connection_managers)

router = APIRouter()

@router.websocket("/ws/{room_id}/input")
async def ws_input(room_id: int, websocket: WebSocket):
    # TODO: check room existence
    await input_connection_managers[room_id].connect(websocket)
    try:
        while True:
            input = await websocket.receive_text()
            await input_connection_managers[room_id].broadcast(input, exclude=[websocket])
    except WebSocketDisconnect:
        # TODO: if everybody disconnected: remove room
        input_connection_managers[room_id].disconnect(websocket)


@router.websocket('/ws/{room_id}/output')
async def ws_output(room_id: int, websocket: WebSocket):
    # TODO: check room existence
    await output_connection_managers[room_id].connect(websocket)
    try:
        while True:
            await asyncio.sleep(0)
    except WebSocketDisconnect:
        # TODO: if everybody disconnected: remove room
        output_connection_managers[room_id].disconnect(websocket)
