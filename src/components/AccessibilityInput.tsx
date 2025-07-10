
interface AccessibilityInputProps {
  selectedValues?: string[]
  onSelectionChange: (values: string[]) => void
  className?: string
}

const accessibilityOptions = [
  { value: 'wheelchair', label: '♿ Wheelchair Accessible', icon: '♿' },
  { value: 'hearing', label: '🎧 Hearing Assistance Available', icon: '🎧' },
  { value: 'visual', label: '👁️ Visual Assistance Available', icon: '👁️' }
]

export default function AccessibilityInput({
  selectedValues = [],
  onSelectionChange,
  className = ""
}: AccessibilityInputProps) {

  const handleAccessibilityChange = (value: string) => {
    const newSelection = selectedValues.includes(value)
      ? selectedValues.filter(v => v !== value)
      : [...selectedValues, value]
    onSelectionChange(newSelection)
  }

  return (
    <div className={`form-section ${className}`}>
      <div className="section-title">
        <svg className="section-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        Accessibility
      </div>
      <div className="accessibility-section">
        {accessibilityOptions.map((option) => (
          <div
            key={option.value}
            className={`accessibility-option ${selectedValues.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleAccessibilityChange(option.value)}
            data-option={option.value}
          >
            <div className={`checkbox ${selectedValues.includes(option.value) ? 'checked' : ''}`}>
              {selectedValues.includes(option.value) && <span>✓</span>}
            </div>
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}