import { useState } from 'react';
import { styled, alpha } from '@material-ui/core/styles';
import { InputBase } from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { BsSearch as SearchIcon } from 'react-icons/bs';

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  paddingLeft: '30px',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.3),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.3),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const SearchForm = () => {
  const history = useHistory();
  const location = useLocation();

  const [query, setQuery] = useState('');
  const [submitQuery, setSubmitQuery] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (query.length > 0 && submitQuery !== query) {
      history.push({
        ...location,
        pathname: '/movies',
        search: `query=${query}`,
      });
      setSubmitQuery(query);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            onChange={({ target: { value } }) => setQuery(value)}
            value={query}
          />
        </Search>
      </form>
    </>
  );
};

export default SearchForm;
