import { useState } from 'react'
import BudgetFilter from './BudgetFilter'
import TicketFilter from './TicketFilter'

// Mock data and types for demo
interface DateIdea {
  id: string
  name: string
  description: string
  priceRange: string
  neighborhood: string
  activityType: string
  timeOfDay: string[]
  accessibility: string[]
  weatherDependent: boolean
  requiresTicket: boolean
  websiteUrl?: string
}

// Mock data for demo
const mockIdeas: DateIdea[] = [
  {
    id: '1',
    name: 'Brooklyn Bridge Park',
    description: 'Stunning waterfront park with incredible Manhattan skyline views, perfect for romantic walks and picnics.',
    priceRange: '$',
    neighborhood: 'Brooklyn Heights',
    activityType: 'Active',
    timeOfDay: ['Morning', 'Afternoon'],
    accessibility: ['Wheelchair Accessible'],
    weatherDependent: true,
    requiresTicket: false,
    websiteUrl: 'https://brooklynbridgepark.org'
  },
  {
    id: '2',
    name: 'The High Line',
    description: 'Elevated linear park built on former railway tracks, featuring art installations and unique city perspectives.',
    priceRange: '$',
    neighborhood: 'Chelsea',
    activityType: 'Culture',
    timeOfDay: ['Afternoon', 'Evening'],
    accessibility: ['Wheelchair Accessible'],
    weatherDependent: true,
    requiresTicket: false
  },
  {
    id: '3',
    name: 'Broadway Show',
    description: 'Experience the magic of live theater in the heart of Times Square with world-class performances.',
    priceRange: '$$$$$',
    neighborhood: 'Theater District',
    activityType: 'Entertainment',
    timeOfDay: ['Evening'],
    accessibility: ['Hearing Assistance'],
    weatherDependent: false,
    requiresTicket: true,
    websiteUrl: 'https://broadway.com'
  }
]

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

export default function ResultsView({ onBack }: { onBack?: () => void }) {
  const [selectedBudgets, setSelectedBudgets] = useState<string[]>([])
  const [noTicketOnly, setNoTicketOnly] = useState(false)
  const filteredIdeas = mockIdeas

  // Filter ideas by selected budgets and ticket requirement
  const filteredResults = filteredIdeas
    .filter(idea => selectedBudgets.length === 0 || selectedBudgets.includes(idea.priceRange))
    .filter(idea => !noTicketOnly || !idea.requiresTicket)

  const renderDateIdeaCard = (idea: DateIdea) => (
    <div 
      key={idea.id}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '1.5rem',
        padding: '1.5rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 12px 48px rgba(0, 0, 0, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      {/* Shine effect */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
        transition: 'left 0.5s ease',
        pointerEvents: 'none'
      }} />
      
      {/* Ticket Indicator */}
      <div style={{
        position: 'absolute',
        top: '1rem',
        right: '1rem',
        zIndex: 10
      }}>
        <span style={{
          padding: '0.5rem 0.75rem',
          borderRadius: '1.25rem',
          fontSize: '0.875rem',
          fontWeight: '600',
          background: idea.requiresTicket
            ? 'rgba(59, 130, 246, 0.2)'
            : 'rgba(34, 197, 94, 0.2)',
          color: idea.requiresTicket ? '#93c5fd' : '#86efac',
          border: idea.requiresTicket 
            ? '1px solid rgba(59, 130, 246, 0.3)'
            : '1px solid rgba(34, 197, 94, 0.3)'
        }}>
          {getTicketText(idea.requiresTicket)}
        </span>
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10
      }}>
        <h3 style={{
          color: 'white',
          fontSize: '1.5rem',
          fontWeight: '700',
          marginBottom: '0.75rem',
          marginTop: '1rem'
        }}>
          {idea.name}
        </h3>
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '1rem',
          lineHeight: '1.6'
        }}>
          {idea.description}
        </p>
        
        {/* Price Range */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '1rem',
          color: 'rgba(255, 255, 255, 0.9)'
        }}>
          <span style={{ fontSize: '1.125rem', marginRight: '0.5rem' }}>🏷️</span>
          <span style={{ fontWeight: '500' }}>{getPriceRangeText(idea.priceRange)} per person</span>
        </div>

        {/* Tags */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '1.5rem'
        }}>
          {/* Location */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            borderRadius: '1.25rem',
            background: 'rgba(139, 92, 246, 0.2)',
            color: '#c4b5fd',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: '1px solid rgba(139, 92, 246, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ marginRight: '0.5rem' }}>📍</span>
            {idea.neighborhood}
          </span>

          {/* Activity Type */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            borderRadius: '1.25rem',
            background: 'rgba(236, 72, 153, 0.2)',
            color: '#f9a8d4',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: '1px solid rgba(236, 72, 153, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            {(() => {
              const activityIcons = {
                'Dining': '🍽️',
                'Culture': '🎨',
                'Active': '🏃',
                'Entertainment': '🎭'
              }
              const icon = activityIcons[idea.activityType as keyof typeof activityIcons]
              return icon ? <span style={{ marginRight: '0.5rem' }}>{icon}</span> : null
            })()}
            {idea.activityType}
          </span>

          {/* Time of Day */}
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.5rem 0.75rem',
            borderRadius: '1.25rem',
            background: 'rgba(251, 191, 36, 0.2)',
            color: '#fde68a',
            fontSize: '0.875rem',
            fontWeight: '500',
            border: '1px solid rgba(251, 191, 36, 0.3)',
            whiteSpace: 'nowrap'
          }}>
            <span style={{ marginRight: '0.5rem' }}>🕐</span>
            {idea.timeOfDay.join(' & ')}
          </span>

          {/* Accessibility */}
          {idea.accessibility.length > 0 && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 0.75rem',
              borderRadius: '1.25rem',
              background: 'rgba(34, 197, 94, 0.2)',
              color: '#86efac',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid rgba(34, 197, 94, 0.3)',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ marginRight: '0.5rem' }}>♿</span>
              Accessible
            </span>
          )}

          {/* Weather Dependent */}
          {idea.weatherDependent && (
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.5rem 0.75rem',
              borderRadius: '1.25rem',
              background: 'rgba(245, 158, 11, 0.2)',
              color: '#fbbf24',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              whiteSpace: 'nowrap'
            }}>
              <span style={{ marginRight: '0.5rem' }}>☁️</span>
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
              style={{
                position: 'relative',
                overflow: 'hidden',
                display: 'inline-flex',
                alignItems: 'center',
                padding: '0.75rem 1.5rem',
                background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '0.75rem',
                fontWeight: '600',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(255, 107, 107, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <span style={{ position: 'relative', zIndex: 10 }}>Visit Website</span>
            </a>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background decorative elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '25%',
          width: '8rem',
          height: '8rem',
          background: 'white',
          borderRadius: '50%',
          animation: 'pulse 2s infinite'
        }} />
        <div style={{
          position: 'absolute',
          top: '75%',
          right: '25%',
          width: '6rem',
          height: '6rem',
          background: 'white',
          borderRadius: '50%',
          animation: 'pulse 2s infinite 1s'
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          right: '33%',
          width: '4rem',
          height: '4rem',
          background: 'white',
          borderRadius: '50%',
          animation: 'pulse 2s infinite 2s'
        }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 10,
        maxWidth: '80rem',
        margin: '0 auto'
      }}>
        {/* Filter Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          padding: '2rem',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
          marginBottom: '2rem',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            position: 'relative',
            zIndex: 10
          }}>
            <BudgetFilter
              selectedBudgets={selectedBudgets}
              onSelectionChange={setSelectedBudgets}
            />
            <div style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.2)',
              paddingTop: '2rem'
            }}>
              <TicketFilter
                noTicketOnly={noTicketOnly}
                onSelectionChange={setNoTicketOnly}
              />
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexDirection: window.innerWidth < 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '2rem',
          gap: '1rem'
        }}>
          <h2 style={{
            color: 'white',
            fontSize: '2.25rem',
            fontWeight: '700',
            textAlign: window.innerWidth < 768 ? 'center' : 'left',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)'
          }}>
            {filteredResults.length} Date {filteredResults.length === 1 ? 'Idea' : 'Ideas'} Found
          </h2>
          <button
            onClick={onBack || (() => alert('Back to form'))}
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontWeight: '600',
              padding: '0.75rem 1.5rem',
              borderRadius: '0.75rem',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.3)'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>← Back to Form</span>
          </button>
        </div>

        {filteredResults.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 0',
            color: 'white'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              marginBottom: '1rem'
            }}>
              No matches found
            </h3>
            <p style={{
              opacity: 0.8,
              fontSize: '1.125rem'
            }}>
              Try adjusting your preferences to find more date ideas.
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {filteredResults.map(renderDateIdeaCard)}
          </div>
        )}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.2;
            transform: scale(1.05);
          }
        }
        
        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
} 