import { render, screen } from "@testing-library/react";
import md5 from "md5";
import Icon from ".";

describe("Icon component", () => {
  it("renders the twitch icon with correct path hash", () => {
    render(<Icon name="twitch" />);
    const path = screen.getByTestId("icon").getAttribute("d");
    expect(md5(path)).toBe("327fbc38c8e878259c3ec35ef231517a");
  });

  it("renders the facebook icon with correct path hash", () => {
    render(<Icon name="facebook" />);
    const path = screen.getByTestId("icon").getAttribute("d");
    expect(md5(path)).toBe("bbea4c9e40773b969fdb6e406059f853");
  });
});
