import { Request } from "@hapi/hapi";
import { Client } from "@notionhq/client";

import filter from "../helpers/filter";

const Notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

interface Payload {
  id: string;
}

interface InsertionPayload {
  database_id: string;
  page_title: string;
  status?: string;
}

export const getDatabaseById = async (req: Request) => {
  const payload = <Payload>req.payload;

  const response = await Notion.databases.retrieve({
    database_id: payload.id,
  });

  return { ...response };
};

export const getDatabasePages = async (req: Request) => {
  const payload = <Payload>req.payload;

  const response = await Notion.databases.query({
    database_id: payload.id,
  });

  return { ...response };
};

export const insertPage = async (req: Request) => {
  const { database_id, page_title } = <InsertionPayload>req.payload;

  const database = await Notion.databases.retrieve({
    database_id,
  });

  const {
    title: { name, id },
  } = filter(database.properties, ["title"]);

  const response = await Notion.pages.create({
    parent: { database_id },
    properties: {
      [name]: {
        id,
        type: "title",
        title: [
          {
            text: { content: page_title },
            plain_text: page_title,
            type: "text",
            annotations: {
              bold: false,
              italic: false,
              strikethrough: false,
              underline: false,
              code: false,
              color: "default",
            },
          },
        ],
      },
      // TODO: add ability to select issue status
      // Status: {
      //   id: "status",
      //   type: "select",
      //   select: {
      //     id: "0082af65-d0ca-4f39-85bd-032a2e5f7a58",
      //     name: "Backlog",
      //     color: "pink",
      //   },
      // },
    },
  });

  return { ...response };
};
