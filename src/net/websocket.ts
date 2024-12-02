import type { WebSocketMsg } from './datatypes';
import { ReconnectingWebSocket } from './reconnecting-websocket';

export type NetContext = {
  ws: ReconnectingWebSocket;
};

export async function connectToWebSocketServer(
  serverBaseUrl: string
): Promise<NetContext> {
  const ws = new ReconnectingWebSocket(
    // `http://localhost:4000/ws?authToken=${authToken}`
    `${serverBaseUrl.replace('http', 'ws').replace('https', 'wss')}/ws`
  );
  // const { userId, username } = await getData<{
  //   userId: string;
  //   username: string;
  // }>('http://localhost:4000/api/me', {
  //   Authorization: `Bearer ${authToken}`,
  // });
  return { ws };
}

export function sendMsg(ws: ReconnectingWebSocket, msg: WebSocketMsg): void {
  ws.send(JSON.stringify(msg));
}
