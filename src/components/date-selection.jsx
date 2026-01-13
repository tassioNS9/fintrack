import { addMonths } from 'date-fns';
import { useState } from 'react';

import { DatePickerWithRange } from './ui/date-picker-with-range';

const DateSelection = () => {
  const [date, setDate] = useState({
    from: new Date(),
    to: addMonths(new Date(), 1),
  });
  console.log(date);
  return (
    <DatePickerWithRange value={date} onChange={setDate} className="flex" />
  );
};

export default DateSelection;
