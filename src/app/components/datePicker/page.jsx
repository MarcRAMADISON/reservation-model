"use client";

import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { fr } from "react-day-picker/locale";
import style from './datePicker.module.css'

function DatePicker({selected,setSelected}) {

  return (
    <div className={style.container}>
      <DayPicker
        mode="single"
        defaultMonth={new Date()}
        selected={selected}
        onSelect={setSelected}
        locale={fr}
      />
    </div>
  );
}

export default DatePicker;
