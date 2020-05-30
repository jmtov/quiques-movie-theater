import React, { useEffect, useState, useCallback } from 'react';
import { func, string } from 'prop-types';

import { FIELD_COMPONENTS, INPUT_TYPES } from 'constants/form';
import { cn } from 'utils/styles';

import './styles.scss';

function Field({ className, component, label, name, onChange, type, value: initialValue }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((event) => {
    setValue((value) => value);

    if (onChange) {
      onChange(event);
    }
  }, [onChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={cn("field", className)}>
      <label className="field__label" htmlFor={name}>{label}</label>
      <input className="field__input" id={name} name={name} type={type} value={value} onChange={handleChange} />
    </div>
  )
}

Field.propTypes = {
  className: string,
  component: string,
  label: string,
  name: string,
  onChange: func,
  type: string
}

Field.defaultProps = {
  component: FIELD_COMPONENTS.INPUT,
  type: INPUT_TYPES.TEXT
}

export default Field;
