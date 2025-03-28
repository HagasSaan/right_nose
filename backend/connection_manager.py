from typing_extensions import Optional
from starlette.websockets import WebSocket
from collections import defaultdict

class ConnectionManager:
    def __init__(self):
        self.last_message = None
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        if self.last_message:
            await websocket.send_text(self.last_message)

        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str, exclude: Optional[list[WebSocket]] = None) -> None:
        self.last_message = message
        exclude = exclude or []
        for connection in self.active_connections:
            if connection in exclude:
                continue

            try:
                await connection.send_text(message)
            except Exception as e:
                print(e)

input_connection_managers = defaultdict(ConnectionManager)
output_connection_managers = defaultdict(ConnectionManager)
