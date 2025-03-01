import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, Typography, Container } from '@mui/material';
import axios from 'axios';
import SeriesForm from './SeriesForm';

function SeriesList({ setIsAuthenticated }) {
  const [series, setSeries] = useState([]);
  const [editingSeries, setEditingSeries] = useState(null);

  useEffect(() => {
    fetchSeries();
  }, []);

  const fetchSeries = async () => {
    try {
      const response = await axios.get('http://localhost:3000/admin/series');
      setSeries(response.data);
    } catch (err) {
      setIsAuthenticated(false); // Logout on unauthorized
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3000/admin/series/delete/${id}`);
    fetchSeries();
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>TV Series CMS</Typography>
      <Button variant="contained" color="primary" onClick={() => setEditingSeries({ title: '', description: '', channels: '' })}>
        Add New Series
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Channels</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {series.map(s => (
            <TableRow key={s._id}>
              <TableCell>{s.title}</TableCell>
              <TableCell>{s.description}</TableCell>
              <TableCell>{s.channels.map(ch => `${ch.name}:${ch.time}`).join(', ')}</TableCell>
              <TableCell>
                <Button color="primary" onClick={() => setEditingSeries(s)}>Edit</Button>
                <Button color="secondary" onClick={() => handleDelete(s._id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingSeries && (
        <SeriesForm
          series={editingSeries}
          onSave={() => { fetchSeries(); setEditingSeries(null); }}
          onCancel={() => setEditingSeries(null)}
        />
      )}
    </Container>
  );
}

export default SeriesList;