import { useCallback, useContext, useEffect, useRef, useState } from "react";

import { Box, Divider, IconButton, Stack, TextField, Typography, useTheme } from "@mui/material";
import { Address } from "viem";

import SendIcon from "assets/icons/Send";
import LogoIcon from "components/LogoIcon";
import { ChatContext } from "contexts/ChatProvider";
import { Message } from "types";
import { useAccount } from "wagmi";

function DealLiveChat({ partner }: { partner: Address }) {
  const theme = useTheme();
  const { newMessage, sendMessage, socket } = useContext(ChatContext);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const { address: account } = useAccount();
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allMessagesListener = (data: Message[]) => {
      setMessages(data);
    };
    const receiveMessage = (data: Message) => {
      setMessages((state) => [...state, data]);
    };

    if (socket) {
      socket.on("messages", allMessagesListener);
      socket.on("receive", receiveMessage);
      socket.emit("messages", { partner, timestamp: 0 });
    }
    return () => {
      if (socket) {
        socket.off("messages", allMessagesListener);
        socket.off("receive", receiveMessage);
      }
    };
  }, [partner, socket]);

  useEffect(() => {
    if (messages.length > 0 && chatRef.current) {
      chatRef.current.scrollTo({ top: chatRef.current.scrollHeight });
    }
  }, [messages]);

  const handleSend = useCallback(() => {
    sendMessage(partner, inputValue);
    setInputValue("");
  }, [inputValue, partner, sendMessage]);

  useEffect(() => {
    if (
      (newMessage?.from === account && newMessage?.to === partner) ||
      (newMessage?.to === account && newMessage?.from === partner)
    ) {
      setMessages((state) => [...state, newMessage]);
    }
  }, [account, newMessage, partner]);

  return (
    <Stack
      bgcolor={theme.palette.background.default}
      p={{ sm: 4, xs: 2 }}
      borderRadius={5}
      spacing={3}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Box width={50} height={50}>
          <LogoIcon title="EC" alt="avatar" height={50} width={50} src="https://" />
        </Box>
        <Typography>{partner}</Typography>
      </Stack>
      <Divider />
      <Box
        ref={chatRef}
        maxHeight={300}
        sx={{
          overflowY: "auto",
          "&::-webkit-scrollbar": { width: 8, borderRadius: 4 },
          "&::-webkit-scrollbar-track": {
            background: theme.palette.background.paper,
            borderRadius: 4
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: `${theme.palette.primary.main}A0`,
            borderRadius: 4,
            border: 0
          }
        }}
        pr={1}
      >
        <Stack spacing={3}>
          {messages.map((message, index) => (
            <Stack
              direction="row"
              justifyContent={message.from === account ? "end" : "start"}
              key={`message-${Date.now()}-${index}`}
            >
              <Stack>
                <Box
                  maxWidth={500}
                  borderRadius={2}
                  p={1.25}
                  sx={{
                    background:
                      "linear-gradient(0deg, #2E2E2E -78.15%, rgba(46, 46, 46, 0.00) 112.14%)"
                  }}
                >
                  {message.message}
                </Box>
                <Typography align="right" pr={0.5}>
                  {new Date(Number(message.timestamp)).toTimeString().slice(0, 5)}
                </Typography>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        borderRadius={100}
        px={{ sm: 3, xs: 1.5 }}
        py={1.25}
        sx={{
          background: "linear-gradient(0deg, #2E2E2E -78.15%, rgba(46, 46, 46, 0.00) 112.14%)"
        }}
      >
        <TextField
          value={inputValue}
          onChange={(event) => {
            setInputValue(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.stopPropagation();
              event.preventDefault();
              handleSend();
            }
          }}
          variant="standard"
          placeholder="Type a message..."
          sx={{ flex: "1 1" }}
        />
        <IconButton size="small" onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Stack>
    </Stack>
  );
}

export default DealLiveChat;
