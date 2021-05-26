const isDutyApplicable = (user: any) => {
  const notify_date = new Date(user.duty_interval.start).getTime();
  const now = Date.now();

  return notify_date > now;
};

const users = [
  {
    name: "Anass Zaki",
    email: "anass.zaki@sveasolar.com",
    duty_interval: {
      start: "2021-06-06",
      end: "2021-06-19",
    },
  },
  {
    name: "Anass Zaki",
    email: "anass.zaki@sveasolar.com",
    duty_interval: {
      start: "2021-05-29",
      end: "2021-06-05",
    },
  },
];

describe("Get Assigned Peopl", () => {
  it("Duty date is not in the past", () => {
    const ready_oncall = users.filter(isDutyApplicable);

    expect(ready_oncall).toMatchObject(users);
  });
});
