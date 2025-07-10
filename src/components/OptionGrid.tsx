import React, { useState } from 'react'

interface OptionGridProps {
  title: string
  options: Array<{
    value: string
    label: string
    icon: string
  }>
  isMultiSelect?: boolean
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
  className?: string
}

export default function OptionGrid({ 
  title, 
  options, 
  isMultiSelect = false, 
  selectedValues, 
  onSelectionChange,
  className = ""
}: OptionGridProps) {
  
  const handleOptionClick = (optionValue: string) => {
    if (isMultiSelect) {
      // Toggle selection for multi-select
      const newSelection = selectedValues.includes(optionValue)
        ? selectedValues.filter(value => value !== optionValue)
        : [...selectedValues, optionValue]
      onSelectionChange(newSelection)
    } else {
      // Single select - replace current selection
      onSelectionChange([optionValue])
    }
  }

  return (
    <div className={`form-section ${className}`}>
      <div className="section-title">
        <svg className="section-icon" viewBox="0 0 24 24">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        {title}
      </div>
      <div className="option-grid">
        {options.map((option) => (
          <div
            key={option.value}
            className={`option-card ${selectedValues.includes(option.value) ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.value)}
            data-option={option.value}
          >
            <div className="option-icon">{option.icon}</div>
            <div>{option.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
} 