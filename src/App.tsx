import {
  type ChangeEvent,
  type FormEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const BASE_URL = 'http://localhost:3000';

const USER = {
  user_id: '01935bfd-357c-7b04-b466-1f292b9a7d54',
  username: 'doingus',
};

type Message = {
  id: string;
  time: number;
  user_id: string;
  username: string;
  text: string;
  reply_to: string | null;
};

function App(): JSX.Element {
  const [loaded, setLoaded] = useState(false);
  const [messages, setMessages] = useState<Message[]>();
  const loadingRef = useRef(false);

  const [pendingMessage, setPendingMessage] = useState('');
  const pendingMessageRef = useRef(pendingMessage);
  pendingMessageRef.current = pendingMessage;

  const isSendingRef = useRef(false);

  useEffect(() => {
    async function fetchMessages(): Promise<Message[]> {
      const res = await fetch(`${BASE_URL}/messages`);
      const parsed = (await res.json()) as Message[];
      return parsed;
    }

    if (!loaded && !loadingRef.current) {
      // Set loading to true
      loadingRef.current = true;

      // Fetch
      fetchMessages()
        .then((messages) => {
          setMessages(messages);
          setLoaded(true);
        })
        .catch(console.error)
        .finally(() => {
          loadingRef.current = false;
        });
    }
  }, [loaded]);

  const sendMessage = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSendingRef.current) {
      return;
    }
    fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        time: Date.now(),
        ...USER,
        text: pendingMessageRef.current,
      } satisfies Partial<Message>),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(() => {
        setLoaded(false);
        setPendingMessage('');
      })
      .catch(console.error);
  }, []);

  return (
    <div>
      <div>
        {messages?.length ? (
          messages.map((message) => <p key={message.id}>{message.text}</p>)
        ) : (
          <p>No messages to show</p>
        )}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          name="message"
          value={pendingMessage}
          onChange={useCallback((event: ChangeEvent<HTMLInputElement>) => {
            setPendingMessage(event.target.value);
          }, [])}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
