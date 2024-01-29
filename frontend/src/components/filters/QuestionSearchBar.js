import { FormControl, Box, TextField, IconButton, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

const QuestionSearchBar = ({ searchPhrase, setSearchPhrase }) => {
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <TextField
          variant="outlined"
          label="Wyszukaj pytanie"
          id="search-question"
          value={searchPhrase}
          onChange={(e) => setSearchPhrase(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>
    </div>
  );
}

export default QuestionSearchBar;

{/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
  <SearchIcon />
</IconButton> */}