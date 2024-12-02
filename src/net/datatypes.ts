export type MsgType = 'chat';

export type BaseWebSocketMsg = {
  time: number;
  channel: string;
  type: MsgType;
};

export type ChatMsg = BaseWebSocketMsg & {
  type: 'chat';
};

export type InteractMsg = BaseWebSocketMsg & {
  type: 'interact';
};

export type WebSocketMsg = ChatMsg;
export type Json = Record<string, string | boolean | number | null>;
