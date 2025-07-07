import { CurrencyDollarIcon } from '@heroicons/react/24/outline'

interface BudgetFilterProps {
  selectedBudgets: string[]
  onChange: (budgets: string[]) => void
}

const budgetOptions = [
  { value: '$', label: 'Free', range: '$0' },
  { value: '$$', label: '$', range: '$0-25' },
  { value: '$$$', label: '$$', range: '$25-50' },
  { value: '$$$$', label: '$$$', range: '$50-100' },
  { value: '$$$$$', label: '$$$$', range: '$100+' }
]

export default function BudgetFilter({ selectedBudgets, onChange }: BudgetFilterProps) {
  const handleBudgetChange = (budget: string) => {
    onChange(
      selectedBudgets.includes(budget)
        ? selectedBudgets.filter(b => b !== budget)
        : [...selectedBudgets, budget]
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <CurrencyDollarIcon className="w-5 h-5 mr-2 text-teal-500" />
        Filter by budget
      </h3>
      <div className="flex flex-wrap gap-2">
        {budgetOptions.map(({ value, label, range }) => (
          <button
            key={value}
            onClick={() => handleBudgetChange(value)}
            className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedBudgets.includes(value)
                ? 'bg-teal-50 text-teal-700 border-2 border-teal-500'
                : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <span className="mr-1">{label}</span>
            <span className="text-gray-500">({range})</span>
          </button>
        ))}
      </div>
    </div>
  )
} 