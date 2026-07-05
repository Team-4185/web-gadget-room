import { MasterCard } from '@/assets';

import './PaymentCardPreview.css';

type PaymentCardPreviewProps = {
  cardHolderName: string;
  numberGroups: string[];
};

export const PaymentCardPreview = ({ cardHolderName, numberGroups }: PaymentCardPreviewProps) => (
  <div className="payment-card-preview" aria-hidden="true">
    <div className="payment-card-preview__chip" />
    <div className="payment-card-preview__signal" />
    <div className="payment-card-preview__stripes" />
    <div className="payment-card-preview__number">
      {numberGroups.map((group, index) => (
        <span key={`${group}-${index}`}>{group}</span>
      ))}
    </div>
    <div className="payment-card-preview__bottom">
      <span>{cardHolderName || 'Cardholder'}</span>
      <MasterCard />
    </div>
  </div>
);
