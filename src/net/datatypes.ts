import type { MessagePayload } from '../chat/datatypes';

export type MsgType = 'chat';

export type BaseWebSocketMsg = {
  time: number;
  channel: string;
  type: MsgType;
};

export type ChatMsg = BaseWebSocketMsg & {
  type: 'chat';
  payload: Omit<MessagePayload, 'id'>;
};

export type InteractMsg = BaseWebSocketMsg & {
  type: 'interact';
};

export type WebSocketMsg = ChatMsg;
export type Json = Record<string, string | boolean | number | null>;
