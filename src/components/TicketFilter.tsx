interface TicketFilterProps {
  noTicketOnly: boolean
  onSelectionChange: (value: boolean) => void
  className?: string
}

export default function TicketFilter({
  noTicketOnly,
  onSelectionChange,
  className = ""
}: TicketFilterProps) {

  const handleToggle = () => {
    onSelectionChange(!noTicketOnly)
  }

  return (
    <div className={`form-section ${className}`}>
      <div className="section-title">
        <svg className="section-icon" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
        </svg>
        Ticket Requirements
      </div>
      <div className="accessibility-section">
        <div
          className={`accessibility-option ${noTicketOnly ? 'selected' : ''}`}
          onClick={handleToggle}
          data-option="no-ticket"
        >
          <div className={`checkbox ${noTicketOnly ? 'checked' : ''}`}>
            {noTicketOnly && <span>✓</span>}
          </div>
          <div>🎫 No Ticket Required</div>
        </div>
      </div>
    </div>
  )
} 