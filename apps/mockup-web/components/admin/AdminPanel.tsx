"use client"
import { Button } from "@/components/ui/button"
import { SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet"
import { X } from "lucide-react"
import { useMockAuth } from "@/lib/mockAuth"

export function AdminPanel() {
  const { signOut } = useMockAuth()
  return (
    <div className="flex flex-col h-full">
      <SheetHeader>
        <div className="flex items-center justify-between">
          <SheetTitle>Admin (demo)</SheetTitle>
          <SheetClose asChild>
            <Button variant="ghost" size="icon" aria-label="Cerrar admin">
              <X className="w-4 h-4" />
            </Button>
          </SheetClose>
        </div>
      </SheetHeader>
      <div className="mt-4 grid gap-2">
        <Button className="w-full" variant="secondary">Catálogo de productos</Button>
        <Button className="w-full" variant="secondary">Órdenes</Button>
        <Button className="w-full" variant="secondary">Configuraciones</Button>
        <div className="pt-2">
          <Button className="w-full" variant="outline" onClick={signOut}>Cerrar sesión (demo)</Button>
        </div>
      </div>
    </div>
  )
}

