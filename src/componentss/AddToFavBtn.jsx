import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { addFavMovie } from 'redux/favoriteMovies/favoriteMovies.actions';

export default function AddToFavBtn({ movie }) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => dispatch(addFavMovie(movie))}
    >
      Add to Favorite
    </Button>
  );
}
