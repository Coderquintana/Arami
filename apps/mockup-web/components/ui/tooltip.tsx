"use client"
import { useState, ReactNode, HTMLAttributes } from 'react'

type Props = HTMLAttributes<HTMLSpanElement> & {
  label: string
  children: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
}

export function Tooltip({ label, children, side = 'top', className = '', ...rest }: Props) {
  const [open, setOpen] = useState(false)
  const pos =
    side === 'top' ? 'bottom-full mb-2 left-1/2 -translate-x-1/2' :
    side === 'bottom' ? 'top-full mt-2 left-1/2 -translate-x-1/2' :
    side === 'left' ? 'right-full mr-2 top-1/2 -translate-y-1/2' :
    'left-full ml-2 top-1/2 -translate-y-1/2'
  return (
    <span
      className={("relative inline-flex " + className).trim()}
      {...rest}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span className={`pointer-events-none absolute z-[9999] whitespace-nowrap rounded-md bg-gray-900 px-2 py-1 text-xs text-white shadow-lg dark:bg-gray-100 dark:text-gray-900 ${pos}`} role="tooltip">
          {label}
        </span>
      )}
    </span>
  )
}
