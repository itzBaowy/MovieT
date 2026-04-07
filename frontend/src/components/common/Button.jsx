import { Link } from 'react-router-dom';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props
}) {
  const baseClasses =
    'inline-flex items-center justify-center font-semibold transition-all duration-300 ease-in-out cursor-pointer focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary:
      'gradient-primary text-on-primary-container rounded-xl hover:glow-tertiary hover:scale-[1.02] active:scale-[0.98]',
    secondary:
      'glass text-primary rounded-xl hover:glow-secondary hover:bg-surface-container-highest/80',
    ghost:
      'text-primary-dim hover:text-primary hover:bg-surface-container-high/40 rounded-xl',
    danger:
      'bg-error/20 text-error rounded-xl hover:bg-error/30',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {loading && <span className="mr-2 animate-spin">⟳</span>}
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>
        {loading && <span className="mr-2 animate-spin">⟳</span>}
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} onClick={onClick} {...props}>
      {loading && <span className="mr-2 animate-spin">⟳</span>}
      {children}
    </button>
  );
}
