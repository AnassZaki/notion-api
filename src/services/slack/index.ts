import { WebClient } from "@slack/web-api";
import axios from "axios";

import { config } from "dotenv";
import { getTextBlock } from "./config";

config();

const client = new WebClient(process.env.SLACK_APP_TOKEN);

export const getUserIdByEmail = async (email: string) => {
  try {
    const result = await client.users.lookupByEmail({ email });

    return {
      ok: result.ok,
      userId: result.user!.id,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const postSlackMessage = async (userId: string) => {
  const result = axios
    .post(process.env.SLACK_INCOMING_WEBHOOK!, getTextBlock(userId))
    .then((res) => {
      return res.data;
    })
    .catch((_error) => {
      const error = new Error(`Error posting slack message: ${_error.message}`);
      console.error(error);
      throw error;
    });

  return result;
};
