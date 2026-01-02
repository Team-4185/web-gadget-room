import type { FC } from 'react';

type CheckBoxProps = {
  name: string;
  id: string | undefined;
};

export const CheckBox: FC<CheckBoxProps> = ({ name, id }) => {
  return (
    <>
      <input type="checkbox" name={name} id={id} className="checkbox" />
    </>
  );
};
