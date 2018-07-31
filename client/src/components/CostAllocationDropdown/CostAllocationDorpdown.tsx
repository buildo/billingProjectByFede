import * as React from 'react';
import { Cost, Month, Year } from 'model';
import Dropdown from 'Dropdown';
import View from 'View';
import Label from 'Label';

const yearOptions: Array<{ value: Year; label: string }> = [
  { value: '2015', label: '2015' },
  { value: '2016', label: '2016' },
  { value: '2017', label: '2017' },
  { value: '2018', label: '2018' },
];

const monthOptions: Array<{ value: Month; label: string }> = [
  { value: '01', label: 'January' },
  { value: '02', label: 'February' },
  { value: '03', label: 'March' },
  { value: '04', label: 'April' },
  { value: '05', label: 'May' },
  { value: '06', label: 'June' },
  { value: '07', label: 'July' },
  { value: '08', label: 'August' },
  { value: '09', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
];

type Props = {
  onChange: (i: keyof Cost) => (v: string) => void;
  year?: Year | undefined;
  month?: Month | undefined;
};

const CostAllocationDorpdown: React.SFC<Props> = ({
  onChange,
  month,
  year,
}) => (
  <View className="costAllocationDropdown">
    <View column>
      <Label label="Allocation month:" />

      <Dropdown
        placeholder="select a month"
        options={monthOptions}
        value={month}
        onChange={onChange('allocationMonth')}
        size="small"
      />
    </View>
    <View column>
      <Label label="Allocation year:" />
      <Dropdown
        placeholder="select a year"
        options={yearOptions}
        value={year}
        onChange={onChange('allocationYear')}
        size="small"
      />
    </View>
  </View>
);

export default CostAllocationDorpdown;
