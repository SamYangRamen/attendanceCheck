import React from 'react';

interface Props {
  name: string;
  children?: React.ReactNode | React.ReactNodeArray;
}

const DialogContainer = ({ name, children }: Props): JSX.Element => {
  return <div>{children}</div>;
};

DialogContainer.defaultProps = {
  name: '',
  children: undefined,
};

export default DialogContainer;
