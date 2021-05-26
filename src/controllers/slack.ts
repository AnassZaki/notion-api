import { Request } from "@hapi/hapi";
import { Client } from "@notionhq/client";

import filter from "../helpers/filter";

import { getUserIdByEmail, postSlackMessage } from "../services/slack";

const Notion = new Client({ auth: process.env.NOTION_SECRET_KEY });

export const postAssignedPerson = async (req: Request) => {
  const { id: database_id } = <{ id: string }>req.params;

  try {
    const assigned_people = await getAssignedPeople(database_id);

    const ready_oncall = assigned_people.filter((user) => {
      const notify_date = new Date(user.duty_interval.start).getTime();
      const now = Date.now();

      return notify_date > now;
    });

    ready_oncall.forEach(async (user) => {
      const { userId } = await getUserIdByEmail(user.email);

      if (!userId) return;

      return await postSlackMessage(userId);
    });

    return { ok: true, notified: ready_oncall };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

type AssignedPeople = {
  name: string;
  email: string;
  duty_interval: { start: string; end: string };
};

const getAssignedPeople = async (
  database_id: string
): Promise<AssignedPeople[]> => {
  const { results } = await Notion.databases.query({
    database_id,
  });

  const people_placeholder: any = [];

  for (const page of results) {
    const filtered_props = filter(page.properties, ["people", "date"]);
    const people_prop = page.properties[filtered_props.people.name];

    people_placeholder.push({
      // @ts-ignore
      name: people_prop.people[0].name,
      // @ts-ignore
      email: people_prop.people[0].person.email,
      // @ts-ignore
      duty_interval: page.properties[filtered_props.date.name].date,
    });
  }

  return people_placeholder;
};
