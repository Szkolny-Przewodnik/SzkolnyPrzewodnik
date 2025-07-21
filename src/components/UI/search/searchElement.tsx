"use client"
import useApi from "@/hooks/useApi"
import { useState, useEffect } from "react"
import Select, { StylesConfig } from "react-select"

const SearchElement: React.FC<{
  apiUrl: string
  placeholder?: string
  onSelect: (element: { _id: string; name: string }) => void
}> = ({ apiUrl, placeholder, onSelect }) => {
  const [query, setQuery] = useState("")
  const [elements, setElements] = useState([])
  const queryString = query !== "" ? `&q=${query}` : ""
  const response = useApi(
    `${apiUrl}?fields=_id,name&per_page=100${queryString}`
  )

  useEffect(() => {
    if (response.data) {
      const sortedElements = response.data.sort((a: any, b: any) => {
        if (a.name.length === b.name.length) {
          return a.name.localeCompare(b.name)
        }
        return a.name.length - b.name.length
      })
      setElements(sortedElements)
    }
  }, [query, response])

  const customStyles: StylesConfig = {
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
    control: provided => ({
      ...provided,
      fontSize: "1.5rem",
      minHeight: "2.2rem",
      border: "1px solid lightgray",
      boxShadow: "none",
      backgroundColor: "white",
      borderRadius: "2rem",
    }),
    valueContainer: provided => ({
      ...provided,
      padding: "0.1rem 0.8rem",
    }),
    input: provided => ({
      ...provided,
      fontSize: "1.5rem",
      lineHeight: "1.2",
    }),
    singleValue: provided => ({
      ...provided,
      fontSize: "1.5rem",
      color: "black",
    }),
    placeholder: provided => ({
      ...provided,
      fontSize: "1.5rem",
      color: "#9ca3b7",
    }),
    menu: provided => ({
      ...provided,
      fontSize: "1.5rem",
      borderRadius: "0.4rem",
      marginTop: "0.3rem",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#001831",
    }),
    option: (provided, state) => ({
      ...provided,
      fontSize: "1.5rem",
      backgroundColor: state.isFocused ? "#00335d" : "#001831",
      color: "white",
      padding: "0.5rem 1rem",
      cursor: "pointer",
    }),
  }
  return (
    <div className='rounded-2xl  relative w-full'>
      <Select
        name='tags'
        options={
          elements
            ? elements.map((el: any) => {
                return { label: el.name, value: el._id }
              })
            : []
        }
        className='text-black absolute z-[80]'
        classNamePrefix='select'
        styles={customStyles}
        menuPosition='fixed'
        placeholder={placeholder ?? "Wyszukaj"}
        noOptionsMessage={() => "Brak opcji"}
        onChange={(selected: any) => {
          onSelect({ _id: selected.value, name: selected.label })
        }}
        onInputChange={event => {
          setQuery(event)
        }}
      />
    </div>
  )
}

export default SearchElement
