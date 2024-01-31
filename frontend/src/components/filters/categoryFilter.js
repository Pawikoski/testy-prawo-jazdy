import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from 'react';
import axios from 'axios';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const CategoryFilter = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    axios.get('/categories/').then(response => setCategories(response.data)).catch(error => console.log(error));
  }, [])

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="category-filter-label">Wybierz kategorie</InputLabel>
        <Select
          labelId="category-filter-label"
          id="category-filter"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Wybierz kategorie" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.name}>
              <Checkbox checked={selectedCategories.indexOf(category.name) > -1} />
              <ListItemText primary={category.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default CategoryFilter;