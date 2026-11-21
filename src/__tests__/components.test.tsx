import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import {
  AppShell,
  Badge,
  Breadcrumb,
  Button,
  ConfirmDialog,
  DataTable,
  EmptyState,
  Field,
  IconButton,
  Input,
  SegmentedControl,
  StatusBadge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  TooltipProvider,
} from "../index";

afterEach(() => cleanup());

describe("Button", () => {
  it("uses the primary variant and the control radius by default", () => {
    render(<Button>Save</Button>);
    const button = screen.getByRole("button", { name: "Save" });
    expect(button.className).toContain("bg-brand");
    expect(button.className).toContain("rounded-control");
  });

  it("disables itself and shows a spinner while loading", () => {
    render(<Button loading>Save</Button>);
    const button = screen.getByRole("button", { name: /Save/ }) as HTMLButtonElement;
    expect(button.disabled).toBe(true);
    expect(button.querySelector("svg")).not.toBeNull();
  });

  it("passes click events through", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Go" }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});

describe("IconButton", () => {
  it("uses its required label as the accessible name", () => {
    render(
      <TooltipProvider>
        <IconButton label="Notifications">
          <span />
        </IconButton>
      </TooltipProvider>,
    );
    expect(screen.getByRole("button", { name: "Notifications" })).toBeTruthy();
  });
});

describe("Field", () => {
  it("links the label to its control through htmlFor", () => {
    render(
      <Field label="Owner" htmlFor="owner" required>
        <Input id="owner" />
      </Field>,
    );
    expect(screen.getByLabelText(/Owner/)).toBe(document.getElementById("owner"));
  });

  it("shows the error text", () => {
    render(
      <Field label="Owner" error="Required">
        <Input />
      </Field>,
    );
    expect(screen.getByText("Required")).toBeTruthy();
  });
});

describe("Badges", () => {
  it("renders a plain text pill with no status dot", () => {
    const { container } = render(<StatusBadge tone="success" label="Open" />);
    expect(screen.getByText("Open")).toBeTruthy();
    expect(container.querySelector(".size-1\\.5, .size-2")).toBeNull();
  });

  it("maps tone to a token-based text color", () => {
    render(<Badge tone="danger">Overdue</Badge>);
    expect(screen.getByText("Overdue").className).toContain("text-danger");
  });
});

describe("Navigation and tabs", () => {
  it("renders the labelled trail and the back action", () => {
    render(
      <Breadcrumb
        label="Breadcrumb"
        items={[{ label: "Dashboard", href: "/" }, { label: "Matter" }]}
        backAction={{ label: "Back to Dashboard", href: "/" }}
      />,
    );
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy();
    expect(screen.getByText("Back to Dashboard")).toBeTruthy();
  });

  it("defaults tabs to the segmented style and switches content", () => {
    render(
      <Tabs defaultValue="a">
        <TabsList>
          <TabsTrigger value="a">Alpha</TabsTrigger>
          <TabsTrigger value="b">Beta</TabsTrigger>
        </TabsList>
        <TabsContent value="a">First body</TabsContent>
        <TabsContent value="b">Second body</TabsContent>
      </Tabs>,
    );
    expect(screen.getByRole("tablist").className).toContain("rounded-control");
    fireEvent.mouseDown(screen.getByRole("tab", { name: "Beta" }));
    fireEvent.click(screen.getByRole("tab", { name: "Beta" }));
    expect(screen.getByText("Second body")).toBeTruthy();
  });

  it("renders a labelled segmented control", () => {
    render(
      <SegmentedControl
        label="Status"
        value="all"
        onValueChange={() => {}}
        options={[
          { value: "all", label: "All", count: 7 },
          { value: "open", label: "Open" },
        ]}
      />,
    );
    expect(screen.getByRole("radiogroup", { name: "Status" })).toBeTruthy();
  });
});

describe("DataTable and states", () => {
  it("shows the translated empty label when there are no rows", () => {
    render(
      <DataTable
        columns={[{ accessorKey: "name", header: "Name" }]}
        data={[]}
        labels={{ empty: "No matters", sortAscending: "Sort ascending", sortDescending: "Sort descending" }}
      />,
    );
    expect(screen.getByText("No matters")).toBeTruthy();
  });

  it("uses the empty state node when one is given", () => {
    render(
      <DataTable
        columns={[{ accessorKey: "name", header: "Name" }]}
        data={[]}
        labels={{ empty: "No matters", sortAscending: "a", sortDescending: "d" }}
        emptyState={<EmptyState title="Nothing yet" />}
      />,
    );
    expect(screen.getByText("Nothing yet")).toBeTruthy();
  });
});

describe("Dialogs and layout", () => {
  it("renders a confirm dialog and calls onConfirm", () => {
    const onConfirm = vi.fn();
    render(
      <ConfirmDialog
        open
        onOpenChange={() => {}}
        title="Delete matter?"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        destructive
        onConfirm={onConfirm}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: "Delete" }));
    expect(onConfirm).toHaveBeenCalledOnce();
  });

  it("renders page content inside the surface card with a labelled sidebar", () => {
    render(
      <AppShell
        menuLabel="Open menu"
        sidebar={{ label: "Main navigation", items: [{ id: "home", label: "Home", href: "/", active: true }] }}
      >
        <p>Page body</p>
      </AppShell>,
    );
    expect(screen.getByText("Page body").closest(".bg-surface")).not.toBeNull();
    expect(screen.getByRole("navigation", { name: "Main navigation" })).toBeTruthy();
  });
});
