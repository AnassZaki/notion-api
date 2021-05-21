import { Request } from "@hapi/hapi";
import { Client } from "@notionhq/client";

const Notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

interface Payload {
  id: string;
}

export const getDatabaseById = async (req: Request) => {
  const payload = <Payload>req.payload;

  const response = await Notion.databases.retrieve({
    database_id: payload.id,
  });

  return { ...response };
};
