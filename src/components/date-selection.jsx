import { addMonths, format, isValid } from 'date-fns';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { DatePickerWithRange } from './ui/date-picker-with-range';

const getInitialDateState = (searchParams) => {
  const defaultDate = {
    from: new Date(),
    to: addMonths(new Date(), 1),
  };

  const from = searchParams.get('from');
  const to = searchParams.get('to');

  if (!from || !to) {
    return defaultDate;
  }
  // Neste ponto, eu tenho o "from" E o "to"
  // Eles são válidos?
  const datesAreInvalid = !isValid(new Date(from)) || !isValid(new Date(to));
  // Se não forem válidos, eu retorno o default
  if (datesAreInvalid) {
    return defaultDate;
  }
  // Neste ponto, ambas as datas são válidas
  return {
    from: new Date(from + 'T00:00:00'),
    to: new Date(to + 'T00:00:00'),
  };
};

const DateSelection = () => {
  const [searchParams] = useSearchParams();
  const [date, setDate] = useState(getInitialDateState(searchParams));
  const formatDateToQueryParam = (date) => format(date, 'yyyy-MM-dd');

  const navigate = useNavigate();
  useEffect(() => {
    // early return
    if (!date?.from || !date?.to) return;
    const queryParams = new URLSearchParams();
    queryParams.set('from', formatDateToQueryParam(date.from));
    queryParams.set('to', formatDateToQueryParam(date.to));
    navigate(`/?${queryParams.toString()}`);
  }, [navigate, date]);
  return (
    <DatePickerWithRange value={date} onChange={setDate} className="flex" />
  );
};

export default DateSelection;
