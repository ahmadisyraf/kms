import { Table, Box, Typography, Sheet } from "@mui/joy";
export default function ApplicationTable({ applications }) {
  return (
    <Table
      aria-label="basic table"
      borderAxis="xBetween"
      size="md"
      stickyFooter={false}
      stickyHeader={false}
      variant="plain"
    >
      <thead>
        <tr>
          <th style={{ width: "40%" }}>Business</th>
          <th>Phone</th>
          <th>Status</th>
          <th>Created Date</th>
        </tr>
      </thead>
      <tbody>
        {applications?.map((d, index) => (
          <tr key={index}>
            <td>
              <Box>
                <Typography level="title-sm">{d.business.name}</Typography>
                <Typography level="body-xs">{`SSM: ${d.business.ssmNo}`}</Typography>
              </Box>
            </td>
            <td>
              <Typography level="title-sm" color="neutral">
                {`+60${d.business.phoneNo}`}
              </Typography>
            </td>
            <td>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Sheet
                  variant="solid"
                  color="primary"
                  sx={{
                    width: "fit-content",
                    color: "white",
                    px: 1,
                    py: 0.1,
                    borderRadius: 20,
                    display: "flex",
                    alignItems: "center",
                    mr: 1,
                  }}
                >
                  <Typography level="title-sm" color="white">
                    {d.status ? d.status : "Pending"}
                  </Typography>
                </Sheet>
              </Box>
            </td>
            <td>
              <Typography level="title-sm" color="neutral">
                {new Date(d.createdDate).toLocaleDateString()}
              </Typography>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
