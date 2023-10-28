FROM python:3.11.5-alpine

ENV PYTHONDONTWRITEBYTECODE=1

ENV PYTHONUNBUFFERED=1

RUN pip install pipenv

WORKDIR /server

COPY Pipfile Pipfile.lock /server/

RUN pipenv install --system --deploy --ignore-pipfile

COPY . /server/

RUN python manage.py migrate

CMD [ "python", "manage.py", "runsslserver", "0.0.0.0:8000" ]