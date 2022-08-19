const { getFilterOptions } = require("../../../src/services/filter");

describe("getFilterOptions", () => {
  it("should filter by property", () => {
    expect(
      getFilterOptions({
        book: "62ffb64f42dc23efb3c3c0c4"
      })
    ).toMatchObject({
      book: "62ffb64f42dc23efb3c3c0c4"
    });
  });

  it("should filter by property in an object", () => {
    expect(
      getFilterOptions({
        book: {
          _id: "62ffb64f42dc23efb3c3c0c4"
        }
      })
    ).toMatchObject({
      "book._id": "62ffb64f42dc23efb3c3c0c4"
    });
  });

  it("should filter by existent nested property", () => {
    expect(
      getFilterOptions({
        "scene.characters.book": ""
      })
    ).toMatchObject({
      "scene.characters.book": { $exists: true }
    });
  });

  it("should filter non existent property", () => {
    expect(
      getFilterOptions({
        name: "!"
      })
    ).toMatchObject({ name: { $exists: false } });
  });

  it("should filter by or", () => {
    expect(getFilterOptions({ "updatedBy|createdBy": "~dev" })).toMatchObject({
      $or: [
        {
          updatedBy: {
            $regex: "(?=.*(dev))",
            $options: "/ig"
          }
        },
        {
          createdBy: {
            $regex: "(?=.*(dev))",
            $options: "/ig"
          }
        }
      ]
    });
  });

  it("should filter dot notation array", () => {
    expect(
      getFilterOptions({
        "book._id": "62ffb64f42dc23efb3c3c0c4,62ffb64f42dc23efb3c3c0c5"
      })
    ).toMatchObject({ "book._id": { $in: ["62ffb64f42dc23efb3c3c0c4", "62ffb64f42dc23efb3c3c0c5"] } });
  });

  it("should filter by regex", () => {
    expect(
      getFilterOptions({
        name: "~^.*ez$"
      })
    ).toMatchObject({
      name: {
        $options: "/ig",
        $regex: "(?=.*(^.*ez$))"
      }
    });
  });

  it("should filter by negating regex", () => {
    expect(
      getFilterOptions({
        name: "!~^.*ez$"
      })
    ).toMatchObject({
      name: {
        $not: {
          $options: "/ig",
          $regex: "(?=.*(^.*ez$))"
        }
      }
    });
  });

  it("should filter by age greater than", () => {
    expect(
      getFilterOptions({
        age: ">25"
      })
    ).toMatchObject({
      age: {
        $gt: "25"
      }
    });
  });

  it("should filter by age less than", () => {
    expect(
      getFilterOptions({
        age: "<25"
      })
    ).toMatchObject({
      age: {
        $lt: "25"
      }
    });
  });

  it("should filter by age greater than or equal to", () => {
    expect(
      getFilterOptions({
        age: ">=25"
      })
    ).toMatchObject({
      age: {
        $gte: "25"
      }
    });
  });

  it("should filter by age less than or equal to", () => {
    expect(
      getFilterOptions({
        age: "<=25"
      })
    ).toMatchObject({
      age: {
        $lte: "25"
      }
    });
  });

  it("should filter by age not equal to", () => {
    expect(
      getFilterOptions({
        age: "<>25"
      })
    ).toMatchObject({
      age: {
        $ne: "25"
      }
    });
  });

  it("should filter by multiple properties", () => {
    expect(
      getFilterOptions({
        name: "~^.*ez$",
        age: ">25"
      })
    ).toMatchObject({
      name: {
        $options: "/ig",
        $regex: "(?=.*(^.*ez$))"
      },
      age: {
        $gt: "25"
      }
    });
  });
});
