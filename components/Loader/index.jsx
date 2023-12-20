import { Box, CircularProgress, Typography } from "@mui/joy";

export default function Loader() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress color="primary" determinate={false} variant="soft" />
      <Typography level="body-md" mt={2}>
        It&rsquo;ll just take a momment, please wait.
      </Typography>
    </Box>
  );
}
