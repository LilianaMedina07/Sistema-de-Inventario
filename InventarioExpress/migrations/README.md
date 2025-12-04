# This file provides documentation for database migrations.

## Database Migrations for InventarioExpress

This directory contains the migration files for the InventarioExpress application. Migrations are used to manage changes to the database schema over time, allowing for version control of the database structure.

### How to Create a Migration

To create a new migration, use the following command:

```
npx typeorm migration:create -n MigrationName
```

Replace `MigrationName` with a descriptive name for your migration.

### Running Migrations

To run all pending migrations, execute:

```
npx typeorm migration:run
```

### Reverting Migrations

To revert the last executed migration, use:

```
npx typeorm migration:revert
```

### Best Practices

- Always create a migration for any changes made to the database schema.
- Test migrations in a development environment before applying them to production.
- Keep migration files organized and well-documented for future reference.

### Additional Resources

For more information on database migrations, refer to the [TypeORM documentation](https://typeorm.io/#/migrations).