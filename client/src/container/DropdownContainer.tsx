import { useLayoutEffect, useRef } from 'react';

interface Props {
  name?: string;
  value: string | number;
  contents?: Array<string | number>;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DropdownContainer: React.FC<Props> = ({
  name,
  value,
  contents,
  onChange,
}: Props): JSX.Element => {
  const optionRef = useRef<HTMLOptionElement>(null);
  useLayoutEffect(() => {
    if (optionRef.current != null) {
      optionRef.current.focus();
    }
  });

  return (
    <select name={name} value={value} onChange={onChange}>
      {
        Array.from({ length: contents!.length }, (_, i) => (
          <option ref={optionRef} value={contents![i]}>
            {contents![i]}
          </option>
        )) as JSX.Element[]
      }
    </select>
  );
};

export default DropdownContainer;
