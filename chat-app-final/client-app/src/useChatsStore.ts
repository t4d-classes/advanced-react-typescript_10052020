import {
  useEffect,
  useRef,
  useCallback,
  useState,
  ChangeEvent,
  FormEvent,
} from "react";
import { partial } from "lodash";

import { Message } from "./models";
import {
  receiveChatMessage,
  sendChatMessage,
  openSocket,
  onChatMessage,
} from "./chats";

const partial = (fn: Function, ...boundParams: any[]) => {

  return (...params: any[]) => {
    return fn(...boundParams, ...params);
  };

}


export const useChatsStore = () => {
  const socketRef = useRef<SocketIOClient.Socket | null>(null);
  const [message, setMessage] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const receiveChatMessageCallback = useCallback(
    receiveChatMessage(setMessages, messages),
    [messages]
  );

  const sendChatMessageCallback = useCallback(
    sendChatMessage(socketRef, setMessage),
    []
  );

  useEffect(partial(openSocket, socketRef), []);

  useEffect(partial(onChatMessage, socketRef, receiveChatMessageCallback), [
    receiveChatMessageCallback,
  ]);

  const messageChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => setMessage(e.target.value),
    []
  );

  const sendMessage = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      sendChatMessageCallback(message);
    },
    [sendChatMessageCallback, message]
  );

  return {
    messages,
    message,
    messageChange,
    sendMessage,
  };
};
