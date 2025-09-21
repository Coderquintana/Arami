"use client"
import { Button } from "@/components/ui/button"
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { X } from "lucide-react"
import { getKeycloakUrls, useMockAuth } from "@/lib/mockAuth"

export function ProfilePanel() {
  const { signInDemoOwner } = useMockAuth()
  const urls = getKeycloakUrls()
  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Perfil</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Cerrar perfil">
              <X className="w-4 h-4" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>
      <div className="mt-4 grid grid-cols-1 gap-2">
        <Button className="w-full" onClick={signInDemoOwner}>Iniciar sesión (demo dueño)</Button>
        <a href={urls.register} className="w-full">
          <Button asChild variant="outline" className="w-full"><span>Crear cuenta (Keycloak)</span></Button>
        </a>
      </div>
    </div>
  )
}
