import { useCallback, useState } from "react";

import { Button, Divider, Stack, Typography, useTheme } from "@mui/material";
import DropDown from "components/DropDown";

import { Milestone } from "../../../types";

import AddMilestoneDialog from "./AddMilestoneDialog";
import MilestonePreview from "./MilestonePreview";
import MainBox from "components/MainBox";

function MilestoneDialog({
  milestones,
  setMilestones,
  symbol
}: {
  symbol: string;
  milestones: Milestone[];
  setMilestones: React.Dispatch<React.SetStateAction<Milestone[]>>;
}) {
  const theme = useTheme();

  const [isAddingOpened, toggleAddingOpened] = useState<boolean>(false);
  const [editableMilestone, setEditableMilestone] = useState<Milestone | undefined>();

  const handleAddingClose = useCallback(() => {
    toggleAddingOpened(false);
    setEditableMilestone(undefined);
  }, []);

  const handleAddingOpen = useCallback(() => {
    toggleAddingOpened(true);
  }, []);

  const handleAdd = useCallback(
    (milestone: Milestone) => {
      setMilestones((state) => [...state, milestone]);
      setEditableMilestone(undefined);
    },
    [setMilestones]
  );

  const handleSave = useCallback(
    (milestone: Milestone, index: number) => {
      setMilestones((state) => state.map((item, _index) => (index === _index ? milestone : item)));
      setEditableMilestone(undefined);
    },
    [setMilestones]
  );

  return (
    <MainBox>
      <Stack>
        <Typography fontSize="1.5rem" fontWeight={600} mb={1}>
          Milestones Overview
        </Typography>
        <Divider sx={{ marginTop: 2, marginBottom: 3 }} />
        <Stack spacing={2.5}>
          {milestones.length ? (
            milestones.map((milestone, index) => (
              <DropDown
                key={`${Date.now()}-${milestone.name}-${milestone.deadline}-${index}`}
                title={milestone.name}
              >
                <MilestonePreview
                  amount={`${milestone.amount} ${symbol}`}
                  deadline={milestone.deadline?.getTime()}
                  onEdit={() => {
                    setEditableMilestone({ ...milestone, index });
                    handleAddingOpen();
                  }}
                  onDeleteDisabled={milestones.length === 1}
                  onDelete={() => {
                    setMilestones((state) => state.filter((_, _index) => index !== _index));
                  }}
                  description={milestone.description}
                />
              </DropDown>
            ))
          ) : (
            <Typography textAlign="center" color={theme.palette.text.secondary}>
              No Milestones
            </Typography>
          )}
        </Stack>
        <Stack spacing={2.5} alignItems="center" mt={{ xs: 2, sm: 6 }}>
          <Button variant="contained" sx={{ width: "fit-content" }} onClick={handleAddingOpen}>
            Add another Milestone
          </Button>
        </Stack>
      </Stack>
      <AddMilestoneDialog
        symbol={symbol}
        defaultMilestone={editableMilestone}
        opened={isAddingOpened}
        onClose={handleAddingClose}
        onSave={handleSave}
        onAdd={handleAdd}
      />
    </MainBox>
  );
}

export default MilestoneDialog;
