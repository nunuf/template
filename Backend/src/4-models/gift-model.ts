class GiftModel {
  public giftId: number;
  public targetAudienceId: number;
  public giftName: string;
  public description: string;
  public price: number;
  public discount: number;

  public constructor(gift: GiftModel) {
    this.giftId = gift.giftId;
    this.targetAudienceId = gift.targetAudienceId;
    this.giftName = gift.giftName;
    this.description = gift.description;
    this.price = gift.price;
    this.discount = gift.discount;
  }
} 

export default GiftModel;