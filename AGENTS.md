# Agent Instructions

## Project Overview

Calorie & Macro Tracker is a mobile-first, full-stack web application for tracking daily calories, protein, fat, and carbohydrates.

The initial version is intended for personal use, with an emphasis on simplicity, reliability, maintainability, and testability.

### MVP Features

- **Food Library:** Create, read, update, delete, and search custom foods with nutritional values per 100 grams.
- **Daily Goals:** Configure daily calorie and macronutrient targets.
- **Dashboard:** Display daily consumption, remaining targets, and nutritional progress.
- **Food Logging:** Add saved foods to the daily log with a specified weight in grams.
- **Custom Entries:** Log nutritional values without saving a food to the library.
- **Daily Log:** View, edit, and delete food entries.
- **History:** Navigate between dates and review previous daily logs.

Do not introduce additional product features without explicit approval.

## Technology Stack

- **Language:** TypeScript (strict mode)
- **Framework:** Next.js (App Router)
- **UI:** React
- **Styling:** Tailwind CSS
- **Components:** shadcn/ui
- **Database:** SQLite (local file)
- **ORM:** Prisma
- **Validation:** Zod
- **Forms:** React Hook Form
- **Unit and Integration Testing:** Vitest, React Testing Library
- **End-to-End Testing:** Playwright
- **CI:** GitHub Actions

Use stable, maintained versions of dependencies.

Do not introduce additional frameworks, state managers, ORMs, or infrastructure without explicit approval.

## Communication

- Communicate with the user in Ukrainian.
- Write all source code, documentation, comments, identifiers, and commit messages in English.
- Explain architectural decisions, trade-offs, and non-obvious implementation details.
- Ask for clarification when requirements are ambiguous or decisions have significant consequences.
- Never claim that a command, test, or verification passed unless it was actually executed.

## Development Workflow

Follow an incremental, task-driven development process.

1. Analyze the task, requirements, and relevant existing code.
2. Propose a concise implementation plan before modifying files.
3. Wait for explicit approval before implementation.
4. Work strictly within the approved scope.
5. Follow Test-Driven Development for new business logic.
6. Run relevant tests and quality checks.
7. Review the resulting diff for correctness, scope, and unnecessary complexity.
8. Summarize changes, verification results, and remaining risks.
9. Wait for explicit approval before committing changes.

Prefer small, independently reviewable changes over large implementations.

Do not implement multiple unrelated features in a single task.

## Architecture

- Favor a modular monolith over microservices.
- Organize code by clear responsibilities and feature boundaries.
- Separate business logic from UI, persistence, and framework-specific concerns where practical.
- Keep database access and server-only code outside client components.
- Use Server Components by default when appropriate.
- Introduce Client Components only when interactivity or browser APIs require them.
- Use Route Handlers or Server Actions based on the requirements and explain significant trade-offs.
- Avoid unnecessary layers, wrappers, services, and abstractions.
- Do not introduce architectural patterns without a concrete problem they solve.
- Document significant architectural decisions when necessary.

Optimize for code that another developer can understand, navigate, and modify quickly.

## State Management

Choose state management based on the type and ownership of state.

- **Persistent data:** The local SQLite file is the source of truth.
- **Server state:** Prefer Next.js server-side data fetching and built-in revalidation mechanisms where appropriate.
- **Local UI state:** Use React state.
- **Form state:** Use React Hook Form.
- **URL state:** Use route parameters or search parameters when appropriate.
- **Shared client state:** Introduce Zustand or another state manager only when justified by actual requirements.

Do not introduce Redux, Zustand, or TanStack Query by default.

Avoid duplicating server data across multiple independent state stores.

## Code Quality

- Follow TypeScript strict mode.
- Prefer explicit, readable, maintainable code over clever or overly generic solutions.
- Use descriptive and consistent naming.
- Keep functions and components focused on clear responsibilities.
- Prefer composition over inheritance.
- Apply SOLID, DRY, KISS, and YAGNI pragmatically.
- Avoid premature optimization and speculative abstractions.
- Avoid unnecessary dependencies.
- Do not use `any`, unjustified type assertions, or suppressed TypeScript/ESLint errors.
- Handle errors explicitly and consistently.
- Follow established project conventions.
- Do not refactor unrelated code without approval.

## Testing Strategy

Use Test-Driven Development (RED → GREEN → REFACTOR) for new business logic.

### Unit Tests

- Test nutritional calculations, validation, date handling, and other business rules.
- Cover meaningful edge cases and invalid inputs.
- Prefer behavior-based tests over implementation-detail tests.

### Integration Tests

- Test interactions between application layers.
- Test database operations against an isolated test database where appropriate.
- Verify API or Server Action behavior, including validation and error handling.

### Component Tests

- Test important user interactions, form validation, and UI states.
- Avoid testing framework internals or trivial implementation details.

### End-to-End Tests

- Cover critical user journeys with Playwright.
- Prioritize creating foods, logging consumption, editing entries, and reviewing history.

### Testing Rules

- Write failing tests before implementing new business behavior.
- Confirm that tests fail for the expected reason before implementation.
- Do not weaken or remove tests merely to make them pass.
- Add regression tests for confirmed bugs.
- Avoid excessive mocking that hides integration problems.
- Aim for comprehensive coverage of critical business rules rather than arbitrary global coverage percentages.
- Report failed, skipped, and unavailable checks explicitly.

## Data Integrity

- Validate untrusted input at server boundaries.
- Use appropriate database constraints and transactions.
- Store nutritional values with a deliberate precision and rounding strategy.
- Store Food nutrition per 100 g as integer tenths in SQLite. Keep calculations exact and round only for display.
- Preserve historical nutritional values when foods are edited or deleted.
- Handle dates and time zones consistently.
- Use database migrations for schema changes.
- Do not modify or delete existing data without explicit approval.

## Security

- Treat all client input as untrusted.
- Keep database credentials and secrets server-side.
- Never expose secrets, tokens, or credentials in code, logs, or responses.
- Do not commit environment files containing secrets.
- Do not execute destructive database operations without approval.
- Do not access or modify files outside the project workspace.
- Do not expose development endpoints or databases publicly without approval.

Authentication, subscriptions, and multi-user support are outside the initial MVP scope.

## Git Workflow

- Keep `main` stable.
- Use feature branches for implementation tasks.
- Never create branches, commits, tags, or pull requests without explicit approval.
- Never push, merge, rebase, reset, or force-push without explicit approval.
- Do not modify Git configuration.
- Follow Conventional Commits with English descriptions.
- Keep commits focused on logical units of work.
- Review the diff and verification results before proposing a commit.
- Never bypass Git hooks or CI checks.
- Do not overwrite or discard unrelated user changes.

## Definition of Done

A task is considered complete only when:

1. The approved requirements and acceptance criteria are satisfied.
2. Relevant tests pass.
3. TypeScript and lint checks pass where applicable.
4. The application builds successfully where applicable.
5. The diff contains no unrelated changes.
6. No known critical issues remain unresolved.
7. Relevant documentation is updated when necessary.
8. Verification results and remaining limitations are reported.

If any condition cannot be verified, report it explicitly instead of assuming success.
