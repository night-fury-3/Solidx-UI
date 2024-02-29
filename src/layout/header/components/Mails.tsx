// import { Badge } from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import { Badge } from "@mui/material";

// import SMS from "assets/icons/SMS";

function Mails() {
  // const theme = useTheme();

  return (
    // <Badge badgeContent="" color="primary">
    //   <Box height={42} p={1.5} borderRadius={2.5} bgcolor={theme.palette.background.default}>
    //     <SMS />
    //   </Box>
    // </Badge>
    // <MailIcon color="action" />
    
    <Badge color="secondary" badgeContent={0}>
      <MailIcon sx={{width: 0, height: 0}}/>
    </Badge>
  );
}

export default Mails;



