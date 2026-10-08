export default function TechnicalLabels({ items, className = '' }) {
  return (
    <div className={`technical-labels ${className}`}>
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  )
}
