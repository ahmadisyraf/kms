import { Table, Typography, Sheet, Box, Link, Button } from "@mui/joy";

export default function ReportTable({ reports }) {
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
        {reports?.map((d, index) => (
          <tr key={index}>
            <td>
              <Box>
                <Typography level="title-sm">{`Megah Holdings Sdn. Bhd.`}</Typography>
                <Typography level="body-xs">{`SSM: ${123456789}`}</Typography>
              </Box>
            </td>
            <td>
              <Typography level="title-sm" color="neutral">
              {`RM ${12345}`}
              </Typography>
            </td>
            <td>
              <Typography level="title-sm" color="neutral">
              {`23`}
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
