import { useNavigate } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  beforeAll,
  describe,
  expect,
  it,
  Mock,
  MockedFunction,
  vi,
} from "vitest";

import InputControl from "./InputControl";

vi.mock("react-router-dom");

// const useNavigateMock = useNavigate as Mock
const useNavigateMock = useNavigate as MockedFunction<typeof useNavigate>;

describe("InputControl", () => {
  beforeAll(() => {
    useNavigateMock.mockReturnValue((path) => console.log(path));
  });
  it("fills in the input with some text", async () => {
    const user = userEvent.setup();
    render(<InputControl label="Formation" name="formation" />);

    const inputElement = screen.getByRole("textbox", { name: /formation/i });
    expect(inputElement).toBeVisible();

    await user.type(inputElement, "ReactJS");
    expect(inputElement).toHaveValue("ReactJS");
  });

  it("calls onChange when the user fills in the input", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <InputControl label="Formation" name="formation" onChange={onChange} />
    );

    const inputElement = screen.getByRole("textbox", { name: /formation/i });

    await user.type(inputElement, "ReactJS Avancé");

    expect(inputElement.value).toMatchInlineSnapshot('"ReactJS Avancé"');

    expect(onChange).toHaveBeenLastCalledWith(
      expect.objectContaining({
        target: expect.objectContaining({
          value: "ReactJS Avancé",
        }),
      })
    );
  });
});
