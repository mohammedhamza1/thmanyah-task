interface MenuButtonProps {
  size?: number;
  className?: string;
}

export function MenuButton({ size = 24, className = "" }: MenuButtonProps) {
  return (
    <button
      className={`text-gray-400 hover:text-white ${className}`}
      aria-label="Menu"
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
      </svg>
    </button>
  );
}

