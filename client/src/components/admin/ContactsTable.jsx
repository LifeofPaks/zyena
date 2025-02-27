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
import DeleteIcon from "@mui/icons-material/Delete";

const ContactTable = ({ contacts, handleDelete }) => {
  const contactsArr = contacts.contacts || [];

  return (
    <Card
      className="w-full px-3 border-none !shadow-none"
      sx={{ fontFamily: "Montserrat" }}
    >
      <CardHeader
        title="Contacts and messages"
        className="text-[#008080]"
        titleTypographyProps={{ sx: { fontSize: "14px", fontWeight: "bold" } }}
      />
      {contactsArr.length ? (
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
                    className="lg:w-auto !min-w-[170px]"
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
                        src={
                          contact.image ||
                          "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                        }
                        alt={contact.firstName}
                        style={{ width: 50, height: 50, objectFit: "cover" }}
                      />
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "14px" }}
                    >
                      {contact.firstName} {contact.lastName}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "14px" }}
                    >
                      {contact.email}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "14px" }}
                    >
                      {contact.phoneNumber}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "14px" }}
                    >
                      {contact.subject}
                    </TableCell>
                    <TableCell
                      sx={{ fontSize: "14px" }}
                    >
                      {contact.message.length > 25
                        ? `${contact.message.slice(0, 25)}...`
                        : contact.message}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(contact._id)}>
                        <DeleteIcon
                          fontSize="small"
                          color="error"
                          className="!text-[14px]"
                        />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      ) : (
        <p className="!text-gray-700 w-full !text-center !text-[12px] !mb-2">
          No contact or messages found
        </p>
      )}
    </Card>
  );
};

export default ContactTable;
