import { RefObject, MutableRefObject } from "react";
import io from "socket.io-client";
import { curry, isNull } from "lodash";

import { Message } from "./models";

export const CHAT_MESSAGE_EVENT = "chat message";

export const receiveChatMessage = curry(function (
  setMessages: (messages: Message[]) => void,
  messages: Message[],
  message: string
) {
  setMessages([
    ...messages,
    {
      id: Math.max(...messages.map((m) => m.id), 0) + 1,
      message,
    },
  ]);
});

export const sendChatMessage = curry(function (
  socketRef: RefObject<SocketIOClient.Socket | null>,
  setMessage: (message: string) => void,
  message: string
) {
  if (isNull(socketRef.current)) return;
  socketRef.current.emit(CHAT_MESSAGE_EVENT, message);
  setMessage("");
});

export function openSocket(
  socketRef: MutableRefObject<SocketIOClient.Socket | null>
) {
  const socket = io();
  socketRef.current = socket;

  return function closeSocket() {
    socketRef.current!.close();
    socketRef.current = null;
  };
}

export function onChatMessage(
  socketRef: RefObject<SocketIOClient.Socket | null>,
  receiveChatMessageCallback: (message: string) => void
) {
  const socket = socketRef.current;
  if (isNull(socket)) return;

  const localReceiveChatMessageCallback = receiveChatMessageCallback;

  socket.on(CHAT_MESSAGE_EVENT, localReceiveChatMessageCallback);

  return function offChatMessage() {
    const socket = socketRef.current;
    if (isNull(socket)) return;

    socket.off(CHAT_MESSAGE_EVENT, localReceiveChatMessageCallback);
  };
}
