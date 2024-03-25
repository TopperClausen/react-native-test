# This is a frontend test written for Pentia Mobile

### The project is an app running with firebase as data storage

## How to run
### Type the following into a terminal
```bash
yarn

npx react-native run-< ios | android >
```

## Known issues
### There are a few know issues such as

### Push notifications: push notification are currently disables all though they work. The way it's build is slowing the app down.
### Chat becomes slow after message sent, this is due to a lot of callbacks are being added to the que while handling firebase sent message.
