import { getUserIdByEmail } from ".";

describe("Slack", () => {
  it("Lists users", async () => {
    const users = await getUserIdByEmail("thezaki.anass@gmail.com");

    expect(users).toMatchObject({ ok: true, userId: "UQC60RGBE" });
  });
});
