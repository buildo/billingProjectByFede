import * as React from 'react';
import InputRaw from '@buildo/bento/components/Input';
import View from 'View';

import './input.scss';

const Input: React.SFC<InputRaw.Props & { label: string }> = ({
  label,
  ...props
}) => (
  <View column className="myInput">
    <span className="label">{label}</span>
    <InputRaw {...props} />
  </View>
);

export default Input;
