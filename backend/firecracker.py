import asyncio
import pathlib
import re
import uuid


class Firecracker:
    BASE_DIR = pathlib.Path(__file__).parent
    CMD = str(BASE_DIR / '../deps/firecracker/firecracker --config-file vmconfig.json --no-api')

    def __init__(self, process):
        self._process = process

    @classmethod
    async def create(cls):
        process = await asyncio.create_subprocess_shell(
            cls.CMD,
            stdin=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE,
            stdout=asyncio.subprocess.PIPE,
        )

        return cls(process)

    async def execute(self, code: str):
        guid = str(uuid.uuid4())
        start_marker = f'start-{guid}'
        end_marker = f'end-{guid}'

        await asyncio.wait_for(self._read_stdout('Welcome to Ubuntu'), timeout=5)
        await asyncio.wait_for(
            self._write_stdin(
                [
                    f'cat << EOF > code',
                    f'{code}',
                    'EOF',
                    f'echo {start_marker}',
                    f'python3 code 2>&1',
                    f'echo {end_marker}',
                    'reboot',
                ]
            ),
            timeout=5
        )

        await asyncio.wait_for(self._read_stdout(fr'^{start_marker}'), timeout=5)
        result = await asyncio.wait_for(self._read_stdout(fr'^{end_marker}'), timeout=5)
        return ''.join(result[1:-1])

    async def _read_stdout(self, stop_marker: str):
        result = []
        while True:
            line = await self._process.stdout.readline()
            line = line.decode()

            if re.search(stop_marker, line):
                return result

            result.append(line)

    async def _write_stdin(self, input_lines: list[str]):
        for line in input_lines:
            self._process.stdin.write(f'{line}\n'.encode())
            await self._process.stdin.drain()
            await asyncio.sleep(0)
