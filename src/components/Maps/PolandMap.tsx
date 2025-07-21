import { act, Dispatch, SetStateAction, useState } from "react"
import "./polandmap.css"
import Image from "next/image"
import WojJson from "@/content/woj.json"

const PolandMap: React.FC<{
  district: string
  setDistrict: Dispatch<SetStateAction<string>>
}> = ({ district, setDistrict }) => {
  const handleClick = (e: {
    currentTarget: { id: SetStateAction<string> }
  }) => {
    setDistrict(
      e.currentTarget.id === district ? WojJson.ALL.code : e.currentTarget.id
    )
    return
  }

  return (
    <>
      <div className='map'>
        <Image
          src='/calendar/map.png'
          alt='Mapa województw Polski'
          width={500}
          height={500}
        />
        <ul>
          <li
            className={`zachodnio-pomorskie ${
              district == "ZP" ? "active" : ""
            }`}
            id='ZP'
            onClick={handleClick}>
            <span className='visually-hidden'>zachodniopomorskie</span>
          </li>
          <li
            className={`pomorskie ${district == "PM" ? "active" : ""}`}
            id='PM'
            onClick={handleClick}>
            <span className='visually-hidden'>pomorskie</span>
          </li>
          <li
            className={`warminsko-mazurskie ${
              district == "WM" ? "active" : ""
            }`}
            id='WM'
            onClick={handleClick}>
            <span className='visually-hidden'>warmińsko-mazurskie</span>
          </li>
          <li className='podlaskie' id='PD' onClick={handleClick}>
            <span className='visually-hidden'>podlaskie</span>
          </li>
          <li
            className={`lubuskie ${district == "LB" ? "active" : ""}`}
            id='LB'
            onClick={handleClick}>
            <span className='visually-hidden'>lubuskie</span>
          </li>
          <li
            className={`wielkopolskie ${district == "WP" ? "active" : ""}`}
            id='WP'
            onClick={handleClick}>
            <span className='visually-hidden'>wielkopolskie</span>
          </li>
          <li
            className={`kujawsko-pomorskie ${district == "KP" ? "active" : ""}`}
            id='KP'
            onClick={handleClick}>
            <span className='visually-hidden'>kujawsko-pomorskie</span>
          </li>
          <li
            className={`mazowieckie ${district == "MZ" ? "active" : ""}`}
            id='MZ'
            onClick={handleClick}>
            <span className='visually-hidden'>mazowieckie</span>
          </li>
          <li
            className={`dolnoslaskie ${district == "DS" ? "active" : ""}`}
            id='DS'
            onClick={handleClick}>
            <span className='visually-hidden'>dolnośląskie</span>
          </li>
          <li
            className={`lodzkie ${district == "LD" ? "active" : ""}`}
            id='LD'
            onClick={handleClick}>
            <span className='visually-hidden'>łódzkie</span>
          </li>
          <li
            className={`opolskie ${district == "OP" ? "active" : ""}`}
            id='OP'
            onClick={handleClick}>
            <span className='visually-hidden'>opolskie</span>
          </li>
          <li
            className={`slaskie ${district == "SL" ? "active" : ""}`}
            id='SL'
            onClick={handleClick}>
            <span className='visually-hidden'>śląskie</span>
          </li>
          <li
            className={`swietokrzyskie ${district == "SK" ? "active" : ""}`}
            id='SK'
            onClick={handleClick}>
            <span className='visually-hidden'>świętokrzyskie</span>
          </li>
          <li
            className={`lubelskie ${district == "LU" ? "active" : ""}`}
            id='LU'
            onClick={handleClick}>
            <span className='visually-hidden'>lubelskie</span>
          </li>
          <li
            className={`malopolskie ${district == "MA" ? "active" : ""}`}
            id='MA'
            onClick={handleClick}>
            <span className='visually-hidden'>małopolskie</span>
          </li>
          <li
            className={`podkarpackie ${district == "PK" ? "active" : ""}`}
            id='PK'
            onClick={handleClick}>
            <span className='visually-hidden'>podkarpackie</span>
          </li>
        </ul>
      </div>
    </>
  )
}
export default PolandMap
