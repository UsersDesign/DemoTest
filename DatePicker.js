import React from 'react'
import DatePicker from "react-datepicker";

// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

import "react-datepicker/dist/react-datepicker.css";

export const DatePickerComponent = ({onChange, startDate}) => {
  return (
    <DatePicker className="form-control mb-3"selected={startDate} onChange={onChange} />
  )
}
