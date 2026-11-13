# Local database

SQLite stores the application's data in a local file. Prisma Client generates
typed database queries from `schema.prisma`. The SQLite adapter executes them in
Node.js. Application code can open the configured database through `getPrisma()`
in `src/lib/db.ts`.

After `npm ci`, run `npm run db:generate` before type checking or running tests.
Client generation does not need a database file or a connection URL.

To create the local application database, copy `.env.example` to `.env`, create
`prisma/data/`, and run `npm run db:migrate` from the repository root. The CLI and
Next.js both read `DATABASE_URL`. Use a root-relative file URL as shown in the
example, or an absolute `file:` path. The app expects the file to exist after
migration. Keep the database and its SQLite sidecar files outside version control.
Run the local app with `npm run dev -- --hostname 127.0.0.1`.

Migrations are checked-in SQL files. `db:migrate` applies pending migrations and
records their application in the database. The Food migration enforces integer
tenths and range limits. Keep these custom checks when a future SQLite migration
rebuilds the table.

`npm test` creates a unique SQLite file under `prisma/data/` for the integration
suite, applies the checked-in migrations with an explicit test URL, and removes
the test directory after the connections close. CI runs the same suite.
The test migration subprocess sets `RUST_LOG=info` because Prisma can fail with
an inherited `warn` or `error` level. See [Prisma issue #29355](https://github.com/prisma/orm/issues/29355).
