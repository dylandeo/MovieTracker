import { Link, useMatch, useResolvedPath  } from "react-router-dom"
export default function NavBar(){
  return <nav className="nav">
    <Link to="/" className="site-title">Movie Munchies</Link>
    <ul>
      <CustomLink to="/likes">Likes</CustomLink>
      <CustomLink to="/watch-later">Watch Later</CustomLink>
    </ul>
  </nav>
}

function CustomLink({to: to, children, ...props}){
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({path: resolvedPath.pathname, end: true})
  return(
    <li className={isActive ? "active" : ""}><Link to={to}{...props}>{children}</Link></li>
  )
}