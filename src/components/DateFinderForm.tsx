import { useState, useEffect } from 'react'
import { DatePreferences } from '../App'
import { MapPinIcon, SunIcon, MoonIcon, ClockIcon, BeakerIcon, PaintBrushIcon, UserGroupIcon, UserIcon, MagnifyingGlassIcon, TvIcon } from '@heroicons/react/24/outline'
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
  const [formData, setFormData] = useState<DatePreferences>({
    neighborhoods: initialPreferences?.neighborhoods || [],
    timeOfDay: initialPreferences?.timeOfDay || [],
    activities: initialPreferences?.activities || [],
    accessibility: initialPreferences?.accessibility || false,
    dietaryRestrictions: initialPreferences?.dietaryRestrictions || []
  })
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

  const handleNeighborhoodChange = (neighborhood: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      neighborhoods: checked 
        ? [...prev.neighborhoods, neighborhood]
        : prev.neighborhoods.filter(n => n !== neighborhood)
    }))
  }

  const handleTimeOfDayChange = (time: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      timeOfDay: checked
        ? [...prev.timeOfDay, time]
        : prev.timeOfDay.filter(t => t !== time)
    }))
  }

  const handleActivityChange = (activity: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      activities: checked
        ? [...prev.activities, activity]
        : prev.activities.filter(a => a !== activity)
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with wave pattern */}
      <div className="header-wave">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-white text-center mb-2">Find Your Perfect Event</h1>
          <p className="text-white text-center text-lg">Discover NYC's best experiences tailored to your preferences</p>
        </div>
      </div>

      {/* Decorative circles */}
      <div className="decorative-circles">
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>
      </div>

      {/* Main form card */}
      <div className="container mx-auto px-4">
        <form onSubmit={handleSubmit} className="form-card">
          {/* Neighborhoods Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <MapPinIcon className="w-5 h-5 mr-2 text-teal-500" />
              Neighborhoods
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].map((neighborhood) => (
                <label key={neighborhood} className={`option-button ${
                  formData.neighborhoods.includes(neighborhood)
                    ? 'option-button--selected'
                    : 'option-button--unselected'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.neighborhoods.includes(neighborhood)}
                    onChange={(e) => handleNeighborhoodChange(neighborhood, e.target.checked)}
                    className="sr-only"
                  />
                  <MapPinIcon className="w-5 h-5 mr-2 flex-shrink-0" />
                  {neighborhood}
                </label>
              ))}
            </div>
            {errors.neighborhoods && <p className="mt-2 text-sm text-red-600">{errors.neighborhoods}</p>}
          </div>

          {/* Time of Day Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <ClockIcon className="w-5 h-5 mr-2 text-teal-500" />
              Time of Day
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label: 'Daytime', icon: SunIcon },
                { label: 'Nighttime', icon: MoonIcon },
                { label: 'Any', icon: ClockIcon }
              ].map(({ label, icon: Icon }) => (
                <label key={label} className={`option-button ${
                  formData.timeOfDay.includes(label)
                    ? 'option-button--selected'
                    : 'option-button--unselected'
                }`}>
                  <input
                    type="checkbox"
                    checked={formData.timeOfDay.includes(label)}
                    onChange={(e) => handleTimeOfDayChange(label, e.target.checked)}
                    className="sr-only"
                  />
                  <Icon className="option-icon" />
                  <span>{label}</span>
                </label>
              ))}
            </div>
            {errors.timeOfDay && <p className="mt-2 text-sm text-red-600">{errors.timeOfDay}</p>}
          </div>

          {/* Activities Section */}
          <div className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <TvIcon className="w-5 h-5 text-teal-500" />
              <h2 className="text-lg font-medium">Activities</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                className={`option-button ${
                  formData.activities.includes('Food & Drink') ? 'option-button--selected' : 'option-button--unselected'
                }`}
                onClick={() => handleActivityChange('Food & Drink', true)}
              >
                <BeakerIcon className="option-icon" />
                Food & Drink
              </button>
              <button
                type="button"
                className={`option-button ${
                  formData.activities.includes('Arts & Culture') ? 'option-button--selected' : 'option-button--unselected'
                }`}
                onClick={() => handleActivityChange('Arts & Culture', true)}
              >
                <PaintBrushIcon className="option-icon" />
                Arts & Culture
              </button>
              <button
                type="button"
                className={`option-button ${
                  formData.activities.includes('Outdoor & Sports') ? 'option-button--selected' : 'option-button--unselected'
                }`}
                onClick={() => handleActivityChange('Outdoor & Sports', true)}
              >
                <UserGroupIcon className="option-icon" />
                Outdoor & Sports
              </button>
              <button
                type="button"
                className={`option-button ${
                  formData.activities.includes('Entertainment') ? 'option-button--selected' : 'option-button--unselected'
                }`}
                onClick={() => handleActivityChange('Entertainment', true)}
              >
                <TvIcon className="option-icon" />
                Entertainment
              </button>
            </div>
          </div>
          {errors.activities && <p className="mt-2 text-sm text-red-600">{errors.activities}</p>}

          {/* Accessibility Section */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
              <UserIcon className="w-5 h-5 mr-2 text-teal-500" />
              Accessibility
            </h3>
            <label className={`option-button ${
              formData.accessibility
                ? 'option-button--selected'
                : 'option-button--unselected'
            }`}>
              <input
                type="checkbox"
                checked={formData.accessibility}
                onChange={(e) => handleChange('accessibility', e.target.checked)}
                className="sr-only"
              />
              <UserIcon className="option-icon" />
              <span>Wheelchair Accessible</span>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="cta-button">
            <MagnifyingGlassIcon className="w-6 h-6" />
            Find Date Ideas
          </button>
        </form>
      </div>
    </div>
  )
} 