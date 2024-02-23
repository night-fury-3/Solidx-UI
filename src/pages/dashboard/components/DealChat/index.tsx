import { useContext, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Button, Divider, Stack, Typography } from "@mui/material";

import MainBox from "components/MainBox";
import { ChatContext } from "contexts/ChatProvider";

import DealChatPreview from "./DealChatPreview";
import DealLiveChat from "./DealLiveChat";

function DealChat() {
  const { connections, isConnected } = useContext(ChatContext);
  const [params] = useSearchParams();

  useEffect(() => {
    console.log(connections, isConnected, params);
  }, [connections, isConnected, params]);

  return (
    <MainBox>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography fontSize={24} lineHeight="56px">
          Deal Chat
        </Typography>
        <Button variant="contained">View All</Button>
      </Stack>
      <Divider sx={{ marginTop: 2, marginBottom: 2.5 }} />
      <Stack spacing={2}>
        {connections.length ? (
          connections.map((preview, index) =>
            preview.account === params.get("chat_partner") ? (
              <DealLiveChat
                key={`deal-chat-${Date.now()}-${index}`}
                partner={params.get("chat_partner") as `0x${string}`}
              />
            ) : (
              <DealChatPreview key={`deal-chat-${Date.now()}-${index}`} preview={preview} />
            )
          )
        ) : isConnected && params.get("chat_partner") ? (
          <DealLiveChat partner={params.get("chat_partner") as `0x${string}`} />
        ) : (
          <Typography align="center">No messages</Typography>
        )}
      </Stack>
    </MainBox>
  );
}

export default DealChat;
