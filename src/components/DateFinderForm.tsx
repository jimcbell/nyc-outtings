import { useState, useEffect } from 'react'
import { DatePreferences } from '../App'
import OptionGrid from './OptionGrid'
import '../styles/custom.css'

interface FormErrors {
  neighborhoods?: string
  timeOfDay?: string
  activities?: string
}

interface DateFinderFormProps {
  onSubmit: (data: DatePreferences) => void
  initialPreferences?: DatePreferences | null
}

export default function DateFinderForm({ onSubmit, initialPreferences }: DateFinderFormProps) {
  // State for the selection of preferences
  const [formData, setFormData] = useState<DatePreferences>({
    neighborhoods: initialPreferences?.neighborhoods || [],
    timeOfDay: initialPreferences?.timeOfDay || [],
    activities: initialPreferences?.activities || [],
    accessibility: initialPreferences?.accessibility || false,
    dietaryRestrictions: initialPreferences?.dietaryRestrictions || []
  })

  // State for form errors
  const [errors, setErrors] = useState<FormErrors>({})

  // Update form data when initialPreferences changes
  useEffect(() => {
    if (initialPreferences) {
      setFormData(initialPreferences)
    }
  }, [initialPreferences])

  const handleChange = (field: keyof DatePreferences, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNeighborhoodChange = (neighborhoods: string[]) => {
    setFormData(prev => ({
      ...prev,
      neighborhoods
    }))
  }

  const handleTimeOfDayChange = (timeOfDay: string[]) => {
    setFormData(prev => ({
      ...prev,
      timeOfDay
    }))
  }

  const handleActivityChange = (activities: string[]) => {
    setFormData(prev => ({
      ...prev,
      activities
    }))
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (formData.neighborhoods.length === 0) {
      newErrors.neighborhoods = 'Please select at least one neighborhood'
    }

    if (formData.timeOfDay.length === 0) {
      newErrors.timeOfDay = 'Please select at least one time of day'
    }
    
    if (formData.activities.length === 0) {
      newErrors.activities = 'Please select at least one activity type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handles submitting the form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  // Data for the option grids
  const neighborhoodOptions = [
    { value: 'manhattan', label: 'Manhattan', icon: '🏙️' },
    { value: 'brooklyn', label: 'Brooklyn', icon: '🌉' },
    { value: 'queens', label: 'Queens', icon: '🏘️' },
    { value: 'bronx', label: 'Bronx', icon: '🌳' },
    { value: 'staten-island', label: 'Staten Island', icon: '🚢' }
  ]

  const timeOfDayOptions = [
    { value: 'morning', label: 'Morning', icon: '🌅' },
    { value: 'afternoon', label: 'Afternoon', icon: '☀️' },
    { value: 'evening', label: 'Evening', icon: '🌆' },
    { value: 'night', label: 'Night', icon: '🌟' }
  ]

  const activityOptions = [
    { value: 'food', label: 'Food & Drink', icon: '🍽️' },
    { value: 'culture', label: 'Arts & Culture', icon: '🎨' },
    { value: 'outdoor', label: 'Outdoor & Sports', icon: '🏃' },
    { value: 'entertainment', label: 'Entertainment', icon: '🎭' }
  ]

  return (
    <div className="form-container">
      <h2 className="form-title">Find Your Perfect Experience</h2>
      <p className="form-subtitle">Customize your search to discover NYC adventures tailored just for you</p>

      <OptionGrid
        title="Neighborhoods"
        options={neighborhoodOptions}
        isMultiSelect={false}
        selectedValues={formData.neighborhoods}
        onSelectionChange={handleNeighborhoodChange}
      />

      <OptionGrid
        title="Time of Day"
        options={timeOfDayOptions}
        isMultiSelect={false}
        selectedValues={formData.timeOfDay}
        onSelectionChange={handleTimeOfDayChange}
      />

      <OptionGrid
        title="Activities"
        options={activityOptions}
        isMultiSelect={true}
        selectedValues={formData.activities}
        onSelectionChange={handleActivityChange}
      />

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

      <button className="search-button pulse" onClick={handleSubmit}>
        <span>✨ Find Amazing Experiences</span>
      </button>
    </div>
  )
} 