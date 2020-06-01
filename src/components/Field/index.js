import React, { useEffect, useState, useCallback } from 'react';
import { func, string } from 'prop-types';

import { FIELD_COMPONENTS, INPUT_TYPES } from 'constants/form';
import { cn } from 'utils/styles';

import styles from './styles.module.scss';

function Field({ className, component, label, name, onChange, type, value: initialValue }) {
  const [value, setValue] = useState(initialValue);

  const handleChange = useCallback((event) => {
    setValue(event.target.value);

    if (onChange) {
      onChange(event);
    }
  }, [onChange]);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className={cn(styles.field, className, value ? styles['field--filled'] : null)}>
      <label className={styles['field__label']} htmlFor={name}>{label}</label>
      <input className={styles['field__input']} id={name} name={name} type={type} value={value} onChange={handleChange} />
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
