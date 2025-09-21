"use client"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, Phone, Clock, MapPin } from "lucide-react"
import { Tooltip } from "@/components/ui/tooltip"

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        <div>
          <Link href="/" className="font-extrabold tracking-tight text-2xl bg-gradient-to-r from-primary via-highlight to-accent bg-clip-text text-transparent">Arami Shop</Link>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Tu tienda online para ropa y accesorios. Calidad, estilo y envíos rápidos.</p>
          <div className="flex items-center gap-3 mt-4">
            <Tooltip label="Instagram" side="top"><a href="#" aria-label="Instagram" className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"><Instagram className="w-4 h-4"/></a></Tooltip>
            <Tooltip label="LinkedIn" side="top"><a href="#" aria-label="LinkedIn" className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"><Linkedin className="w-4 h-4"/></a></Tooltip>
            <Tooltip label="GitHub" side="top"><a href="#" aria-label="GitHub" className="p-2 rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"><Github className="w-4 h-4"/></a></Tooltip>
          </div>
        </div>
        <div>
          <h4 className="font-semibold">Acerca de</h4>
          <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link href="#" className="hover:underline">Nosotros</Link></li>
            <li><Link href="#" className="hover:underline">Contacto</Link></li>
            <li><Link href="#" className="hover:underline">Trabaja con nosotros</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Ayuda</h4>
          <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
            <li><Link href="#" className="hover:underline">Preguntas frecuentes</Link></li>
            <li><Link href="#" className="hover:underline">Cambios y devoluciones</Link></li>
            <li><Link href="#" className="hover:underline">Soporte</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">Atención</h4>
          <ul className="mt-2 space-y-2 text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2"><Clock className="w-4 h-4"/> Lun a Vie: 9:00–18:00</li>
            <li className="flex items-center gap-2"><MapPin className="w-4 h-4"/> Asunción, Paraguay</li>
            <li className="flex items-center gap-2"><Phone className="w-4 h-4"/> +595 000 000 000</li>
            <li className="flex items-center gap-2"><Mail className="w-4 h-4"/> soporte@arami.shop</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Arami Shop — prototipo. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}

