import { useState } from "react";

export default function AccessibilityInput(){

    const [accessibility, setAccessibility] = useState<Array<string>>([]);
    const handleAccessibilityClick = (option : string, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (accessibility.includes(option)){
            setAccessibility(accessibility.filter(a => a !== option));
        }
        else{
            setAccessibility([...accessibility, option]);
        }
    }

    return (
        <div className="form-section">
        <div className="section-title">
        <svg className="section-icon" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
        Accessibility
        </div>
        <div className="accessibility-section">
        <div className={`accessibility-option ${accessibility.includes("wheelchair") ? "selected" : ""}`} data-option="wheelchair" onClick={(e) =>handleAccessibilityClick("wheelchair", e)}>
            <div className={`checkbox ${accessibility.includes("wheelchair") ? "checked" : ""}`}></div>
            <div>♿ Wheelchair Accessible</div>
        </div>
        <div className={`accessibility-option ${accessibility.includes("hearing") ? "selected" : ""}`} data-option="hearing" onClick={(e) =>handleAccessibilityClick("hearing", e)}>
            <div className={`checkbox ${accessibility.includes("hearing") ? "checked" : ""}`}></div>
            <div>🎧 Hearing Assistance Available</div>
        </div>
        <div className={`accessibility-option ${accessibility.includes("visual") ? "selected" : ""}`} data-option="visual" onClick={(e) => handleAccessibilityClick("visual", e)}>
            <div className={`checkbox ${accessibility.includes("visual") ? "checked" : ""}`}></div>
            <div>👁️ Visual Assistance Available</div>
        </div>
        </div>
    </div>
  )
}