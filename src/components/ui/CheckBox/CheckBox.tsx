import './CheckBox.css';

type CheckBoxProps = {
  name: string;
  id: string | undefined;
};

export const CheckBox: React.FC<CheckBoxProps> = ({ name, id }) => {
  return (
    <>
      <input type="checkbox" name={name} id={id} className="checkbox" />
    </>
  );
};
