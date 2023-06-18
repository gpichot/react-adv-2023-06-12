import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, Mock, vi } from "vitest";

import { render, screen } from "@/test-utils";

import { useCreatePokemonMutation } from "../mutation-hooks";
import PokemonForm from "./PokemonForm";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MockUseMutation<Fn extends (...args: any) => any> = Mock<
  Parameters<Fn>,
  Partial<ReturnType<Fn>>
>;

const useCreatePokemonMutationMock =
  useCreatePokemonMutation as MockUseMutation<typeof useCreatePokemonMutation>;

vi.mock("../mutation-hooks");

describe("PokemonForm", () => {
  const mutateMock = vi.fn();
  beforeAll(() => {
    useCreatePokemonMutationMock.mockReturnValue({
      isLoading: false,
      mutate: mutateMock,
    });
  });
  it('calls the "onSubmit" handler when the form is submitted', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();
    render(<PokemonForm onSubmit={handleSubmit} />);

    const nameInput = screen.getByLabelText(/name/i);
    const typeInput = screen.getByLabelText(/type/i);
    const weightInput = screen.getByLabelText(/weight/i);
    const heightInput = screen.getByLabelText(/height/i);
    const submitButton = screen.getByText(/Create/i);

    await user.type(nameInput, "pikachu");
    await user.type(typeInput, "electric");
    await user.type(weightInput, "60");
    await user.type(heightInput, "40");
    await user.click(submitButton);

    expect(handleSubmit).toHaveBeenCalledWith({
      name: "pikachu",
      type: "electric",
      weight: 60,
      height: 40,
    });
  });
});
