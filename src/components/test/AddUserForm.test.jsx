import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import leaderboardReducer, {
  addUserThunk,
} from "../../store/slices/leaderboardSlice";
import AddUserForm from "../AddUserForm";

describe("AddUserForm Component", () => {
  it("submits the form with valid data", async () => {
    const store = configureStore({
      reducer: { leaderboard: leaderboardReducer },
    });
    store.dispatch = vi.fn();

    render(
      <Provider store={store}>
        <AddUserForm />
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText("Name"), {
      target: { value: "Bob" },
    });
    fireEvent.change(screen.getByPlaceholderText("Age"), {
      target: { value: "30" },
    });
    fireEvent.change(screen.getByPlaceholderText("Address"), {
      target: { value: "456 Street" },
    });

    fireEvent.click(screen.getByText("Add User"));
    // Wait for async dispatch to complete
    await new Promise((resolve) => setTimeout(resolve, 100));
    expect(store.dispatch).toHaveBeenCalled(
      addUserThunk({ name: "Bob", age: 30, address: "456 Street" })
    );
  });
});
