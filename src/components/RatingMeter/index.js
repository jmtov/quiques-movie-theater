import React, { useState, useEffect, useMemo } from 'react';
import { bool, func, number, string } from 'prop-types';

import { ReactComponent as Star } from 'assets/star.svg';
import { INPUT_TYPES } from 'constants/form';
import { cn } from 'utils/styles';

import styles from  './styles.module.scss';

const RATING_VALUES = [1, 2, 3, 4, 5];
const SCALE_MULTIPLIER = 2;

function RatingMeter({ className, disabled, onChange, rating, readOnly, showRatingValue }) {
  const [currentSelection, setCurrentSelection] = useState(Math.round(rating));
  const normalizedCurrentSelection = useMemo(() => currentSelection / SCALE_MULTIPLIER, [currentSelection]);

  const handleChange = (event) => {
    if (readOnly || disabled) return;
    const newValue = event.target.value * SCALE_MULTIPLIER;

    setCurrentSelection(newValue);
    if (onChange) onChange(newValue);
  };

  useEffect(() => {
    setCurrentSelection(Math.round(rating));
  }, [rating]);

  return (
    <div className={cn(styles['rating-meter'], className, readOnly && styles['rating-meter--read-only'])}>
      {RATING_VALUES.map(value => (
        <div
          key={value}
          className={cn(styles['star'], normalizedCurrentSelection >= value && styles['star--checked'])}
          title={`${value} ${value > 1 ? 'stars' : 'star'}`}
        >
          <label className={styles['star__label']} htmlFor={`${value}-star`}>
            <Star className={styles['star__icon']} />
          </label>
          <input
            className={styles['star__input']}
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
      {showRatingValue && <span className={styles["rating-meter__value"]}>{`${rating} - Vote average`}</span>}
    </div>
  );
};

RatingMeter.defaultProps = {
  showRatingValue: false,
};

RatingMeter.propTypes = {
  clasName: string,
  disabled: bool,
  onChange: func,
  readOnly: bool,
  rating: number,
  showRatingValue: bool,
};

export default RatingMeter;
