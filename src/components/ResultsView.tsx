import { useState } from 'react'
import BudgetFilter from './BudgetFilter'
import TicketFilter from './TicketFilter'
import '../styles/ResultsView.css'
import { DateIdea } from '../data/dateIdeas'

const getPriceRangeText = (priceRange: string) => {
  const priceMap: { [key: string]: string } = {
    '$': 'Free',
    '$$': '$0-25',
    '$$$': '$25-50',
    '$$$$': '$50-100',
    '$$$$$': '$100+'
  }
  return priceMap[priceRange] || 'Unknown'
}

const getTicketText = (requiresTicket: boolean) => {
  return requiresTicket ? 'Ticket Required' : 'No Ticket Needed'
}
interface ResultsViewProps {
  onBack?: () => void,
  filteredIdeas: Array<DateIdea>
}

export default function ResultsView({ onBack, filteredIdeas }: ResultsViewProps) {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])
  const [noTicketOnly, setNoTicketOnly] = useState(false)

  // Filter ideas by selected budgets and ticket requirement
  const filteredResults = filteredIdeas
    .filter(idea => selectedBudgets.length === 0 || selectedBudgets.includes(idea.priceRange))
    .filter(idea => !noTicketOnly || !idea.requiresTicket)

  const renderDateIdeaCard = (idea: DateIdea) => (
    <div key={idea.id} className="date-idea-card">
      {/* Shine effect */}
      <div className="card-shine" />

      {/* Ticket Indicator */}
      <div className="ticket-indicator">
        <span className={`ticket-badge ${idea.requiresTicket ? 'required' : 'not-required'}`}>
          {getTicketText(idea.requiresTicket)}
        </span>
      </div>

      <div className="card-content">
        <h3 className="card-title">
          {idea.name}
        </h3>
        <p className="card-description">
          {idea.description}
        </p>

        {/* Price Range */}
        <div className="price-range">
          <span className="price-icon">🏷️</span>
          <span className="price-text">{getPriceRangeText(idea.priceRange)} per person</span>
        </div>

        {/* Tags */}
        <div className="tags-container">
          {/* Location */}
          <span className="tag tag-location">
            <span className="tag-icon">📍</span>
            {idea.neighborhood}
          </span>

          {/* Activity Type */}
          <span className="tag tag-activity">
            {(() => {
              const activityIcons = {
                'Dining': '🍽️',
                'Culture': '🎨',
                'Active': '🏃',
                'Entertainment': '🎭'
              }
              const icon = activityIcons[idea.activityType as keyof typeof activityIcons]
              return icon ? <span className="tag-icon">{icon}</span> : null
            })()}
            {idea.activityType}
          </span>

          {/* Time of Day */}
          <span className="tag tag-time">
            <span className="tag-icon">🕐</span>
            {idea.timeOfDay.join(' & ')}
          </span>

          {/* Accessibility */}
          {idea.accessibility.length > 0 && (
            <span className="tag tag-accessibility">
              <span className="tag-icon">♿</span>
              Accessible
            </span>
          )}

          {/* Weather Dependent */}
          {idea.weatherDependent && (
            <span className="tag tag-weather">
              <span className="tag-icon">☁️</span>
              Weather Dependent
            </span>
          )}
        </div>

        {/* Website Button */}
        {idea.websiteUrl && (
          <div>
            <a
              href={idea.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="website-button"
            >
              <span>Visit Website</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="results-view-container">
      {/* Background decorative elements */}
      <div className="results-view-background">
        <div className="floating-shape floating-shape-1" />
        <div className="floating-shape floating-shape-2" />
        <div className="floating-shape floating-shape-3" />
      </div>

      <div className="results-content">
        {/* Filter Header */}
        <div className="filter-header">
          <div className="filter-content">
            <BudgetFilter
              selectedBudgets={selectedBudgets}
              onSelectionChange={setSelectedBudgets}
            />
            <div className="filter-divider">
              <TicketFilter
                noTicketOnly={noTicketOnly}
                onSelectionChange={setNoTicketOnly}
              />
            </div>
          </div>
        </div>

        <div className="results-header">
          <h2 className="results-title">
            {filteredResults.length} {filteredResults.length === 1 ? 'Idea' : 'Ideas'} Found
          </h2>
          <button
            onClick={onBack || (() => alert('Back to form'))}
            className="back-button"
          >
            <span>← Back to Form</span>
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div className="no-results">
            <h3 className="no-results-title">
              No matches found
            </h3>
            <p className="no-results-text">
              Try adjusting your preferences to find more date ideas.
            </p>
          </div>
        ) : (
          <div className="results-grid">
            {filteredResults.map(renderDateIdeaCard)}
          </div>
        )}
      </div>
    </div>
  )
} 