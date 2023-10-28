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

4. Access the ZenPayway web application in your browser at [https://localhost:5173/](https://localhost:5173/).

5. You're ready to start exploring ZenPayway and managing your companies and services!

### Technologie Stack
- Client-side:<br/>
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)
![PNPM](https://img.shields.io/badge/pnpm-%234a4a4a.svg?style=for-the-badge&logo=pnpm&logoColor=f69220)
- Server-side:<br/>
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![DjangoREST](https://img.shields.io/badge/DJANGO-REST-ff1709?style=for-the-badge&logo=django&logoColor=white&color=ff1709&labelColor=gray)
![Gunicorn](https://img.shields.io/badge/gunicorn-%298729.svg?style=for-the-badge&logo=gunicorn&logoColor=white)
- Databases:<br/>
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
- Hosting:<br/>
![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)
- Special thanks:<br/>
![Stack Overflow](https://img.shields.io/badge/-Stackoverflow-FE7A16?style=for-the-badge&logo=stack-overflow&logoColor=white)
![ChatGPT](https://img.shields.io/badge/chatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white)


### Usage

Here are a few things you can do with ZenPayway:

- Create, read, update, and delete companies.
- Create, read, update, and delete services for companies.
- Search for specific companies.
- Purchase services.

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
