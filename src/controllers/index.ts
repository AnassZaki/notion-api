import { Request } from "@hapi/hapi";
import { Client } from "@notionhq/client";
import chalk from "chalk";

import filter from "../helpers/filter";

const Notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

export const getDatabaseById = async (req: Request) => {
  const { id: database_id } = <{ id: string }>req.payload;

  try {
    const response = await Notion.databases.retrieve({
      database_id,
    });

    return { ...response };
  } catch (_error) {
    const error = new Error(
      `Error retrieving database ${chalk.magenta(database_id)}: ${
        _error.message
      }`
    );

    console.error(error);
    throw error;
  }
};

export const getDatabasePages = async (req: Request) => {
  const { id: database_id } = <{ id: string }>req.payload;

  try {
    const response = await Notion.databases.query({
      database_id,
    });

    return { ...response };
  } catch (_error) {
    const error = new Error(
      `Error querying database ${chalk.magenta(database_id)}: ${_error.message}`
    );

    console.error(error);
    throw error;
  }
};

interface InsertionPayload {
  database_id: string;
  page_title: string;
  status?: string;
}

export const insertPage = async (req: Request) => {
  const { database_id, page_title } = <InsertionPayload>req.payload;

  try {
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
  } catch (_error) {
    const error = new Error(
      `Error creating page in database ${chalk.magenta(database_id)}: ${
        _error.message
      }`
    );

    console.error(error);
    throw error;
  }
};
