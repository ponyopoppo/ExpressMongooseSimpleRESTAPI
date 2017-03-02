# Express Mongoose Simple REST API
## install
```
cp .env.example .env # or create .env
yarn
```
## start
```
yarn start
```

## sample
```
fetch(base + 'users', {
  method: 'GET',
  headers: {
    'x-access-token': '',
  }
});
```

```
fetch(base + 'users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'x-access-token': '',
  },
  body: JSON.stringify({
    username,
    password
  })
});
```
