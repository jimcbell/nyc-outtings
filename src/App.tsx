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
        <DateFinderForm onSubmit={handleFormSubmit} initialPreferences={preferences} />
        
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