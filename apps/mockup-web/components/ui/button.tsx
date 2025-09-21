export function Button({ children, className = '', variant, size, ...rest }: any) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium border transition-colors';
  const variants: any = {
    secondary: 'bg-gray-100 text-gray-900 border-gray-200 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-700',
    outline: 'bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:border-gray-700 dark:hover:bg-gray-800',
    ghost: 'bg-transparent border-transparent text-gray-900 hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-800',
    default: 'bg-primary text-white border-transparent hover:bg-blue-700',
    accent: 'bg-accent text-white border-transparent hover:bg-green-600',
  };
  const sizes: any = { icon: 'p-2', default: 'px-3 py-2' };
  const cls = [base, variants[variant] || variants.outline, sizes[size] || sizes.default, className].filter(Boolean).join(' ');
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  );
}
