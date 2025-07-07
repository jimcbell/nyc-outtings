import { useState } from 'react'
import { DatePreferences } from '../App'
import { DateIdea } from '../data/dateIdeas'
import { getPriceRangeText, getTicketText } from '../utils/priceUtils'
import Ad from './Ad'
import BudgetFilter from './BudgetFilter'
import TicketFilter from './TicketFilter'
import { MapPinIcon, ClockIcon, TagIcon, UserIcon, CloudIcon, BeakerIcon, PaintBrushIcon, UserGroupIcon, TicketIcon } from '@heroicons/react/24/outline'

interface ResultsViewProps {
  preferences: DatePreferences
  onBack: () => void
  filteredIdeas: DateIdea[]
}

export default function ResultsView({ onBack, filteredIdeas }: ResultsViewProps) {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])
  const [noTicketOnly, setNoTicketOnly] = useState(false)

  // Filter ideas by selected budgets and ticket requirement
  const filteredResults = filteredIdeas
    .filter(idea => selectedBudgets.length === 0 || selectedBudgets.includes(idea.priceRange))
    .filter(idea => !noTicketOnly || !idea.requiresTicket)

  // Split suggestions into two groups for ad placement
  const firstGroup = filteredResults.slice(0, 3)
  const secondGroup = filteredResults.slice(3)

  const renderDateIdeaCard = (idea: DateIdea) => (
    <div key={idea.id} className="bg-white rounded-lg shadow-sm p-6 relative">
      {/* Ticket Indicator */}
      <div className="absolute top-2 right-2">
        <span className={`px-3 py-1 rounded-full text-sm ${
          idea.requiresTicket
            ? 'bg-sky-100 text-sky-700'
            : 'bg-green-100 text-green-700'
        }`}>
          {getTicketText(idea.requiresTicket)}
        </span>
      </div>

      <h3 className="text-xl font-semibold text-gray-900 mb-3">{idea.name}</h3>
      <p className="text-gray-600 mb-4">{idea.description}</p>
      
      {/* Price Range */}
      <div className="flex items-center mb-4">
        <TagIcon className="w-5 h-5 text-gray-400 mr-2" />
        <span className="text-gray-700">{getPriceRangeText(idea.priceRange)} per person</span>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-4">
        {/* Location */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm whitespace-nowrap">
          <MapPinIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
          {idea.neighborhood}
        </span>

        {/* Activity Type */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm whitespace-nowrap">
          {(() => {
            const activityIcons = {
              'Dining': BeakerIcon,
              'Culture': PaintBrushIcon,
              'Active': UserGroupIcon,
              'Entertainment': TicketIcon
            }
            const Icon = activityIcons[idea.activityType as keyof typeof activityIcons]
            return Icon ? <Icon className="w-4 h-4 mr-1.5 flex-shrink-0" /> : null
          })()}
          {idea.activityType}
        </span>

        {/* Time of Day */}
        <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm whitespace-nowrap">
          <ClockIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
          {idea.timeOfDay.join(' & ')}
        </span>

        {/* Accessibility */}
        {idea.accessibility.length > 0 && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-green-100 text-green-700 text-sm whitespace-nowrap">
            <UserIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
            Accessible
          </span>
        )}

        {/* Weather Dependent */}
        {idea.weatherDependent && (
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-amber-100 text-amber-700 text-sm whitespace-nowrap">
            <CloudIcon className="w-4 h-4 mr-1.5 flex-shrink-0" />
            Weather Dependent
          </span>
        )}
      </div>

      {/* Website Button */}
      {idea.websiteUrl && (
        <div className="mt-4">
          <a 
            href={idea.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Visit Website
          </a>
        </div>
      )}
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Filter Header */}
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="space-y-6">
          <BudgetFilter
            selectedBudgets={selectedBudgets}
            onChange={setSelectedBudgets}
          />
          <div className="border-t border-gray-200 pt-6">
            <TicketFilter
              noTicketOnly={noTicketOnly}
              onChange={setNoTicketOnly}
            />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredResults.length} Date {filteredResults.length === 1 ? 'Idea' : 'Ideas'} Found
          </h2>
          <button
            onClick={onBack}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
          >
            Back to Form
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No matches found</h3>
            <p className="text-gray-600">
              Try adjusting your preferences to find more date ideas.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* First group of suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {firstGroup.map(renderDateIdeaCard)}
            </div>

            <Ad slot="suggestions-mid" format="horizontal" className="w-full" />

            {/* Second group of suggestions */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {secondGroup.map(renderDateIdeaCard)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 