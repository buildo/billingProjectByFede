import * as React from 'react';
import InputRaw from '@buildo/bento/components/Input';
import View from 'View';
import Label from 'Label';

import './input.scss';

const Input: React.SFC<InputRaw.Props & { label: string }> = ({
  label,
  ...props
}) => (
  <View column className="myInput">
    <Label label={label} />
    <InputRaw {...props} />
  </View>
);

export default Input;
