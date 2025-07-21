"use client"
import NotFound from "@/app/not-found"
import connect from "@/lib/database"
import Districts from "@/lib/models/districts"
import Image from "next/image"
import ContentElement from "@/components/UI/ContentElement/ContentElement"
import SearchElement from "@/components/UI/search/searchElement"
import { useRouter } from "next/navigation"

const DistrictComponent: React.FC<{
  district_id: string
  data: {
    name: string
    capital: string
    voivodeship: string
  }
}> = ({ district_id, data }) => {
  const router = useRouter()

  return (
    <ContentElement
      className='bg-sectionbg p-20'
      heading={`${data.voivodeship}, Powiat ${data.name}`}
      subheading='INFORMACJE O POWIECIE'
      isWhite>
      <div className='mb-10'>
        <h4 className='text-2xl text-white mb-4'>Znajdź szkołę w powiecie:</h4>
        <SearchElement
          apiUrl={`/v1/schools/${district_id}`}
          placeholder='Wyszukaj szkołę'
          onSelect={(element: { _id: string; name: string }) => {
            router.push(`/app/nawigator/${district_id}/${element._id}`)
          }}
        />
      </div>
    </ContentElement>
  )
}

export default DistrictComponent
