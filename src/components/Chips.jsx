export const Chips = ({ items, value, onChange }) => (
  <div className="chips" role="group">
    {items.map(({ id, label, color }) => (
      <button
        key={id}
        type="button"
        className="chip"
        style={color ? { "--c": color } : undefined}
        aria-pressed={value === id}
        onClick={() => onChange(id)}
      >
        {label}
      </button>
    ))}
  </div>
);
