import { getDatabaseById } from "../controllers";
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
];
