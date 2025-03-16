import logging
import json

from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

from .connection_manager import (input_connection_managers, output_connection_managers)
from .docker_executor import DockerExecutor

router = APIRouter()

@router.post("/api/rooms/{room_uuid}", response_class=JSONResponse)
async def run_code(room_uuid: str, request: Request):
    try:
        last_message = input_connection_managers[room_uuid].last_message
        if not last_message:
            return {'result': 'error', 'detail': 'No message yet'}

        message = json.loads(last_message)
        executor = DockerExecutor(message['language'])
        result = await executor.execute(message['code'])
        await output_connection_managers[room_uuid].broadcast(result)
        return {'result': 'success'}
    except Exception as e:
        logging.exception(e)
        return {
            'result': 'error',
            'detail': f'Error during execution: {e}'
        }
