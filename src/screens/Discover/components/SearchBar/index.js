import React from 'react';
import { func, string } from 'prop-types';

import { INPUT_TYPES } from 'constants/form';
import { debounce } from 'utils/debounce';
import Field from 'components/Field';

import { DISCOVER_FIELDS } from '../../constants';

function SearchBar({ className, onSearch }) {
  const debouncedChange = debounce((event) => {
    onSearch(event.target.value);
  });

  const handleChange = (event) => {
    event.persist();
    debouncedChange(event);
  };

  return (
    <Field
      className="section__search-input"
      type={INPUT_TYPES.SEARCH}
      name={DISCOVER_FIELDS.SEARCH}
      label="Look for a movie"
      onChange={handleChange}
    />
  );
};

SearchBar.propTypes = {
  className: string,
  onSearch: func.isRequired,
};

export default SearchBar;
