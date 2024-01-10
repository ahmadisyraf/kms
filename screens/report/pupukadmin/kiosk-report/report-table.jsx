import { Table, Typography, Sheet, Box, Link, Button } from "@mui/joy";
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
          <th>Total Sales</th>
          <th>Total Invoices</th>
          <th></th>
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
              <Typography level="title-sm" color="neutral">
                {new Date(d.createdDate).toLocaleDateString()}
              </Typography>
            </td>
            <td>
              <Link href={`/report/pupukadmin/kiosk-report/${d.id}`}>
                <Button variant="plain">View</Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
