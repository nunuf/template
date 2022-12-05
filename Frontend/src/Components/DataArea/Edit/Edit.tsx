import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Clear, Close, Send } from '@mui/icons-material';
import GiftModel from '../../../Models/GiftModel';
import TargetAudienceModel from '../../../Models/TargetAudienceModel';
import giftsService from '../../../Services/GiftsService';

import './Edit.css';

const Edit = (): JSX.Element => {
  const { register, handleSubmit, setValue } = useForm<GiftModel>({ mode: "onChange" });
  const [targetAudience, setTargetAudience] = useState<TargetAudienceModel[]>([]);
  const [targetAudienceId, setTargetAudienceId] = useState<string>('');
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    giftsService.getAllTargetAudience()
      .then(targetAudience => setTargetAudience(targetAudience))
      .catch(err => alert(err.message));
  }, []);

  useEffect(() => {
    const id = +params.giftId;
    giftsService.getOneGift(id)
      .then(g => {
        setValue('giftId', g.giftId);
        setValue('targetAudienceId', g.targetAudienceId);
        setValue('giftName', g.giftName);
        setValue('description', g.description);
        setValue('price', g.price);
        setValue('discount', g.discount);
        setTargetAudienceId(String(g.targetAudienceId));
      })
      .catch(err => alert(err.message));
  }, []);

  const handleChange = (event: SelectChangeEvent) => {
    setTargetAudienceId(event.target.value);
  };

  const send = async (gift: GiftModel) => {
    try {
      const giftToUpdate = { ...gift, targetAudienceId: +targetAudienceId };
      await giftsService.editGift(giftToUpdate);
      alert('Gift successfully updated');
      navigate('/gifts');
    } catch (err: any) {
      alert(err.message)
    }
  };

  return (
    <div className="Edit Box">
      <div className='Title'>Edit</div>
      <NavLink to="/gifts" className="Close"><Close /></NavLink>
      <form onSubmit={handleSubmit(send)}>
        <input type="hidden" {...register('giftId')} />
        <FormControl fullWidth>
          <InputLabel id="targetAudienceEdit-label" className="SelectBox">Select Target Audience</InputLabel>
          <Select
            labelId="targetAudienceEdit-label"
            label="Select Target Audience"
            className="SelectBox"
            onChange={handleChange}
            value={targetAudienceId}
          >
            {
              targetAudience.map(t =>
                <MenuItem key={'Edit'+t.targetAudienceId} value={t.targetAudienceId}>
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
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          required
          type='number'
          variant="outlined"
          fullWidth
          label="Price"
          className="TextBox"
          {...register('price')}
          InputLabelProps={{ shrink: true }}
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
          InputLabelProps={{ shrink: true }}
          InputProps={{ inputProps: { min: 0, max: 100 } }}
        />

        <ButtonGroup variant="contained" fullWidth>
          <Button color="primary" type="submit" startIcon={<Send />}>Edit</Button>
          <Button color="secondary" type="reset" startIcon={<Clear />}>Clear</Button>
        </ButtonGroup>
      </form>
    </div>
  );
};

export default Edit;
