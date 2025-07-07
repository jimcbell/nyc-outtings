import { TicketIcon } from '@heroicons/react/24/outline'

interface TicketFilterProps {
  noTicketOnly: boolean
  onChange: (value: boolean) => void
}

export default function TicketFilter({ noTicketOnly, onChange }: TicketFilterProps) {
  return (
    <div>
      <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
        <TicketIcon className="w-5 h-5 mr-2 text-teal-500" />
        Ticket Filter
      </h3>
      <label className={`option-button ${
        noTicketOnly
          ? 'option-button--selected'
          : 'option-button--unselected'
      }`}>
        <input
          type="checkbox"
          checked={noTicketOnly}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <TicketIcon className="w-5 h-5 mr-2 flex-shrink-0" />
        No Ticket Required
      </label>
    </div>
  )
} 