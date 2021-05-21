import filter from "../helpers/filter";

describe("Filter Page Props", () => {
  const props = {
    Status: {
      id: "LGsO",
      type: "select" as "select",
      select: {
        options: [
          {
            id: "0082af65-d0ca-4f39-85bd-032a2e5f7a58",
            name: "Backlog",
            color: "pink",
          },
        ],
      },
    },
    "Issue Title": {
      id: "title",
      type: "title" as "title",
      title: {},
    },
  };

  it("Get object of title prop key and id", () => {
    const titleProp = filter(props, "title");

    expect(titleProp).toMatchObject({
      id: "title",
      name: "Issue Title",
    });
  });

  it("Get object of select prop key and id", () => {
    const titleProp = filter(props, "select");

    expect(titleProp).toMatchObject({
      id: "LGsO",
      name: "Status",
    });
  });
});
