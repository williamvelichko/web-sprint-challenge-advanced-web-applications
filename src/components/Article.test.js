import React from "react";
import "@testing-library/jest-dom";
//const { nanoid } = require("nanoid");

import userEvent from "@testing-library/user-event";
import MutationObserver from "mutationobserver-shim";

import Article from "./Article";
import { render, screen, waitFor } from "@testing-library/react";

const mockArticle = [
  {
    id: "asas123",
    headline:
      "Less than half of Seattle homes have air conditioning. After a deadly heat wave, ‘everybody’ wants it.",
    createdOn: "2022-01-27T10:09:14-08:00",

    author: "william",
    image: 134,
    summary:
      "Triple-digit temperatures led to a spike in demand across the region.",
    body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home.",
  },
  //   {
  //     id: "asas124",
  //     headline:
  //       "Less than half of Seattle homes have air conditioning. After a deadly heat wave, ‘everybody’ wants it.",
  //     createdOn: "2022-01-27T10:09:14-08:00",

  //     author: "jerru",
  //     image: 134,
  //     summary:
  //       "Triple-digit temperatures led to a spike in demand across the region.",
  //     body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home.",
  //   },
];

const mockArticle2 = {
  id: "asas123",
  headline:
    "Less than half of Seattle homes have air conditioning. After a deadly heat wave, ‘everybody’ wants it.",
  createdOn: "2022-01-27T10:09:14-08:00",

  author: "",
  image: 134,
  summary:
    "Triple-digit temperatures led to a spike in demand across the region.",
  body: "Inside the attic of a one-story gray house in a Seattle suburb last week, Jeff Bryson gingerly strapped copper piping across the rafters while wearing a white face mask and a headlamp. The temperature was about 110 degrees in the tight space, which was covered in insulation dust. His work was meant to cool the rest of the home.",
};

const handleEditSelect = jest.fn();
const handleDelete = jest.fn();
test("renders component without errors", () => {
  render(
    <Article
      article={mockArticle}
      handleEditSelect={handleEditSelect}
      handleDelete={handleDelete}
    />
  );
});

test("renders headline, author from the article when passed in through props", async () => {
  render(
    <Article
      article={mockArticle}
      handleEditSelect={handleEditSelect}
      handleDelete={handleDelete}
    />
  );

  const headline = screen.getByTestId("headline");

  const author = screen.getByTestId("author");

  await waitFor(() => {
    expect(headline).toBeInTheDocument();
    expect(author).toBeInTheDocument();
  });
});

test('renders "Associated Press" when no author is given', async () => {
  render(
    <Article
      article={mockArticle2}
      handleEditSelect={handleEditSelect}
      handleDelete={handleDelete}
    />
  );
  const noAuthor = screen.queryByText(/Associated Press/i);

  await waitFor(() => expect(noAuthor).toBeInTheDocument());
});

test("executes handleDelete when the delete button is pressed", async () => {
  render(
    <Article
      article={mockArticle}
      handleEditSelect={handleEditSelect}
      handleDelete={handleDelete}
    />
  );
  const button = screen.getByTestId("deleteButton");
  //const articles = screen.findByTestId("article");

  userEvent.click(button);

  await waitFor(() => {
    expect(handleDelete).toHaveBeenCalled();
  });
});

//Task List:
//1. Complete all above tests. Create test article data when needed.
