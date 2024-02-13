import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SimpleTable from "./SimpleTable";

jest.mock("react-router-dom", () => ({
  useParams: jest.fn(),
}));

// Mock fetch to control API responses
global.fetch = jest.fn();

test("renders loading state initially", () => {
  render(<SimpleTable />);
  expect(screen.getByText("Loading...")).toBeInTheDocument();
});

test("fetches data on mount and renders it", async () => {
  const mockData = { name: "Luke Skywalker" };
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockData),
  });

  render(<SimpleTable />);

  await screen.findByText("Loading..."); // Wait for loading state
  await waitFor(() =>
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()
  );
});

test("handles errors gracefully", async () => {
  global.fetch.mockRejectedValueOnce(new Error("Network error"));

  render(<SimpleTable />);

  await screen.findByText("Loading...");
  await waitFor(() =>
    expect(screen.getByText("Error: Network error")).toBeInTheDocument()
  );
});

test("re-fetches data when currentId changes", async () => {
  const mockData1 = { name: "Luke Skywalker" };
  const mockData2 = { name: "Leia Organa" };

  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockData1),
  });
  global.fetch.mockResolvedValueOnce({
    json: () => Promise.resolve(mockData2),
  });

  render(<SimpleTable />);

  // Initial fetch
  await screen.findByText("Loading...");
  await waitFor(() =>
    expect(screen.getByText("Luke Skywalker")).toBeInTheDocument()
  );

  // Change currentId
  const changeIdButton = screen.getByRole("button", { name: /Change ID/i });
  userEvent.click(changeIdButton);

  // Re-fetch
  await screen.findByText("Loading...");
  await waitFor(() =>
    expect(screen.getByText("Leia Organa")).toBeInTheDocument()
  );
});
