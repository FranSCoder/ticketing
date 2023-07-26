import Link from "next/link";

const Header = ({ currentUser }) => {
  const links = [
    !currentUser && { label: "Crea tu cuenta", href: "/auth/signup" },
    !currentUser && { label: "Inicia Sesión", href: "/auth/signin" },
    currentUser && { label: "Vender Tickets", href: "/tickets/new" },
    currentUser && { label: "Mis pedidos", href: "/orders" },
    currentUser && { label: "Cerrar Sesión", href: "/auth/signout" },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li
          key={href}
          className='nav-item'
        >
          <Link
            href={href}
            className='nav-link'
          >
            {label}
          </Link>
        </li>
      );
    });

  return (
    <nav className='navbar navbar-light bg-light'>
      <Link
        className='navbar-brand'
        href='/'
      >
        GitTix
      </Link>

      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>{links}</ul>
      </div>
    </nav>
  );
};

export default Header;
