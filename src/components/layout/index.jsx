import { useAuth } from "@/contexts/auth/useAuth"
import { useRef } from "react"
import { NavLink, Outlet } from "react-router-dom"
import { BeneficiaryType, DonorType } from "@/constants/user_type"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"

import { DonorForm } from "@/pages/donor_form"
import { BeneficiaryForm } from "@/pages/beneficiary_form"

function Layout() {
  const auth = useAuth()
  console.log(auth.user)
  const headerRef = useRef()
  const [showDonorForm, setShowDonorForm] = useState(false);
  const [showBeneficiaryForm, setShowBeneficiaryForm] = useState(false);

  return (
    <div className="w-full h-full">
      {/* Donor form */}
      <Dialog
        open={showDonorForm}
      >
        <DialogContent className="w-full overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Donador</DialogTitle>
              </DialogHeader>
          <DonorForm />
          <Button
            variant="destructive"
            onClick={() => {
              setShowDonorForm(false)
            }}
          >
            Cerrar
          </Button>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Beneficiary form */}
      <Dialog
        open={showBeneficiaryForm}
      >
        <DialogContent className="w-full overflow-y-auto max-h-[80vh]">
            <DialogHeader>
              <DialogTitle>Beneficiario</DialogTitle>
              </DialogHeader>
          <BeneficiaryForm closeForm={setShowBeneficiaryForm} />
          <Button
            variant="destructive"
            onClick={() => {
              setShowBeneficiaryForm(false)
            }}
          >
            Cerrar
          </Button>
            <DialogFooter>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      <header
        ref={headerRef}
        className="w-full h-16 flex justify-between items-center bg-[#f1f4e5] text-white px-4"
      >
        <figure className="">
          <NavLink to='/'>
            <img
              className="h-20"
              src="src\assets\utda_logo-min.png"
              alt="Logo UTda"
            />
          </NavLink>
        </figure>
        <nav className="list-none">
          <ul className="w-full flex space-x-4">
            <li>
              <NavLink
                  className="text-[#45936c] font-bold"
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
                      to='/donor-home/'
                      className="text-[#45936c] font-bold"
                    >
                      Prestar ayuda
                    </NavLink>
                  </li>
                ) : undefined}
                {auth.user.userType === BeneficiaryType ? (
                  <li>
                    <NavLink
                      to='/beneficiary-home/'
                      className="text-[#45936c] font-bold"
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
                    className="text-[#45936c] font-bold"
                  >
                    Cerrar sesión
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                    <button
                      className="text-[#45936c] font-bold"
                    onClick={async () => {
                        setShowDonorForm(true);
                    }}
                  >
                    Donante
                  </button>
                </li>
                <li>
                    <button
                      className="text-[#45936c] font-bold"
                    onClick={async () => {
                        setShowBeneficiaryForm(true);
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
    </div>
  )
}

export { Layout }