import React from 'react'

interface SwitchProps {
  checked:  boolean
  onChange: () => void
  label:    string
}

/** Accessible toggle switch used by the popup feature list. */
export default function Switch({ checked, onChange, label }: SwitchProps) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      className={`toggle ${checked ? 'toggle--on' : 'toggle--off'}`}
      onClick={onChange}
    >
      <span className="toggle-thumb" />
    </button>
  )
}
