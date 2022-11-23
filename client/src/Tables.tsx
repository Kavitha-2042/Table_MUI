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
  IconButton,
  InputBase,
  Button,
  TextField
} from "@mui/material";

import SearchIcon from '@mui/icons-material/Search';

const Tables = () => {
  const [movie, setMovie] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [btn,setBtn] = useState(false)
  const [input,setInput] = useState("")

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

  // Avoid a layout jump when reaching the last page with empty rows.

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

     {
      btn?
      <>
      <form action="">

      <TextField style={{marginLeft:"1200px"}} onChange={(e:any)=>setInput(e.target.value)} value={input}/>
      </form>
      </>
      :
      <>
      <Button onClick={()=>{setBtn(true)}} style={{marginLeft:"1300px"}}><SearchIcon sx={{bgcolor:"#3f51b5",color:"white",borderRadius:"50%",padding:"10px"}} /></Button>
      </>
     }

      
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 5,
          minHeight: "481px",
          maxWidth: 950,
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
                Name
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
      <h1>{input}</h1>
    </div>
  );
};

export default Tables;
