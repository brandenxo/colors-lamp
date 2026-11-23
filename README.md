# COLORS

COLORS is a web application developed using the LAMP stack. The application provides a browser-based interface for users to log in, add colors, and search stored colors through a PHP API connected to a MySQL database.

This repository organizes the application originally developed during the COLORS lab into a clean version-controlled project structure.

## Technologies Used

- Linux
- Apache
- MySQL
- PHP
- HTML
- CSS
- JavaScript
- Git
- GitHub

## Project Structure

```text
colors-lamp/
├── api/
│   ├── AddColor.php
│   ├── Login.php
│   ├── SearchColors.php
│   └── config.example.php
├── public/
│   ├── index.html
│   ├── color.html
│   ├── css/
│   ├── js/
│   └── images/
├── .gitignore
├── LICENSE.md
└── README.md
```

## Setup

1. Install or configure a LAMP environment.
2. Configure Apache to serve the frontend files in the `public` directory.
3. Create the required MySQL database and tables.
4. Copy the example database configuration:

```bash
cp api/config.example.php api/config.php
```

5. Edit `api/config.php` and add the database credentials for your environment.

The real `config.php` file is excluded from Git so credentials are not committed.

## Running the Application

Start Apache and MySQL, then access the application using the hostname or IP address of the configured web server.

For example:

```text
http://your-server-address/
```

## Linting

With Node.js 24 installed, run:

```bash
npm ci
npm run lint
```

GitHub Actions runs HTMLHint, Stylelint, ESLint, and Jest on every push and pull request. Node.js is only used for linting and testing tools; the application runs on Apache, MySQL, and PHP.

## Testing

Run the frontend unit tests with:

```bash
npm ci
npm run test:unit
```

The unit tests load the existing frontend JavaScript and check color request data, response messages, and search-result formatting. XMLHttpRequest is mocked so these tests do not contact the deployed application.

The integration tests send real HTTP requests to the PHP login, add-color, and search endpoints. They check JSON responses, invalid login credentials, search results, user-specific results, and saving then retrieving a color.

GitHub Actions creates a disposable MySQL database from `tests/schema.sql` and runs the API on Apache/PHP using `tests/Dockerfile`. The test credentials in `tests/database.php` are only for this temporary database. Production credentials are not used.

To run the integration tests against a separately configured test server with the seeded test database:

```bash
TEST_API_URL=http://127.0.0.1:8080/api npm run test:integration
```

With the same environment variable set, `npm test` runs both suites. An unset `TEST_API_URL` fails the integration suite instead of skipping it.

## API

- `Login.php` authenticates users.
- `AddColor.php` adds a color to the database.
- `SearchColors.php` searches stored colors.

## Assumptions and Limitations

This application was created as an educational project for the COLORS LAMP lab.

Database credentials and server-specific configuration are intentionally excluded from this repository. A compatible MySQL database must be configured separately.

## License

This project is licensed under the MIT License.
