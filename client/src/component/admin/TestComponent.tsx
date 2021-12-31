import React, { useEffect, useState } from 'react';
import LcMemberRegisterComponent from '../connect/LcMemberRegisterComponent';
import FgMemberTableComponent from './FgMemberTableComponent';
import LcTableComponent from './LcTableComponent';
import Select from 'react-select';
import { ActionMeta } from 'react-select';
const TestComponent: React.FC = () => {
  const [value, setValue] = useState<string>('');

  const onChange = () => {};
  return (
    <div>
      <Select
        options={[
          { value: 123, label: 123 },
          {
            value: 456,
            label: 456,
          },
        ]}
        onChange={onChange}
      ></Select>

      <input type="text" value="" onChange={onChange}></input>
    </div>
  );
};

export default TestComponent;
