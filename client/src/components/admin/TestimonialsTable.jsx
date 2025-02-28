import React from "react";
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

const TestimonialsTable = ({ testimonials, handleDelete }) => {
  return (
    <Card
      className="w-full px-3 border-none !shadow-none"
      sx={{ fontFamily: "Montserrat" }}
    >
      <CardHeader
        title="Testimonials"
        className="text-[#d3a202]"
        titleTypographyProps={{ sx: { fontSize: "14px", fontWeight: "bold" } }}
      />
      {testimonials.length ? (
        <CardContent className="md:w-[710px] overflow-x-auto p-3 w-[360px] hide-scrollbar lg:w-full">
          <TableContainer
            sx={{
              maxHeight: 700,
              overflow: "auto",
              scrollbarWidth: "none",
              "&::-webkit-scrollbar": { display: "none" },
            }}
          >
            <Table>
              <TableHead>
                <TableRow className="bg-gray-100 !text-gray-700">
                  <TableCell sx={{ fontSize: "14px", color: "gray" }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "gray" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "gray" }}>
                    Message
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "gray" }}>
                    Rating
                  </TableCell>
                  <TableCell sx={{ fontSize: "14px", color: "gray" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testimonials.map((testimonial) => (
                  <TableRow key={testimonial._id}>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {testimonial.name}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {testimonial.title}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {testimonial.message.length > 25
                        ? `${testimonial.message.slice(0, 25)}...`
                        : testimonial.message}
                    </TableCell>
                    <TableCell sx={{ fontSize: "14px" }}>
                      {testimonial.rating}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => handleDelete(testimonial._id)}>
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
          No testimonials available.
        </p>
      )}
    </Card>
  );
};

export default TestimonialsTable;
