import { getDatabaseById, getDatabasePages, insertPage } from "../controllers";
import { postAssignedPerson } from "../controllers/slack";

import { failAction } from "../lib/logError";
import Joi from "joi";

export default [
  {
    method: "POST",
    path: "/database",
    handler: getDatabaseById,
    options: {
      description: "Get Database by ID",
      tags: ["api"],
      validate: {
        failAction,
        payload: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/database/pages",
    handler: getDatabasePages,
    options: {
      description: "Get Database Pages",
      tags: ["api"],
      validate: {
        failAction,
        payload: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/database/create",
    handler: insertPage,
    options: {
      description: "Insert Database Page",
      tags: ["api"],
      validate: {
        failAction,
        payload: Joi.object({
          database_id: Joi.string().required(),
          page_title: Joi.string().required(),
          status: Joi.string(),
        }),
      },
    },
  },
  {
    method: "POST",
    path: "/slack-notion/oncall/{id}",
    handler: postAssignedPerson,
    options: {
      description:
        "Post Slack Message Notifying On-Call Person in Notion's Timeline Database",
      tags: ["api"],
      validate: {
        failAction,
        params: Joi.object({
          id: Joi.string().required(),
        }),
      },
    },
  },
];
