import { Loader2 } from 'lucide-react';

export default function Button({
  children,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  className = '',
  ...props
}) {
  const baseClasses = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  
  return (
    <button
      className={`${baseClasses} flex items-center justify-center gap-2 ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}
