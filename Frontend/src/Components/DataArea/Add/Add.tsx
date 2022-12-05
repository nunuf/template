import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { Clear, Close, Send } from '@mui/icons-material';
import GiftModel from '../../../Models/GiftModel';
import TargetAudienceModel from '../../../Models/TargetAudienceModel';
import giftsService from '../../../Services/GiftsService';

import './Add.css';

const Add = (): JSX.Element => {
  const { handleSubmit, register } = useForm<GiftModel>();
  const [targetAudience, setTargetAudience] = useState<TargetAudienceModel[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    giftsService.getAllTargetAudience()
    .then(targetAudience => setTargetAudience(targetAudience))
    .catch(err => alert(err.message));
  }, []);

  const send = async (gift: GiftModel) => {
    try {
      await giftsService.addGift(gift);
      alert('Gift successfully added');
      navigate('/gifts');
    } catch (err: any) {
      alert(err.message)
    }
  };

  return (
    <div className="Add Box">
      <div className='Title'>Add</div>
      <NavLink to="/gifts" className="Close"><Close /></NavLink>
      <form onSubmit={handleSubmit(send)}>
        <FormControl fullWidth>
          <InputLabel id="targetAudience-label" className="SelectBox">Select Target Audience</InputLabel>
          <Select
            labelId="targetAudience-label"
            label="Select Target Audience"
            className="SelectBox"
            {...register('targetAudienceId')}
            required
          >
            {
              targetAudience.map(t =>
                <MenuItem key={t.targetAudienceId} value={t.targetAudienceId}>
                  {t.targetAudienceName}
                </MenuItem>
              )
            }
          </Select>
        </FormControl>

        <TextField
          required
          variant="outlined"
          fullWidth
          label="Gift Name"
          className="TextBox"
          {...register('giftName')}
          InputProps={{ inputProps: { minLength: 2, maxLength: 30 } }}
        />
        <TextField
          required
          multiline
          maxRows={3}
          type='text'
          variant="outlined"
          fullWidth
          label="Description"
          className="TextBox"
          {...register('description')}
        />
        <TextField
          required
          type='number'
          variant="outlined"
          fullWidth
          label="Price"
          className="TextBox"
          {...register('price')}
          InputProps={{ inputProps: { min: 1 } }}
        />
        <TextField
          required
          variant="outlined"
          type='number'
          fullWidth
          label="Discount"
          className="TextBox"
          {...register('discount')}
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />}>Add</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default Add;
