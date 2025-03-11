import dataclasses
import tempfile
import docker
import pathlib

@dataclasses.dataclass(frozen=True)
class DockerExecutor:
    language: str

    LANGUAGE_TO_SETTINGS_MAP = {
        'python3': {
            'image': 'python:3-slim',
            'command_template': 'python /code/{filename} || true'
        },
        'javascript22': {
            'image': 'node:22-alpine',
            'command_template': 'node /code/{filename} || true',
        }
    }

    BASE_DIR = pathlib.Path(__file__).parent
    CODE_DIR = BASE_DIR / 'code'
    async def execute(self, code: str) -> str:
        client = docker.from_env()
        settings = self.LANGUAGE_TO_SETTINGS_MAP[self.language]

        with tempfile.NamedTemporaryFile(dir=self.CODE_DIR) as tmp:
            tmp.write(code.encode())
            tmp.flush()
            filename = tmp.name.split('/')[-1]

            image = settings['image']
            cmd = settings['command_template'].format(filename=filename)

            container = client.containers.run(
                image,
                cmd,
                detach=True,
                volumes={
                    f'{self.CODE_DIR}': {
                        'bind': '/code',
                        'mode': 'ro'
                    }
                }
            )
            container.wait()
            output = container.logs()

            return output.decode()
