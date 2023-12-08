import { Paper, InputBase, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

type Props = {
  onChange?: () => void
}

export default function Search({ onChange }: Props) {
  return <Paper
    component="form"
    sx={{
      backgroundColor: '#2d2d2d',
    }}
    className='px-2 flex w-full items-center border border-border'
  >
    <IconButton type="button" sx={{ '&:focus': {  outline: 'none', }, }} aria-label="search">
      <SearchIcon sx={{ color: '#ffffff' }} />
    </IconButton>
    <InputBase
      className='ml-1 flex-1'
      sx={{
        color: '#ffffff',
        '&::placeholder': {
          color: '#aaaaaa',
        },
      }}
      placeholder="Search"
      inputProps={{ 'aria-label': 'search' }}
    />
  </Paper>
}
