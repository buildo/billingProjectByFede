# BillingProjectByFede

mock app to get confidence with Buildo project management flow

## how to start the app

install `corsproxy`:

```
npm i -g corsproxy
```

then start it by typing `corsproxy` in your terminal

**start the server**:

- install `docker`
- download a postgres docker image (suggested: `docker pull postgres`)
- start a postgres container `docker run --name billing -e POSTGRES_PASSWORD=password -d postgres`
  run `sbt` from the api foder, then, from `sbt` console, run `~reStart` to start the server (and watch api files for changes)

**to connect to db:**

```
docker run -it --rm --link billing:postgres postgres psql -h postgres -U user
```

**start the client**:

from the client folder run `yarn` to install dependencies then `yarn start` to serve you assets from `http://localhost:3000`.
