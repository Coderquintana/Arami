import React, { createContext, useContext, useState, isValidElement, cloneElement, useEffect } from 'react'

type Ctx = { open: boolean; setOpen: (v: boolean) => void }
const SheetCtx = createContext<Ctx | null>(null)
const useSheet = () => {
  const ctx = useContext(SheetCtx)
  if (!ctx) throw new Error('Sheet components must be used inside <Sheet>')
  return ctx
}

export function Sheet({ children }: any) {
  const [open, setOpen] = useState(false)
  return <SheetCtx.Provider value={{ open, setOpen }}>{children}</SheetCtx.Provider>
}

export function SheetTrigger({ children, asChild }: any) {
  const { open, setOpen } = useSheet()
  const handle = () => setOpen(!open)
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: (e: any) => {
        // @ts-ignore
        children.props?.onClick?.(e)
        handle()
      },
    })
  }
  return <button onClick={handle}>{children}</button>
}

export function SheetContent({ children, className = '' }: any) {
  const { open, setOpen } = useSheet()
  if (!open) return null
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [setOpen])
  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setOpen(false)} />
      <aside role="dialog" aria-modal className={`fixed right-0 top-0 h-screen bg-white dark:bg-gray-900 z-50 border-l dark:border-gray-800 p-4 ${className}`}>{children}</aside>
    </>
  )
}

export function SheetHeader({ children }: any) { return <div className="mb-2">{children}</div> }
export function SheetTitle({ children }: any) { return <h3 className="font-semibold text-lg">{children}</h3> }

export function SheetClose({ children, asChild }: any) {
  const { setOpen } = useSheet()
  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      onClick: (e: any) => {
        // @ts-ignore
        children.props?.onClick?.(e)
        setOpen(false)
      },
    })
  }
  return <button onClick={() => setOpen(false)}>{children ?? 'Close'}</button>
}
