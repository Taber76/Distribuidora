import { routes } from "../../routes";

export const NavDesktop = () => {
  return (
    <ul className="lg:flex lg:items-center gap-5 text-sm font-semibold text-white flex">
      {routes.map((route) => {
        const { Icon, href, title } = route;
        return (
          <li key={href}> {/* Agrega un key único para cada elemento de la lista */}
            <a
              href={href}
              className="flex items-center gap-1 hover:text-neutral-400 transition-all"
            >
              <Icon />
              {title}
            </a>
          </li>
        );
      })}
    </ul>
  );
};
