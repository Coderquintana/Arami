export function Input({ className = '', ...rest }: any) {
  const base = 'border rounded-md px-3 py-2 bg-white text-gray-900 placeholder-gray-400 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 dark:placeholder-gray-500';
  return <input className={(base+" "+className).trim()} {...rest} />
}
