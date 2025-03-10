import { useParams } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor/CodeEditor";

export default function RoomPage() {
  const { roomId } = useParams();
  return (
    <>
      <CodeEditor roomId={roomId} />
    </>
  );
}
