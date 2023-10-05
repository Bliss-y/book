const { reviewBook } = require("../controllers/add"); // Replace with the actual path to your module

// Mocking the models and req/res objects
const models = {
  book: {
    findById: async (id) => ({ _id: id, rating: 4.5, raters: 10 }),
    save: async (book) => book,
  },
  review: {
    find: async () => null, // Simulating that no existing review is found
    save: async (review) => review,
  },
};

const req = {
  params: { id: "bookId" },
  session: { user: { _id: "userId" } },
  body: { rating: 4, review: "Great book!" },
};

const res = {
  json: (data) => data,
};

describe("reviewBook", () => {
  it("should return a success response if the review is saved successfully", async () => {
    // Execute the function
    const result = await reviewBook(req, res, models);

    // Assertions
    expect(result.status).to.equal("success");
    expect(result.data.n_book).to.deep.equal({
      _id: "bookId",
      rating: 4.75, // Calculate the expected rating based on the function logic
      raters: 11,
    });
    expect(result.data.review).to.deep.equal({
      book: "bookId",
      rating: 4,
      review: "Great book!",
      user: "userId",
    });
  });

  it("should return an error response if the user is not logged in", async () => {
    // Simulate the user not being logged in
    req.session.user = null;

    // Execute the function
    const result = await reviewBook(req, res, models);

    // Assertions
    expect(result.status).to.equal("error");
    expect(result.message).to.equal("user not logged in");
  });
});

const { editReview } = require("./your-module"); // Replace with the actual path to your module

// Mocking the models and req/res objects
models = {
  book: {
    findById: async (id) => ({ _id: id, rating: 4.5, raters: 10 }),
    save: async (book) => book,
  },
  review: {
    findById: async (id) => {
      if (id === "existingReviewId") {
        return {
          _id: "existingReviewId",
          book: "bookId",
          rating: 4,
          review: "Old review",
          user: "userId",
        };
      }
      return null; // Simulate that the review does not exist for this test case
    },
    save: async (review) => review,
  },
};

req = {
  params: { review: "existingReviewId" },
  session: { user: { _id: "userId" } },
  body: { rating: 5, review: "Updated review" },
};

res = {
  json: (data) => data,
};

describe("editReview", () => {
  it("should return a success response if the review is updated successfully", async () => {
    // Execute the function
    const result = await editReview(req, res, models);

    // Assertions
    expect(result.status).to.equal("success");
    expect(result.data.n_book).to.deep.equal({
      _id: "bookId",
      rating: 4.5, // Calculate the expected rating based on the function logic
      raters: 10,
    });
    expect(result.data.review).to.deep.equal({
      _id: "existingReviewId",
      book: "bookId",
      rating: 5,
      review: "Updated review",
      user: "userId",
    });
  });

  it("should return an error response if the user is not logged in", async () => {
    // Simulate the user not being logged in
    req.session.user = null;

    // Execute the function
    const result = await editReview(req, res, models);

    // Assertions
    expect(result.status).to.equal("error");
    expect(result.message).to.equal("user not logged in");
  });
});
