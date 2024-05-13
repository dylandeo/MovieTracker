export default function NavBar(){
  return <nav className="nav">
    <a href="/" className="site-title">Movie Munchies</a>
    <ul>
      <CustomLink href="/likes">Likes</CustomLink>
      <CustomLink href="/watch-later">Watch Later</CustomLink>
    </ul>
  </nav>
}

function CustomLink({href, children, ...props}){
  const path = window.location.pathname
  return(
    <li className={path === href ? "active" : ""}><a href={href}{...props}>{children}</a></li>
  )
}