import { NextRequest, NextResponse } from "next/server";
import { verifyRecaptcha } from "@/lib/verifyRecaptcha";
import reqJson from "@/lib/reqJson";
import connect from "@/lib/database";
import mongoose, { model } from "mongoose";
import Districts from "@/lib/models/districts";
import SchoolSchema from "@/lib/models/school";

const settings: { tags: number; type: number; extensions: number } = {
  tags: 2,
  type: 0.5,
  extensions: 0.5,
};

export async function POST(req: NextRequest) {
  try {
    const body: {
      district_id: string;
      token: string;
      data: {
        paid: boolean;
        tags: string[];
        extensions: string[];
        ranking?: number;
        type: number;
      };
    } = await reqJson(req);

    if (!body) {
      return NextResponse.json({ error: "Invalid data or Data errors" }, { status: 400 });
    }
    if (
      !body.district_id ||
      !body.data ||
      typeof body.data.paid !== "boolean" ||
      !Array.isArray(body.data.tags) ||
      !Array.isArray(body.data.extensions) ||
      typeof body.data.type !== "number" ||
      body.data.type < 1 ||
      body.data.type > 4
    ) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    if (body.data.tags.length < 1 || body.data.extensions.length < 1) {
      return NextResponse.json({ error: "Too little tags or extensions" }, { status: 400 });
    }

    await connect();

    const schools =
      mongoose.models[body.district_id] || model(body.district_id, SchoolSchema);

    const docs = await schools.find();
    const district = await Districts.findByIdAndUpdate(body.district_id, {
      $inc: { used: 1 },
    }).exec();

    if (!docs || !district) {
      return NextResponse.json({ error: "No district found" }, { status: 400 });
    }

    const data = await search(body, schools);

    if (data.length > 0) {
      return NextResponse.json(data, { status: 200 });
    } else {
      return NextResponse.json(
        {
          message:
            "Nie udało się znaleźć odpowiedniego kierunku. Spróbuj rozwinąć swoje odpowiedzi w formularzu.",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Błąd w POST:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

async function search(body: any, schools: mongoose.Model<any>) {
  try {
    const topProfiles = await schools.aggregate([
      { $match: { paid: body.data.paid } },
      { $unwind: "$profiles" },
      {
        $addFields: {
          score: {
            $add: [
              { $cond: [{ $eq: ["$profiles.type", body.data.type] }, settings.type, 0] },
              { 
                $multiply: [
                  { $size: { $setIntersection: [{ $ifNull: ["$profiles.tags", []] }, body.data.tags] } },
                  settings.tags
                ]
              },
              { 
                $multiply: [
                  { $size: { $setIntersection: [{ $ifNull: ["$profiles.extensions", []] }, body.data.extensions] } },
                  settings.extensions
                ]
              },
              { 
                $multiply: [
                  { $size: { $setIntersection: [{ $ifNull: ["$profiles.extensionsOPT", []] }, body.data.extensions] } },
                  settings.extensions
                ]
              }
            ]
          }
        }
      },      
      { $match: { score: { $gt: 0.5 } } }, 
      { $sort: { score: -1 } },
      { $limit: 3 },
      {
        $project: {
          _id: 0,
          schoolName: "$name",
          schoolUrl: "$url",
          schoolPaid: "$paid",
          profileName: "$profiles.name",
          profileImg: "$profiles.img",
          profileType: "$profiles.type",
          profileTags: "$profiles.tags",
          profileExtensions: "$profiles.extensions",
          profileExtensionsOPT: "$profiles.extensionsOPT",
          score: 1,
        },
      },
    ]);

    return topProfiles.length > 0 ? topProfiles : [];
  } catch (error) {
    console.error("Błąd podczas pobierania profili:", error);
    return [];
  }
}