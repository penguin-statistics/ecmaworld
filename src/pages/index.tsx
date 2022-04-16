import TextField from '@mui/material/TextField'

import { useState } from 'react'

function IndexPage() {
  const [query, setQuery] = useState('')
  return (
    <>
      <TextField
        label="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </>
  )
}

export default IndexPage
