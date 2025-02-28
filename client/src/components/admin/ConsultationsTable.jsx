import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ConsultationsTable = ({ consultations, handleDelete }) => {
  const consultationsArr = consultations.consultations || [];

  return (
    <Card
      className="w-full px-3 border-none !shadow-none"
      sx={{ fontFamily: "Montserrat" }}
    >
      <CardHeader
        title="Consultations"
        className="text-[#d3a202]"
        titleTypographyProps={{ sx: { fontSize: "14px", fontWeight: "bold" } }}
      />
      {consultationsArr.length ? (
        <CardContent className="md:w-[710px] overflow-x-auto p-3 w-[360px] hide-scrollbar lg:w-full">
          <TableContainer  sx={{
              maxHeight: 700,
              overflow: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}>
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100 !text-gray-700">
                  <TableCell
                    className="lg:w-auto  !min-w-[170px]"
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Name
                  </TableCell>
                  {/* <TableCell className="" sx={{ fontSize: "14px", color: "#677787" }}>
                    Email
                  </TableCell> */}
                  <TableCell
                    className=""
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Phone
                  </TableCell>
                  {/* <TableCell className="" sx={{ fontSize: "14px", color: "#677787" }}>
                    State
                  </TableCell> */}
                  <TableCell
                    className="lg:w-auto  !min-w-[130px]"
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Meeting Type
                  </TableCell>
                  <TableCell
                    className="lg:w-auto  !min-w-[150px]"
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Garment Type
                  </TableCell>
                  <TableCell
                    className="lg:w-auto  !min-w-[150px]"
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    className="lg:w-auto  !min-w-[180px]"
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Time
                  </TableCell>
                  <TableCell
                    className="lg:w-auto  !min-w-[120px]"
                    sx={{ fontSize: "14px", color: "#677787" }}
                  >
                    Amount ($)
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "#677787" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {consultationsArr.map((consultation) => (
                  <TableRow key={consultation._id}>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {consultation.firstName} {consultation.lastName}
                    </TableCell>
                    {/* <TableCell   sx={{ fontSize: "14px" }}>
                      {consultation.email}
                    </TableCell> */}
                    <TableCell sx={{ fontSize: "14px" }}>
                      {consultation.phoneNumber}
                    </TableCell>
                    {/* <TableCell   sx={{ fontSize: "14px" }}>
                      {consultation.state}
                    </TableCell> */}
                    <TableCell sx={{ fontSize: "14px" }}>
                      {consultation.meetingType}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {consultation.garmentType}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {new Date(
                        consultation.consultationDate
                      ).toLocaleDateString()}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {consultation.consultationTime}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {consultation.amount}
                    </TableCell>
                    <TableCell>
                      <IconButton
                        onClick={() => handleDelete(consultation._id)}
                      >
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
          No consultations found
        </p>
      )}
    </Card>
  );
};

export default ConsultationsTable;
