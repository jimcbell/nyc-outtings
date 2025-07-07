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
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">NYC Outtings Finder</h1>
              <p className="mt-1 text-sm text-gray-500">
                Discover the perfect event in New York City
              </p>
            </div>
            <div className="flex items-center">
              <svg
                className="h-8 w-8 text-primary-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
              </svg>
            </div>
          </div>
        </div>
      </header>

      {/* Header Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Ad slot="header-banner" format="horizontal" className="w-full" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  Find Your Perfect Event
                </h2>
                <DateFinderForm onSubmit={handleFormSubmit} initialPreferences={preferences} />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-8">
            <div className="flex-1">
              <ResultsView 
                preferences={preferences!} 
                onBack={handleBack}
                filteredIdeas={filteredIdeas}
              />
            </div>
            {/* Sidebar Ad (Desktop Only) */}
            <div className="hidden lg:block w-72">
              <Ad slot="sidebar" format="vertical" className="sticky top-8" />
            </div>
          </div>
        )}
      </main>

      {/* Footer Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Ad slot="footer-banner" format="horizontal" className="w-full" />
      </div>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2024 NYC Outtings Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App 