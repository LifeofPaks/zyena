import { Card, CardHeader, CardContent } from "@mui/material";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ContactTable = ({ contacts }) => {
  const contactsArr = contacts.contacts || [];
  return (
    <Card className="w-full px-3 border-none !shadow-none">
      <CardHeader
        title="All Contacts"
        className="text-[#008080]"
        titleTypographyProps={{ sx: { fontSize: "14px", fontWeight:"bold"} }}
      />

      <CardContent className="md:w-[710px] overflow-x-auto p-3 w-[360px] hide-scrollbar lg:w-full">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="bg-gray-100 !text-gray-700">
                <TableCell
                  className="lg:w-auto !min-w-[80px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Image
                </TableCell>
                <TableCell
                  className="lg:w-auto !min-w-[130px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Name
                </TableCell>
                <TableCell
                  className="lg:w-auto !min-w-[200px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Email
                </TableCell>
                <TableCell
                  className="lg:w-auto !min-w-[120px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  className="lg:w-auto !min-w-[200px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Subject
                </TableCell>
                <TableCell
                  className="lg:w-auto !min-w-[200px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Message
                </TableCell>
                <TableCell
                  className="lg:w-auto !min-w-[50px]"
                  sx={{ fontSize: "14px", color: "gray" }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contactsArr.map((contact) => (
                <TableRow key={contact._id}>
                  <TableCell>
                    <img
                      src={contact.image || "/no-image.png"}
                      alt={contact.firstName}
                      style={{ width: 50, height: 50, objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} className=" !font-thin">
                    {contact.firstName} {contact.lastName}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} className=" !font-thin">
                    {contact.email}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} className=" !font-thin">
                    {contact.phoneNumber}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} className=" !font-thin">
                    {contact.subject}
                  </TableCell>
                  <TableCell sx={{ fontSize: "13px" }} className=" !font-thin">
                    {contact.message}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => console.log("Delete", contact._id)}
                    >
                      <DeleteIcon
                        fontSize="small"
                        color="error"
                        className="t!ext-[14px]"
                      />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default ContactTable;
