import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { useState } from 'react';

// JIRA: movie-4
// description: Build the search bar to be used on favorites and movie listings

export default function CustomizedInputBase(props: {searchMovie: (movieString: string) => void } ) {
    const [searchString, setSearchString] = useState('')
    
    const handleChange = (event: { target: { value: string; }; }) => {
        if (searchString === "") props.searchMovie(searchString)
        setSearchString(event?.target.value)

    }
    const handleSubmit = (e: { key: string; preventDefault: () => void; })=> {
        
        if (e.key === 'Enter') {
            e.preventDefault()
            props.searchMovie(searchString)
        }
    } 
    const handleClear = () => {
        setSearchString('')
        props.searchMovie('')
    }
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 350 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        id="search-movies"
        value={searchString}
        onChange={handleChange}
        onKeyDown={handleSubmit}
        placeholder="Search Movies"
        inputProps={{ 'aria-label': 'Search Movies' }}
      />
<IconButton onClick={handleClear} disabled={(searchString === '')} type="button" sx={{ p: '10px' }} aria-label="clear">
        <ClearIcon  />
      </IconButton>
    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton onClick={() => {props.searchMovie(searchString)}} type="button" sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}