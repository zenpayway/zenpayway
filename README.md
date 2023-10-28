# ZenPayway

Welcome to ZenPayway, your solution for managing companies and services effortlessly.

## Getting Started

These instructions will help you set up a local development environment.

### Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/zenpayway/zenpayway.git
cd zenpayway
```

2. Copy the example environment file and configure it according to your needs into `./server` directory:

```bash
SECRET_KEY=
DATABASE_URL=
DJANGO_SUPERUSER_USERNAME=
DJANGO_SUPERUSER_EMAIL=
DJANGO_SUPERUSER_PASSWORD=
EMAIL_HOST_USER=
EMAIL_HOST_PASSWORD=
PYTHON_VERSION=
WEB_CONCURRENCY=
STRIPE_SECRET_KEY=
SUCCESS_URL=
CANCEL_URL=
```

3. Build and start the services with Docker Compose:

```bash
docker-compose up
```

This will set up the project with the required containers, including a backend server and a database.

4. Access the ZenPayway web application in your browser at [http://localhost:5173/](http://localhost:5173/).

5. You're ready to start exploring ZenPayway and managing your companies and services!

### Usage

Here are a few things you can do with ZenPayway:

- Create, update, and delete companies.
- Add services to your companies.
- Search for specific companies.
- Edit and delete companies if you're the owner (authentication required).

### Contributing

If you'd like to contribute to ZenPayway, please follow these steps:

1. Fork the repository on GitHub.
2. Create a new branch with a descriptive name to work on your feature or bug fix.
3. Make your changes and submit a pull request.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments

- Special thanks to the developers and contributors to the technologies used in this project.

Enjoy using ZenPayway!