import { useState } from 'react'
import DateFinderForm from './components/DateFinderForm'
import ResultsView from './components/ResultsView'
import Ad from './components/Ad'
import { dateIdeas } from './data/dateIdeas'
import './styles/custom.css'

export interface DatePreferences {
  neighborhoods: string[]
  timeOfDay: string[]
  activities: string[]
  accessibility: boolean
  dietaryRestrictions: string[]
}

function App() {
  const [showResults, setShowResults] = useState(false)
  const [preferences, setPreferences] = useState<DatePreferences | null>(null)
  const [filteredIdeas, setFilteredIdeas] = useState(dateIdeas)

  const googleAds : boolean = (import.meta as any).env.VITE_GOOGLE_ADS_ENABLED === 'true';

  const handleFormSubmit = (data: DatePreferences) => {
    setPreferences(data)
    
    // Filter date ideas based on preferences
    const filtered = dateIdeas.filter(idea => {
      // Neighborhood match
      const neighborhoodMatch = data.neighborhoods.length === 0 || 
        data.neighborhoods.some(neighborhood => 
          idea.neighborhood.toLowerCase().includes(neighborhood.toLowerCase())
        )

      // Time of day match
      const timeMatch = data.timeOfDay.length === 0 || 
        data.timeOfDay.some(time => {
          if (time.toLowerCase() === 'any') return true
          return idea.timeOfDay.some(ideaTime => ideaTime.toLowerCase() === time.toLowerCase())
        })

      // Activity type match
      const activityMap: { [key: string]: string[] } = {
        'Food & Drink': ['Dining'],
        'Arts & Culture': ['Culture'],
        'Outdoor & Sports': ['Active'],
        'Entertainment': ['Entertainment']
      }
      const activityMatch = data.activities.length === 0 || 
        data.activities.some(activity => 
          activityMap[activity]?.includes(idea.activityType)
        )

      // Accessibility match
      const accessibilityMatch = !data.accessibility || idea.accessibility.includes('wheelchair')

      // Dietary restrictions match
      const dietaryMatch = !data.dietaryRestrictions.length || 
        data.dietaryRestrictions.every(restriction => 
          idea.dietaryOptions.includes(restriction.toLowerCase())
        )

      return neighborhoodMatch && timeMatch && activityMatch && accessibilityMatch && dietaryMatch
    })

    setFilteredIdeas(filtered)
    setShowResults(true)
  }

  const handleBack = () => {
    setShowResults(false)
  }

  return (
    <>
    <div className="bg-pattern">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
    </div>

    <div className="container">
        <div className="header">
            <h1>NYC Outings Finder</h1>
            <p>Discover the perfect events and experiences in the city that never sleeps</p>
        </div>

        <div className="form-container">
            <h2 className="form-title">Find Your Perfect Experience</h2>
            <p className="form-subtitle">Customize your search to discover NYC adventures tailored just for you</p>

            <div className="form-section">
                <div className="section-title">
                    <svg className="section-icon" viewBox="0 0 24 24">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Neighborhoods
                </div>
                <div className="option-grid">
                    <div className="option-card" data-option="manhattan">
                        <div className="option-icon">🏙️</div>
                        <div>Manhattan</div>
                    </div>
                    <div className="option-card" data-option="brooklyn">
                        <div className="option-icon">🌉</div>
                        <div>Brooklyn</div>
                    </div>
                    <div className="option-card" data-option="queens">
                        <div className="option-icon">🏘️</div>
                        <div>Queens</div>
                    </div>
                    <div className="option-card" data-option="bronx">
                        <div className="option-icon">🌳</div>
                        <div>Bronx</div>
                    </div>
                    <div className="option-card" data-option="staten-island">
                        <div className="option-icon">🚢</div>
                        <div>Staten Island</div>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="section-title">
                    <svg className="section-icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
                        <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                    </svg>
                    Time of Day
                </div>
                <div className="option-grid">
                    <div className="option-card" data-option="morning">
                        <div className="option-icon">🌅</div>
                        <div>Morning</div>
                    </div>
                    <div className="option-card" data-option="afternoon">
                        <div className="option-icon">☀️</div>
                        <div>Afternoon</div>
                    </div>
                    <div className="option-card" data-option="evening">
                        <div className="option-icon">🌆</div>
                        <div>Evening</div>
                    </div>
                    <div className="option-card" data-option="night">
                        <div className="option-icon">🌟</div>
                        <div>Night</div>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="section-title">
                    <svg className="section-icon" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                    Activities
                </div>
                <div className="option-grid">
                    <div className="option-card" data-option="food">
                        <div className="option-icon">🍽️</div>
                        <div>Food & Drink</div>
                    </div>
                    <div className="option-card" data-option="culture">
                        <div className="option-icon">🎨</div>
                        <div>Arts & Culture</div>
                    </div>
                    <div className="option-card" data-option="outdoor">
                        <div className="option-icon">🏃</div>
                        <div>Outdoor & Sports</div>
                    </div>
                    <div className="option-card" data-option="entertainment">
                        <div className="option-icon">🎭</div>
                        <div>Entertainment</div>
                    </div>
                </div>
            </div>

            <div className="form-section">
                <div className="section-title">
                    <svg className="section-icon" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Accessibility
                </div>
                <div className="accessibility-section">
                    <div className="accessibility-option" data-option="wheelchair">
                        <div className="checkbox"></div>
                        <div>♿ Wheelchair Accessible</div>
                    </div>
                    <div className="accessibility-option" data-option="hearing">
                        <div className="checkbox"></div>
                        <div>🎧 Hearing Assistance Available</div>
                    </div>
                    <div className="accessibility-option" data-option="visual">
                        <div className="checkbox"></div>
                        <div>👁️ Visual Assistance Available</div>
                    </div>
                </div>
            </div>

            <button className="search-button pulse" onclick="searchEvents()">
                <span>✨ Find Amazing Experiences</span>
            </button>
        </div>
    </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 NYC Outtings Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}

export default App 