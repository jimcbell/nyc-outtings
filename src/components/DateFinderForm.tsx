import { useState, useEffect } from 'react'
import { DatePreferences } from '../App'
import OptionGrid from './OptionGrid'
import '../styles/custom.css'
import AccessibilityInput from './AccessibilityInput'

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

      
      <AccessibilityInput/>
      <button className="search-button pulse" onClick={handleSubmit}>
        <span>✨ Find Amazing Experiences</span>
      </button>
    </div>
  )
} 