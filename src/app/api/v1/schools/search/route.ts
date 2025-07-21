import { NextRequest, NextResponse } from "next/server"
import connect from "@/lib/database"
import reqJson from "@/lib/reqJson"
import mongoose from "mongoose"
import { verifyRecaptcha } from "@/lib/verifyRecaptcha"
import Districts from "@/lib/models/districts"
import SchoolSchema from "@/lib/models/school"
const { Schema, model } = mongoose

const settings: { tags: number; type: number; extensions: number } = {
  tags: 2,
  type: 0.5,
  extensions: 0.5,
}

export async function POST(req: NextRequest) {
  const body: {
    district_id: string
    token: string
    data: {
      paid: boolean | undefined
      tags: string[]
      extensions: string[]

      ranking?: number
      type: number
    }
  } = await reqJson(req)
  if (body) {
    if (!verifyRecaptcha(body.token))
      return NextResponse.json({
        error: "Wykryto bota, system wykrył podejrzane zachowanie.",
      })

    if (
      !body.district_id ||
      !body.data ||
      body.data.paid == undefined ||
      !body.data.extensions ||
      !body.data.tags ||
      !body.data.type ||
      body.data.type > 4 ||
      body.data.type < 1
    )
      return NextResponse.json({ error: "Invalid data" }, { status: 400 })

    if (body.data.tags.length < 1 || body.data.extensions.length < 1) {
      return NextResponse.json(
        { error: "Too little tags or extensions" },
        { status: 400 }
      )
    }
    await connect()
    const schools =
      mongoose.models[body.district_id] || model(body.district_id, SchoolSchema)

    const docs = await schools.find()

    const district = await Districts.findByIdAndUpdate(body.district_id, {
      $inc: { used: 1 },
    }).exec()

    if (!docs || !district) {
      return NextResponse.json({ error: "No district find" }, { status: 400 })
    }

    // Paid logic
    const filteredDocs = docs.filter(el => {
      if (el.paid && !body.data.paid) return false
      return true
    })

    const [summary, summarySchool]: any = searchSchools(
      filteredDocs,
      body,
      true
    )

    const data = []

    for (const profile of summary) {
      const school = summarySchool.find((el: { _id: any }) => el._id === profile.schoolId)
      data.push({
        schoolName: school.name,
        schoolUrl: school.url,
        schoolPaid: school.paid,
        profileName: profile.name,
        profileImg: profile.img,
        profileType: profile.type,
        profileTags: profile.tags,
        profileExtensions: profile.extensions,
        profileExtensionsOPT: profile.extensionsOPT,
        score: profile.points.tags + profile.points.type + profile.points.extensions,
      })
    }
    data.sort((a: any, b: any) => {
      return b.score - a.score
    })


    if (summary.length > 0) {
      return NextResponse.json(
        data.slice(0, 3),
        { status: 200 }
      )
    } else {
      return NextResponse.json(
        {
          message:
            "Nie udało się znaleźć odpowiedniego kierunku. Spróbuj rozwinąć swoje odpowiedzi w formularzu.",
        },
        { status: 200 }
      )
    }
  } else {
    return NextResponse.json(
      { error: "Invalid data or Data errors" },
      { status: 400 }
    )
  }
}

// Functions

function searchSchools(filteredDocs: any[], body: any, type: boolean) {
  let summary: any[] = []
  let summarySchool: any[] = []
  let points: any[] = []

  filteredDocs.forEach((el, index) => {
    const elPoints: {
      id: string
      results: {
        math: number
        polish: number
        aliens: number
      }
      profiles: {
        id: string
        tags: number
        extensions: number
      }[]
    } = {
      id: el._id,
      results: {
        math: el.results.math,
        polish: el.results.polish,
        aliens: el.results.aliens,
      },
      profiles: [],
    }

    el.profiles.forEach((profile: any) => {
      const profilePoints: {
        id: string
        tags: number
        extensions: number
        type: number
      } = { id: profile.name, tags: 0, extensions: 0, type: 0 }

      // type logic
      if (profile.type === body.data.type) profilePoints.type += settings.type

      try {
        //tags logic
        profile.tags.forEach((tag: string) => {
          body.data.tags.forEach((el: string) => {
            if (tag == el) profilePoints.tags += settings.tags
          })
        })
        profile.extensions // extensions logic
          .forEach((el: any) => {
            body.data.extensions.forEach((ext: string) => {
              if (el == ext)
                profilePoints.extensions += settings.extensions
            })
          })
        if (profile.extensionsOPT)
          profile.extensionsOPT // extensionsOPT logic
            .forEach((el: any) => {
              body.data.extensions.forEach((ext: string) => {
                if (el == ext)
                  profilePoints.extensions += settings.extensions
              })
            })
      } finally {
        if (profilePoints.extensions || profilePoints.tags) {
          if (profilePoints.extensions > 0.5 || profilePoints.tags)
            elPoints.profiles.push(profilePoints)
        }
      }
    })
    points.push(elPoints)
  })

  if (body.data.ranking) {
    let min, max
    switch (body.data.ranking) {
      case 1:
        min = 0
        max = 0.33
        break
      case 2:
        min = 0.33
        max = 0.66
        break
      case 3:
        min = 0.66
        max = 1
        break
      default:
        return NextResponse.json({ error: "Invalid data" }, { status: 400 })
    }

    let [minRanking, maxRanking] = [
      Math.round(points.length * min),
      Math.round(points.length * max),
    ]

    points = filterSchoolsByRanking(points, minRanking, maxRanking)
  }

  points.forEach(el => {
    const schoolInfo = filteredDocs.find(doc => el.id == doc._id)

    if (!schoolInfo) return

    el.profiles.forEach(
      (profile: {
        id: string
        tags: number
        extiensions: number
        type: number
      }) => {
        const profileInfo = schoolInfo.profiles.find(
          (el: { name: string }) => el.name === profile.id
        )
        summary.push({
          name: profileInfo.name,
          type: profileInfo.type,
          tags: profileInfo.tags,
          extensions: profileInfo.extensions,
          extensionsOpt: profileInfo.extensionsOpt || [],
          img: profileInfo.img,
          description: profileInfo.description,
          schoolId: schoolInfo._id,
          points: { ...profile, id: undefined },
        })
      }
    )

    schoolInfo.profiles = undefined

    if (summary.find(el => el.schoolId == schoolInfo._id))
      summarySchool.push(schoolInfo)
  })

  if (summary.length > 2) {
    let totalScore: number = 0
    summary.forEach(el => {
      totalScore += el.points.tags + el.points.extensions + el.points.type
    })

    const summaryFiltred: any[] = []
    summary.forEach((el, index) => {
      const score = el.points.tags + el.points.extensions + el.points.type
      if (
        score >= totalScore / summary.length &&
        totalScore / summary.length !== 0.5
          ? score >= 1
          : true
      )
        summaryFiltred.push(el)
    })
    summary = summaryFiltred.sort((a: any, b: any) => {
      const aPointsTotal = a.points.tags + a.points.extensions + a.points.type
      const bPointsTotal = b.points.tags + b.points.extensions + b.points.type
      return bPointsTotal - aPointsTotal
    })

    const schoolsFiltred: any[] = [...summarySchool]
    summarySchool.forEach(el => {
      const finder = summary.findIndex(profile => profile.schoolId == el._id)
      if (!(finder + 1)) {
        const index = schoolsFiltred.findIndex(school => school._id == el._id)
        schoolsFiltred.splice(index, 1)
      }
    })
    summarySchool = schoolsFiltred
  }

  return [summary, summarySchool]
}

// school rank

function calculateAverage(school: any) {
  return (
    (school.results.math + school.results.polish + school.results.aliens) / 3
  )
}
function rankSchools(schools: []) {
  return schools.sort(
    (a: any, b: any) => calculateAverage(b) - calculateAverage(a)
  )
}

function filterSchoolsByRanking(
  schools: any,
  minRanking: number,
  maxRanking: number
) {
  const rankedSchools = rankSchools(schools)

  return rankedSchools.filter(
    (school, index) => index + 1 >= minRanking && index + 1 <= maxRanking
  )
}
