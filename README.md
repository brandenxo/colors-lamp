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

GitHub Actions runs HTMLHint, Stylelint, and ESLint on every push and pull request. Node.js is only used for linting; the application runs on Apache, MySQL, and PHP.

## API

- `Login.php` authenticates users.
- `AddColor.php` adds a color to the database.
- `SearchColors.php` searches stored colors.

## Assumptions and Limitations

This application was created as an educational project for the COLORS LAMP lab.

Database credentials and server-specific configuration are intentionally excluded from this repository. A compatible MySQL database must be configured separately.

## AI Usage

AI tools were used to assist with organizing the existing project for version control and documenting the repository.

## License

This project is licensed under the MIT License.
