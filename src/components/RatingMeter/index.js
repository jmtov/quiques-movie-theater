import React, { useState, useEffect } from 'react';
import { bool, func, number, string } from 'prop-types';

import { INPUT_TYPES } from 'constants/form';
import { cn } from 'utils/styles';

import './styles.scss';

const RATING_VALUES = [1, 2, 3, 4, 5];
const SCALE_MULTIPLIER = 2;

function RatingMeter({ className, disabled, onChange, rating, readOnly }) {
  const [currentSelection, setCurrentSelection] = useState(rating);
  const normalizedCurrentSelection = currentSelection / SCALE_MULTIPLIER;

  const handleChange = (event) => {
    if (readOnly || disabled) return;
    const newValue = event.target.value * SCALE_MULTIPLIER;

    setCurrentSelection(newValue);
    if (onChange) onChange(newValue);
  };

  useEffect(() => {
    setCurrentSelection(rating);
  }, [rating]);

  return (
    <div className={cn('rating-meter', className)}>
      {RATING_VALUES.map(value => (
        <div key={value} className={'star'}>
          <label className="star__label" htmlFor={`${value}-star`}>{value}</label>
          <input
            className="star__input"
            disabled={disabled}
            type={INPUT_TYPES.CHECKBOX}
            value={value}
            name={`${value}-star`}
            id={`${value}-star`}
            checked={normalizedCurrentSelection >= value}
            title={normalizedCurrentSelection === value ? 'Remove filter' : null}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  )
}

RatingMeter.propTypes = {
  clasName: string,
  disabled: bool,
  onChange: func,
  readOnly: bool,
  rating: number
}

export default RatingMeter;
