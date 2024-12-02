export type MessagePayload = {
  id: string;
  time: number;
  user_id: string;
  username: string;
  text: string;
  channel: string;
  reply_to?: string;
};
