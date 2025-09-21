export function Card({ children, className = '' }: any) { return <div className={("rounded-xl border bg-white dark:bg-gray-900 dark:border-gray-800 "+className).trim()}>{children}</div> }
export function CardHeader({ children, className = '' }: any) { return <div className={("border-b dark:border-gray-800 "+className).trim()}>{children}</div> }
export function CardTitle({ children, className = '' }: any) { return <h3 className={("font-semibold p-4 "+className).trim()}>{children}</h3> }
export function CardContent({ children, className = '' }: any) { return <div className={("p-4 "+className).trim()}>{children}</div> }
