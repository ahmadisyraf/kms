import { Table, Typography, Sheet, Box, Link, Button } from "@mui/joy";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

export default function ApplicationTable({ applications, search }) {
  const router = useRouter();
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const handleDelete = async (applicationId) => {
    try {
      const loadingToast = toast.loading("Loading, please wait");
      const deleteApplication = await fetch(
        `/api/application/${applicationId}`,
        {
          method: "DELETE",
        }
      );

      if (!deleteApplication.ok) {
        toast.error("Something wrong, please contact our support", {
          id: loadingToast,
        });
      } else if (deleteApplication.ok) {
        toast.success(`Application: ${applicationId} deleted`, {
          id: loadingToast,
        });

        // router.reload();
        const deleted = await deleteApplication.json();

        console.log(deleted, "..hehe");
      }
    } catch (err) {
      toast.error("Something wrong, please contact our support", {
        id: loadingToast,
      });
    }
  };

  const filteredApplications = search
    ? applications.filter((app) =>
        app.business.name.toLowerCase().includes(search.toLowerCase())
      )
    : applications;

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
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {filteredApplications.map((d, index) => (
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
                  color={
                    d.status === "approve"
                      ? "success"
                      : d.status === "reject"
                      ? "danger"
                      : "primary"
                  }
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
                    {d.status ? capitalizeFirstLetter(d.status) : "Pending"}
                  </Typography>
                </Sheet>
              </Box>
            </td>
            <td>
              <Typography level="title-sm" color="neutral">
                {new Date(d.createdDate).toLocaleDateString()}
              </Typography>
            </td>
            <td>
              <Link href={`/kiosk-application/admin/view-application/${d.id}`}>
                <Button variant="plain">View</Button>
              </Link>
            </td>
            <td>
              <Button
                variant="plain"
                color="danger"
                onClick={() => handleDelete(d.id)}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
