interface BudgetOption {
  value: string
  label: string
  range: string
}

interface BudgetFilterProps {
  selectedBudgets: string[]
  onSelectionChange: (budgets: string[]) => void
  className?: string
}

const budgetOptions: BudgetOption[] = [
  { value: '$', label: 'Free', range: '$0' },
  { value: '$$', label: '$', range: '$0-25' },
  { value: '$$$', label: '$$', range: '$25-50' },
  { value: '$$$$', label: '$$$', range: '$50-100' },
  { value: '$$$$$', label: '$$$$', range: '$100+' }
]

export default function BudgetFilter({
  selectedBudgets,
  onSelectionChange,
  className = ""
}: BudgetFilterProps) {

  const handleBudgetChange = (budget: string) => {
    const newSelection = selectedBudgets.includes(budget)
      ? selectedBudgets.filter(b => b !== budget)
      : [...selectedBudgets, budget]
    onSelectionChange(newSelection)
  }

  return (
    <div className={`form-section ${className}`}>
      <div className="section-title">
        <svg className="section-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        Filter by Budget
      </div>
      <div className="option-grid">
        {budgetOptions.map(({ value, label, range }) => (
          <div
            key={value}
            className={`option-card ${selectedBudgets.includes(value) ? 'selected' : ''}`}
            onClick={() => handleBudgetChange(value)}
            data-option={value}
          >
            <div className="option-icon">💰</div>
            <div>
              <div style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>{label}</div>
              <div style={{ fontSize: '0.875rem', opacity: 0.8 }}>({range})</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 