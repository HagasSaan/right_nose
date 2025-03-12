import logging
import json

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from .connection_manager import (input_connection_managers, output_connection_managers)
from .docker_executor import DockerExecutor

router = APIRouter()

mock_next_idx = 4  # TODO: move to database
mock_rooms = [
    {'id': 1, 'name': 'sample 1'},
    {'id': 2, 'name': 'sample 2'},
    {'id': 3, 'name': 'sample 3'},
]

@router.get('/api/rooms', response_class=JSONResponse)
async def get_rooms(request: Request) -> JSONResponse:
    return mock_rooms

@router.post('/api/rooms', response_class=JSONResponse)
async def create_room(request: Request) -> JSONResponse:
    # TODO: take room name
    global mock_next_idx
    room = {
        'id': mock_next_idx, 'name': f'sample {mock_next_idx}'
    }
    mock_next_idx += 1
    mock_rooms.append(room)
    return room

@router.post("/api/rooms/{room_id}", response_class=JSONResponse)
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
