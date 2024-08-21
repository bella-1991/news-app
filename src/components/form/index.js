import React from 'react';
import styles from './form.module.scss';
import Collapse from '../collapse';

const Form = ({
  field,
  handleChange,
  stateFilters,
  defaults,
}) => {
  const { id, label } = field;
  
  const getField = (field, handleChange, stateFilters, defaults) => {
    const { type, id, code, value, translationKey, label, placeholder, showDefault, ...props } = field;
  
    switch (type) {
      case 'select':
        return (
          <select
            id={id}
            aria-label={id}
            name={id}
            defaultValue={stateFilters[id]}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          >
            {showDefault && <option value=''>All</option>}
            {field?.options && field?.options.map((option) => (
              <option key={option.code} value={option.code}>
                {option.value}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            name={id}
            id={id}
            type={type}
            aria-describedby={id}
            {...props}
            value={stateFilters[id]}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            autoComplete={id}
          />
        );
    }
  };
  
  return stateFilters && (
    <div className={`${styles.formGroup || ''} ${(!field.twoCol && styles.fullWidth) || ''}`}>
      <Collapse 
        btnText={<label htmlFor={id}>{label}</label>}
        content={(
          <>
            {getField(field, handleChange, stateFilters, defaults)}
          </>
        )}
      />
    </div>
  )
}
export default Form;