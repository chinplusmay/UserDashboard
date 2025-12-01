import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, icon, className = '', ...props }, ref) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-zinc-300 mb-2">
          {label}
        </label>
      )}
      <div className="relative group">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-cyan-400 transition-colors duration-200">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`form-input ${error ? 'form-input-error' : ''} ${className}`}
          style={{ paddingLeft: icon ? '3rem' : '1rem' }}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-400 flex items-center gap-1">
          <span className="inline-block w-1 h-1 rounded-full bg-red-400"></span>
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
