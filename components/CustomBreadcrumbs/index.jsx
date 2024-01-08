import { Breadcrumbs } from "@mui/joy";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CustomBreadcrumbs({ breadcrumbs }) {
  return (
    <Breadcrumbs
      separator={<IoIosArrowForward />}
      aria-label="breadcrumbs"
      sx={{ px: 0 }}
    >
      {breadcrumbs.map((item, index) => (
        <Link key={index} color="neutral" href={item.link}>
          {item.name}
        </Link>
      ))}
    </Breadcrumbs>
  );
}
