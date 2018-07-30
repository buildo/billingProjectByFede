import * as React from 'react';

const Label: React.SFC<{ label: string }> = ({ label }) => (
  <span className="label">{label}</span>
);

export default Label;
