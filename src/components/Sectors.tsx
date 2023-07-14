import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const Sectors = () => {
  const [sectors, setSectors] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const data = await supabase
        .from('sectors')
        .select('*');

      setSectors(data);
      return data
    }

    fetchData()
  }, [])

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Cidade</TableCell>
              <TableCell align="right">Estado</TableCell>
              <TableCell align="left">Descrição</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(sectors?.data || []).map((sector) => (
              <TableRow
                key={sector.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {sector.name}
                </TableCell>
                <TableCell align="right">{sector.city}</TableCell>
                <TableCell align="right">{sector.state}</TableCell>
                <TableCell align="left">{sector.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Sectors;
