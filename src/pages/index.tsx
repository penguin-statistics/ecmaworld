import { Link } from 'react-router-dom'

function IndexPage() {
  return (
    <>
      <h1>Index Page</h1>
      <p>Welcome to Index Page!</p>
      <Link to="/items">Go to Items index</Link>
      <Link to="/stages">Go to Stages index</Link>
      {/* <Link to="/live">Go to Live Page</Link> */}
    </>
  )
}

export default IndexPage
