import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TableFooter,
  TablePagination,
  Button,
  TextField,
  Box,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";

const Tables = () => {
  const [movie, setMovie] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [btn, setBtn] = useState(false);
  const [input, setInput] = useState("");

  useEffect(() => {
    axios
      .get("/movies/all")
      .then((movieResponse) => {
        if (movieResponse) {
          setMovie(movieResponse.data.Movies);
          setCount(movieResponse.data.movieLength);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const eventHandler = (e: any) => {
    setInput(e.target.value);
    setBtn(true);
    axios
      .post("/movies/search", { input })
      .then((searchResponse) => {
        setMovie(searchResponse.data.searchResult);
        setCount(searchResponse.data.count);
      })
      .catch((err) => console.log(err));
  };
  const cancelSearch = (e: any) => {
    e.preventDefault();
    window.location.reload();
  };

  return (
    <div>
      <h1
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        Movies List
      </h1>

      <form action="">
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginLeft: "700px",
          }}
        >
          <SearchIcon
            sx={{
              bgcolor: "#3f51b5",
              color: "white",
              borderRadius: "50%",
              padding: "7px",
              mr: 1,
              my: 0.5,
              marginTop: "20px",
            }}
          />
          <TextField
            type="text"
            id="input-with-sx"
            label="Search movies..."
            variant="standard"
            onChange={eventHandler}
          />
          {btn ? (
            <>
              <Button onClick={cancelSearch}>
                {" "}
                <CancelIcon
                  sx={{
                    color: "grey",
                    marginTop: "10px",
                    position: "absolute",
                    marginLeft: "-80px",
                  }}
                />
              </Button>
            </>
          ) : (
            <></>
          )}
        </Box>
      </form>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 5,
          minHeight: 500,
          maxWidth: 900,
          display: "flex",
          justifyItems: "center",
          m: "auto",
          mt: "20px",
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}
              >
                id
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}
              >
                Movie Name
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}
              >
                Type
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}
              >
                Language
              </TableCell>
              <TableCell
                sx={{ bgcolor: "#3f51b5", color: "white", fontWeight: "bold" }}
              >
                Premiered
              </TableCell>
            </TableRow>
          </TableHead>

          {movie ? (
            <TableBody>
              {movie
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((val: any) => {
                  return (
                    <TableRow key={val._id}>
                      <TableCell>{val.id}</TableCell>
                      <TableCell>{val.name}</TableCell>
                      <TableCell>{val.type}</TableCell>
                      <TableCell>{val.language}</TableCell>
                      <TableCell>{val.premiered}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          ) : (
            <></>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  20,
                  50,
                  100,
                  { label: "All", value: -1 },
                ]}
                colSpan={3}
                count={count}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: {
                    "aria-label": "rows per page",
                  },
                  native: false,
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                // ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Tables;