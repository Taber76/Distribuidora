import { Link } from 'react-router-dom';
import { Button } from '../button';
import { NavMobile } from '../nav-mobile';
import { NavDesktop } from '../nav-desktop';
import { useMediaQuery } from 'react-responsive';

const NavBar = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' }); // Define el breakpoint para dispositivos móviles

  return (
    <header className="bg-blue-500 py-4 md:py-6">
      <div className="flex items-center justify-between px-4 md:px-6">

        <Link className="flex items-center space-x-2" to="/">
          {/* Aquí va tu icono o logotipo */}
          <span className="font-semibold text-white">Distribuidora</span>
        </Link>

        {/* Renderiza NavMobile si el dispositivo es móvil, de lo contrario, renderiza NavDesktop */}
        {isMobile ?
          <div className='flex items-center'>
            {/* Botón de login */}
            <div className="md:flex items-center">
              <Button
                onClick={() => {

                }}
                text="Login"
                isActive={true}
              />
            </div>
            <NavMobile />
          </div>
          :
          <div className='flex items-center'>
            <NavDesktop />
            {/* Botón de login */}
            <div className="md:flex items-center ml-4">
              <Link to="/Login">
                <Button
                  onClick={() => {
                  }}
                  text="Login"
                  isActive={true}
                />
              </Link>
            </div>
          </div>
        }

      </div>
    </header>
  );
};

export { NavBar };
