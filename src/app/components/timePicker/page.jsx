"use client"

import style from './timePicker.module.css';

const TimePicker = ({values,handleChange}) => {
  return (
    <div className={style.futuristicTimeInput}>
      <label className={style.label} htmlFor="time">Heure :</label>
      <input 
        className={style.input} 
        type="time" 
        id="time" 
        name='time' 
        value={values?.time} 
        onChange={(e)=>{
          handleChange(e)
        }}
      />
    </div>
  );
};

export default TimePicker;
