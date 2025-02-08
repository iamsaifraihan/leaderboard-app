import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import leaderboardReducer, {
  incrementPointsThunk,
} from "../../store/slices/leaderboardSlice";
import UserRow from "../UserRow";

describe("UserRow Component", () => {
  it("renders user name and points", () => {
    const store = configureStore({
      reducer: { leaderboard: leaderboardReducer },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <UserRow user={{ id: 1, name: "Alice", points: 0 }} />
          </tbody>
        </table>
      </Provider>
    );

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("dispatches increment action on ➕ click", async () => {
    const store = configureStore({
      reducer: { leaderboard: leaderboardReducer },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <table>
          <tbody>
            <UserRow user={{ id: 1, name: "Alice", points: 0 }} />
          </tbody>
        </table>
      </Provider>
    );

    fireEvent.click(screen.getByText("➕"));

    // Wait for async dispatch to complete
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(store.dispatch).toHaveBeenCalled(incrementPointsThunk(1));
  });
});
