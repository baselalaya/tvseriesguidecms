import React, { useState } from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';

function SeriesForm({ series, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    title: series.title || '',
    description: series.description || '',
    channels: series.channels ? series.channels.map(ch => `${ch.name}:${ch.time}`).join(', ') : ''
  });

  const handleSubmit = async () => {
    try {
      if (series._id) {
        await axios.put(`http://localhost:3000/admin/series/edit/${series._id}`, formData);
      } else {
        await axios.post('http://localhost:3000/admin/series/add', formData);
      }
      onSave();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Dialog open={true} onClose={onCancel}>
      <DialogTitle>{series._id ? 'Edit Series' : 'Add Series'}</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="normal"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <TextField
          label="Description"
          fullWidth
          margin="normal"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
        <TextField
          label="Channels (e.g., AMC:20:00, Netflix:Anytime)"
          fullWidth
          margin="normal"
          value={formData.channels}
          onChange={(e) => setFormData({ ...formData, channels: e.target.value })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SeriesForm;