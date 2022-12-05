import { OkPacket } from 'mysql';
import dal from '../2-utils/dal';
import { ResourceNotFoundErrorModel } from '../4-models/error-models';
import GiftModel from '../4-models/gift-model';
import TargetAudienceModel from '../4-models/target-audience-model';

const getAllTargetAudience = async (): Promise<TargetAudienceModel[]> => {
  const sql = `SELECT * FROM targetAudience`;
  const targetAudience = await dal.execute(sql);
  return targetAudience;
};

const getAllGiftsByTargetAudience = async (targetAudienceId: number): Promise<GiftModel[]> => {
  const sql = `SELECT G.*, T.targetAudienceName
                  FROM gifts AS G JOIN targetAudience AS T
                  ON G.targetAudienceId = T.targetAudienceId 
                  WHERE G.targetAudienceId = ?`;
  const gifts = await dal.execute(sql, [targetAudienceId]);
  return gifts;
};

const getOneGift = async (giftId: number): Promise<GiftModel> => {
  const sql = `SELECT G.*, T.targetAudienceName
                  FROM gifts AS G JOIN targetAudience AS T
                  ON G.targetAudienceId = T.targetAudienceId 
                  WHERE G.giftId = ?`;
  const gifts = await dal.execute(sql, [giftId]);
  const gift = gifts[0];
  return gift;
};

const addGift = async (gift: GiftModel): Promise<GiftModel> => {
  const sql = `INSERT INTO gifts VALUES(DEFAULT, ?, ?, ?, ? ,?)`;
  const info: OkPacket = await dal.execute(sql, [
    gift.targetAudienceId,
    gift.giftName,
    gift.description,
    gift.price,
    gift.discount
  ]);
  gift.giftId = info.insertId;
  return gift;
};

const editGift = async (gift: GiftModel): Promise<GiftModel> => {
  const sql = `UPDATE gifts SET
                  targetAudienceId = ?,
                  giftName = ?,
                  description = ?,
                  price =?,
                  discount = ?
                WHERE giftId = ?`;
  
  const info: OkPacket = await dal.execute(sql, [
    gift.targetAudienceId,
    gift.giftName,
    gift.description,
    gift.price,
    gift.discount,
    gift.giftId
  ]);

  if (info.affectedRows === 0) { throw new ResourceNotFoundErrorModel(gift.giftId); }
  return gift;
};

const deleteGift = async (id: number): Promise<void> => {
  const sql = `DELETE FROM gifts WHERE giftId = ?`;
  const info: OkPacket = await dal.execute(sql, [id]);
  if (info.affectedRows === 0) { throw new ResourceNotFoundErrorModel(id); }
};

export default {
  getAllTargetAudience,
  getAllGiftsByTargetAudience,
  getOneGift,
  addGift,
  editGift,
  deleteGift
};
