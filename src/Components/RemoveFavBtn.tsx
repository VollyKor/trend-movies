import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import { removeFavMovie } from 'redux/favoriteMovies/favoriteMovies.actions';

type Props = {
  movie: any;
};

export default function RemoveFavMovieBtn({ movie }: Props) {
  const dispatch = useDispatch();
  return (
    <Button
      variant="contained"
      color="secondary"
      // @ts-ignore
      onClick={() => dispatch(removeFavMovie(movie))}
    >
      Remove from Favorite List
    </Button>
  );
}
