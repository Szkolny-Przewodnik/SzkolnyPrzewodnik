"use client"
import { useRouter } from "next/navigation"
import Select from "react-select"
import { ProfileType } from "@/lib/models/school"
import { useRef, useState } from "react"
import { useGoogleReCaptcha } from "react-google-recaptcha-v3"

const FormDoradztwoComponent: React.FC<{
  district_id: string
  tags: string[]
  extensions: string[]
}> = ({ district_id, tags, extensions }) => {


  const tagOptions = tags.map((el) => ({
    value: el,
    label: el,
  }))
  const extensionsOptions = extensions.map(
    (el) => ({
      value: el,
      label: el,
    })
  )

  const customStyles = {
    menuPortal: (provided: any) => ({
      ...provided,
      zIndex: 9999,
    }),
  }

  const errorEl = useRef<HTMLHeadingElement | null>(null)

  const [selectedTags, setSelectedTags] = useState([])
  const [selectedExtensions, setSelectedExtensions] = useState([])
  const isPaid = useRef(false)
  const type = useRef<number>(0)

  const router = useRouter()
  const { executeRecaptcha } = useGoogleReCaptcha()

  return (
    <form
      onSubmit={async e => {
        if (!errorEl.current) return
        e.preventDefault()

        if (!executeRecaptcha) {
          errorEl.current.innerHTML = "Błąd ReCaptcha"
          return
        }

        const token = await executeRecaptcha("get_price")

        const data = {
          district_id: district_id,
          token: token,
          data: {
            paid: isPaid.current,
            tags: selectedTags.map((e: any) => {
              return e.label
            }),
            extensions: selectedExtensions.map((e: any) => {
              return e.label
            }),
            type: type.current,
          },
        }
        if (!data.district_id)
          return (errorEl.current.innerHTML = "Nie wybrano powiatu")
        if (data.data.type === 0)
          return (errorEl.current.innerHTML = "Nie wybrano typu szkoły")
        if (data.data.tags.length === 0)
          return (errorEl.current.innerHTML = "Nie wybrano zainteresowania")

        if (data.data.extensions.length === 0)
          return (errorEl.current.innerHTML = "Nie wybrano rozszerzenia")
        localStorage.setItem("formData", JSON.stringify(data))

        router.push("/app/doradztwo/results")
      }}
      className='flex flex-col gap-6 shadow-2xl shadow-gray rounded-3xl p-10 w-[40rem] max-sm:w-[90%] max-sm:self-center'
      style={{
        backgroundImage: "linear-gradient(to right bottom,#444464,#191936)",
      }}>
      <div className='flex gap-4 text-white16 text-3xl max-sm:text-4xl'>
        <label htmlFor='paid'>Czy uwzględniać szkoły niepubliczne?</label>
        <input
          type='checkbox'
          id='paid'
          className='relative text-2xl max-sm:text-3xl w-6 h-6 outline-none transition-all duration-300 appearance-none flex content-center justify-center border-[0.3rem] border-btn rounded-full checked:bg-white16 translate-y-[20%]'
          onChange={e => {
            isPaid.current = e.currentTarget.checked
          }}
        />
      </div>
      <div className='flex flex-col gap-4 relative'>
        <label
          htmlFor='school-type'
          className='text-3xl max-sm:text-4xl text-white16'>
          Wybierz preferowany typ szkoły
          <span className='text-red-500'>*</span>
        </label>
        <Select
          name='tags'
          options={[
            { value: ProfileType.TECHNIKUM, label: "Technikum" },
            { value: ProfileType.LICEUM, label: "Liceum" },
            {
              value: ProfileType.ZAWODOWKA,
              label: "Branżowa szkoła I stopnia",
            },
            { value: ProfileType.NIEWIEM, label: "Nie wiem" },
          ]}
          className='basic-multi-select text-black absolute z-[80]'
          classNamePrefix='select'
          styles={customStyles}
          menuPosition={"fixed"}
          placeholder='Wybierz typ szkoły...'
          noOptionsMessage={() => "Brak opcji"}
          onChange={(selected: any) => {
            type.current = Number(selected.value)
          }}
        />
      </div>

      <div className='flex flex-col gap-4 relative'>
        <label className='text-3xl max-sm:text-4xl text-white16'>
          Wybierz swoje zainteresowania
        </label>
        <Select
          isMulti
          name='tags'
          options={tagOptions}
          className='basic-multi-select text-black absolute z-50'
          classNamePrefix='select'
          styles={customStyles}
          menuPosition={"fixed"}
          placeholder='Wybierz zainetresowania...'
          noOptionsMessage={() => "Brak opcji"}
          onChange={(selectedOptions: any) => {
            setSelectedTags(selectedOptions || [])
          }}
        />
      </div>
      <div className='flex flex-col gap-4 relative'>
        <label className='text-3xl max-sm:text-4xl text-white16'>
          Wybierz rozszerzenia
        </label>
        <Select
          isMulti
          name='extensions'
          options={extensionsOptions}
          className='basic-multi-select text-black absolute'
          classNamePrefix='select'
          styles={customStyles}
          menuPosition={"fixed"}
          noOptionsMessage={() => "Brak opcji"}
          placeholder='Wybierz rozszerzenia...'
          onChange={(selectedOptions: any) => {
            setSelectedExtensions(selectedOptions || [])
          }}
        />
      </div>
      <h2 ref={errorEl} className='text-xl text-center text-red-400'></h2>

      <button
        type='submit'
        className='text-2xl font-medium bg-btn text-white5 no-underline inline-block py-6 px-10 rounded-xl transition-all duration-short hover:scale-110 mx-auto'>
        Pokaż proponowane kierunki
      </button>
      <p className='text-red-300 text-center'>
        * W przypadku, gdy nie zostanie znaleziony kierunek o danym typie,
        zostanie dobrany inny.
      </p>
    </form>
  )
}

export default FormDoradztwoComponent
