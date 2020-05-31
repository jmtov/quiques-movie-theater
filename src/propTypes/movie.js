import { number, shape, string } from 'prop-types';

export const moviePropType = shape({
  id: number.isRequired,
  title: string.isRequired
});
