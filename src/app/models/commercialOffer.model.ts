import { Offer } from './offer.model';

export class CommercialOffer {

  private offers: Offer[];

  constructor(commercialOffer: CommercialOffer) {
    this.offers = commercialOffer.offers;
  }

  public bestPrice(total: number): number {
    let min = this.offerSwitch(total, this.offers[0]);
    for (let i = 1; i < this.offers.length; i++) {
      const minCost = this.offerSwitch(total, this.offers[i]);
      if (minCost < min) {
        min = minCost;
      }
    }
    return min;
  }

  private offerSwitch(total: number, offer: Offer): number {
    switch (offer.type) {
      case 'percentage':
        return total * ((100 - offer.value) / 100);
      case 'minus':
        return total - offer.value;
      case 'slice':
        return total - (Math.floor(total / offer.sliceValue) * offer.value);
    }
  }

}
