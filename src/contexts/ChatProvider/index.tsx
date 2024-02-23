import { ReactNode, createContext, useCallback, useEffect, useMemo, useState } from "react";

import axios from "axios";
import { io, type Socket } from "socket.io-client";
import type { Address } from "viem";
import { useAccount, useSignMessage } from "wagmi";

import { Message, User } from "types";

export type TChatContext = {
  connections: User[];
  getChat: (partner: Address, timestamp: number) => void;
  isConnected: boolean;
  messages?: Message[];
  newMessage?: Message;
  sendMessage: (to: Address, message: string) => void;
  socket?: Socket;
};

export const ChatContext = createContext<TChatContext>({
  connections: [],
  getChat: (_, __) => {},
  isConnected: false,
  sendMessage: (_, __) => {}
});

export default function ChatProvider({ children }: { children: ReactNode }) {
  const {
    address: account,
    isConnected: isWalletConnected,
    isReconnecting,
    isConnecting
  } = useAccount();
  const { signMessage, data: signedMessage } = useSignMessage();
  const [accessToken, setAccessToken] = useState<string>();
  const [socket, setSocket] = useState<Socket>();
  const [connections, setConnections] = useState<User[]>([]);
  const [newMessage, _setNewMessage] = useState<Message>();
  const [messages, _setMessages] = useState<Message[]>();

  const isConnected = useMemo(() => accessToken !== undefined, [accessToken]);

  useEffect(() => {
    const init = async () => {
      try {
        signMessage({
          message: JSON.stringify({ version: "1.0.0", project: "Solidx" })
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (account && isWalletConnected && !isReconnecting && !isConnecting) {
      init();
    }
  }, [account, signMessage, isWalletConnected, isReconnecting, isConnecting]);

  useEffect(() => {
    if (signedMessage) {
      axios
        .post(process.env.REACT_APP_BACKEND_HTTP || "", {
          signature: signedMessage,
          account
        })
        .then((res) => {
          console.log(res.data.accessToken);
          setAccessToken(res.data.accessToken);
        })
        .catch((error) => {
          console.log(error);
          setAccessToken(undefined);
        });
    }
  }, [account, signedMessage]);

  useEffect(() => {
    if (accessToken) {
      console.log("Connection...");
      const _socket = io(process.env.REACT_APP_BACKEND_WS || "", {
        transports: ["websocket"],
        query: {
          token: accessToken
        }
      });

      _socket.on("connections", (data) => {
        setConnections(data);
      });

      _socket.on("message_checked", (data) => {
        console.log(data);
      });

      setSocket(_socket);
    }
  }, [accessToken]);

  useEffect(() => {
    if (socket) {
      socket.emit("connections");
    }
  }, [socket]);

  const getChat = useCallback(
    async (partner: Address, timestamp: number) => {
      if (socket) {
        socket.emit("messages", { partner, timestamp });
      }
    },
    [socket]
  );

  const sendMessage = useCallback(
    async (to: Address, message: string) => {
      if (socket) {
        socket.emit("send", { to, message });
        return new Promise<void>((resolve) => resolve());
      }
    },
    [socket]
  );

  return (
    <ChatContext.Provider
      value={{ connections, getChat, isConnected, messages, newMessage, sendMessage, socket }}
    >
      {children}
    </ChatContext.Provider>
  );
}
