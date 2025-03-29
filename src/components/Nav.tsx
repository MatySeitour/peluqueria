export function Nav() {
  const navItems = [
    {
      id: 1,
      name: "Home",
      href: "#",
    },
    {
      id: 2,
      name: "Servicios",
      href: "#Services",
    },
    {
      id: 3,
      name: "Medios de pago",
      href: "#",
    },
    {
      id: 3,
      name: "Contacto",
      href: "#",
    },
    {
      id: 4,
      name: "¿Donde encontrarnos?",
      href: "#",
    },
  ];

  return (
    <header className="fixed top-0 left-0 z-10 flex h-16 w-full items-center justify-between px-6">
      <p>LOGO</p>
      <nav className="z-10 h-full w-full max-w-2xl">
        <ul className="flex h-full w-full items-center justify-between">
          {navItems?.map((navItem) => (
            <li
              className="relative cursor-pointer p-1 pb-1.5 font-medium text-slate-700 transition-all after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:transition-all hover:text-pink-500 hover:after:bg-pink-500"
              key={navItem?.id}
            >
              {navItem?.name}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
