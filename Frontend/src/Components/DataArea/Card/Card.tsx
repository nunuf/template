import { Delete, Edit } from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import GiftModel from '../../../Models/GiftModel';
import giftsService from '../../../Services/GiftsService';

import './Card.css';

interface GiftProps {
  gift: GiftModel;
  giftDeleted: (id: number) => void;
}

const Card: React.FC<GiftProps> = ({ gift, giftDeleted }): JSX.Element => {
  const deleteGift = async (id: number) => {
    try {
      const ok = window.confirm(`Are you sure you want to delete ${gift.giftName}?`);
      if (!ok) return;
      await giftsService.deleteGift(id);
      giftDeleted(id);
    } catch(err: any) {
      alert(err.message);
    }
  };
  return (
    <div className="Card Box">
      <div onClick={() => deleteGift(gift.giftId)} className="CloseBtn"><Delete /></div>
      <NavLink to={"/edit/" + gift?.giftId} className="EditBtn"><Edit /></NavLink>
      <div>{gift.giftName} </div>
      <div>{gift.targetAudienceName} </div>
      <div className='Description'>{gift.description}</div>
      <div>${gift.price}</div>
      <div>{gift.discount} %</div>
    </div>
  );
};

export default Card;
