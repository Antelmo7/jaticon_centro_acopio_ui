import { useAuth } from "@/contexts/auth/useAuth"
import { useRef } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { BeneficiaryType, DonorType } from "@/constants/user_type"

function Layout() {
  const auth = useAuth()
  const headerRef = useRef()

  return (
    <>
      <header
        ref={headerRef}
        className="w-full h-16 flex justify-between items-center bg-black text-white px-4"
      >
        <figure className="">
          <NavLink to='/'>
            <img
              className="h-8"
              src="https://placehold.jp/150x150.png"
              alt="Logo UTda"
            />
          </NavLink>
        </figure>
        <nav className="list-none">
          <ul className="w-full flex space-x-4">
            <li>
              <NavLink
                to='/'
              >
                Inicio
              </NavLink>
            </li>
            {auth.user ? (
              <>
                {auth.user.userType === DonorType ? (
                  <li>
                    <NavLink
                      to='/donor/'
                    >
                      Prestar ayuda
                    </NavLink>
                  </li>
                ) : undefined}
                {auth.user.userType === BeneficiaryType ? (
                  <li>
                    <NavLink
                      to='/beneficiary/'
                    >
                      Solicitar ayuda
                    </NavLink>
                  </li>
                ) : undefined}
                <li>
                  <button
                    onClick={async () => {
                      auth.logout()
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <button
                    onClick={async () => {
                      console.log('donante')
                    }}
                  >
                    Donante
                  </button>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      console.log('beneficiario')
                    }}
                  >
                    Beneficiario
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
      <main
        className="w-full flex flex-col justify-center items-center overflow-y-auto"
        style={{
          minHeight: `calc(100vh - ${headerRef.current?.clientHeight}px)`
        }}
      >
        <Outlet />
      </main>
      <footer>

      </footer>
    </>
  )
}

export { Layout }