import type {
  PaymentMethod,
  PaymentMethodConfig,
  PaymentFormErrors,
  PaymentFormValues,
  PaymentFieldsKey,
} from '../../../core/types/payment';
import { PaymentMethodAccordion } from './PaymentMethodAccordion';

type Props = {
  methods: PaymentMethodConfig[];
  years: number[];
  selectedMethod: PaymentMethod;
  onSelect: (m: PaymentMethod) => void;

  values: PaymentFormValues;
  errors: PaymentFormErrors;

  setField: (method: PaymentMethod, field: PaymentFieldsKey, value: string) => void;
};

export const PaymentMethodList = ({
  methods,
  years,
  selectedMethod,
  onSelect,
  values,
  errors,
  setField,
}: Props) => {
  return (
    <>
      {methods.map((cfg) => (
        <PaymentMethodAccordion
          key={cfg.method}
          method={cfg.method}
          title={cfg.title}
          iconCount={cfg.iconCount}
          className={cfg.className}
          ids={cfg.ids}
          years={years}
          selectedMethod={selectedMethod}
          onSelect={onSelect}
          values={values[cfg.method]}
          errors={errors[cfg.method]}
          onChange={(field, value) => setField(cfg.method, field, value)}
        />
      ))}
    </>
  );
};
