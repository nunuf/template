import { useEffect, useState } from 'react';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import GiftModel from '../../../Models/GiftModel';
import TargetAudienceModel from '../../../Models/TargetAudienceModel';
import giftsService from '../../../Services/GiftsService';
import Card from '../Card/Card';

import './List.css';

const List = (): JSX.Element => {
  const [targetAudience, setTargetAudience] = useState<TargetAudienceModel[]>([]);
  const [gifts, setGifts] = useState<GiftModel[]>([]);
  const [audience, setAudience] = useState('');

  useEffect(() => {
    giftsService.getAllTargetAudience()
    .then(targetAudience => setTargetAudience(targetAudience))
  }, []);

  const showGifts = (e: SelectChangeEvent) => {
    const value = e.target.value;
    setAudience(value);
    giftsService.getGiftsByTargetAudience(+value)
    .then(gifts => setGifts(gifts))
    .catch(err => alert(err.message));
  };

  const handleGiftDeleted = (id: number): void => {
    const newGiftList = [...gifts];
    const indexToDelete = gifts.findIndex(g => g.giftId === id);
    if (indexToDelete >= 0) {
      gifts.splice(indexToDelete, 1);
    } 
    setGifts(newGiftList);
  };

  return (
    <div className="List">
      <FormControl sx={{ m: 1, minWidth: 260 }}>
        <InputLabel id="targetAudience-label" className="SelectBox">Select Target Audience</InputLabel>
        <Select
          labelId="targetAudience-label"
          label="Select Target Audience"
          onChange={showGifts}
          className="SelectBox"
          value={audience}
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
      <div>
        {
          gifts.length > 0 ?
            gifts.map(g => <Card key={g.giftId} gift={g} giftDeleted={handleGiftDeleted} />) :
            audience && <h2>No Items Found</h2>
        }
      </div>
    </div>
  );
};

export default List;
