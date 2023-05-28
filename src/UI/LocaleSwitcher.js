import React from 'react'
import ReactCountryFlag from 'react-country-flag'

export const LocaleSwitcher = ({ onChange, checked }) => {
  const flagRu = (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode="RU"
      svg
      style={{
        width: '24px',
        height: '18px',
        border: `1px solid grey`,
        borderRadius: '5px'
      }}
    />
  )
  const flagUa = (
    <ReactCountryFlag
      className="emojiFlag"
      countryCode="UA"
      svg
      style={{
        width: '24px',
        height: '18px',
        border: `1px solid grey`,
        borderRadius: '5px'
      }}
    />
  )
  
  return (
    <div className="locale-switcher">
      <div className="locale-flag">{flagRu}</div>
      <label className="locale-switch">
        <input type="checkbox" onChange={onChange} checked={checked} />
        <span className="locale round"></span>
      </label>
      <div className="locale-flag">{flagUa}</div>
    </div>
  )
}
