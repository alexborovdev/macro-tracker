import { cleanup, render, screen, within } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { afterEach, expect, it, vi } from "vitest";
import { PrimaryNavigation } from "./primary-navigation";

vi.mock("next/navigation", () => ({ usePathname: vi.fn() }));

afterEach(cleanup);

it.each([
  ["/", "Dashboard"],
  ["/foods", "Foods"],
  ["/goals", "Goals"],
])("links to all pages and marks %s as current", (pathname, label) => {
  vi.mocked(usePathname).mockReturnValue(pathname);
  render(<PrimaryNavigation />);

  const navigation = within(screen.getByRole("navigation", { name: "Primary" }));
  expect(navigation.getByRole("link", { name: "Dashboard" }).getAttribute("href")).toBe("/");
  expect(navigation.getByRole("link", { name: "Foods" }).getAttribute("href")).toBe("/foods");
  expect(navigation.getByRole("link", { name: "Goals" }).getAttribute("href")).toBe("/goals");
  expect(navigation.getByRole("link", { current: "page" }).textContent).toBe(label);
});
