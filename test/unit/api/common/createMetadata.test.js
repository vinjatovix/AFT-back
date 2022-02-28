const { createMetadata } = require("../../../../src/api/common/shared/createMetadata");

describe("createMetadata", () => {
  it("should match return for a creation from an user on a date", () => {
    const date = new Date();
    const user = "userTest";
    expect(createMetadata(user, date)).toMatchObject({
      createdBy: user,
      createdAt: date,
      updatedBy: user,
      updatedAt: date
    });
  });

  it("should match return for an updating metadata by the same user", () => {
    const date = new Date();
    const user = "userTest";
    const date2 = new Date();
    expect(createMetadata(user, date, date2)).toMatchObject({
      createdBy: user,
      createdAt: date,
      updatedBy: user,
      updatedAt: date2
    });
  });

  it("should match return for an updating metadata by another user", () => {
    const date = new Date();
    const user = "userTest";
    const user2 = "anotherUser";
    const date2 = new Date();

    expect(createMetadata(user, date, date2, user2)).toMatchObject({
      createdBy: user,
      createdAt: date,
      updatedBy: user2,
      updatedAt: date2
    });
  });
});
