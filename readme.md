# TypeScript TTS-Bot

## Requirements

* nodejs
* npm package manager
* git
* TypeScript
* [MongoDB database](./doc/MONGODB.md)

## Setup

1. Cloning the repository

```bash
git clone https://github.com/roteKlaue/TTS-Discord-Bot
```

2. Downloading NPM packages

```bach
npm i
```

3. compiling the code

```bash
tsc
```

4. Creating a .env file

create a .env file in the root directory of the project and add the following lines:

```env
TOKEN =
MONGO =
```

5. Creating a Discord Bot

   Go to the [Discord Developer Portal](https://discord.com/developers/applications) and create a new application. Then go to the `Bot` tab and click on `Add Bot`. Copy the token and paste it into the .env file after the = sign onto the line with the `TOKEN` variable.

6. Enable intents

   Go to the `Bot` tab and enable member and message intents.

7. Get connection String from MongoDB

   Click on the `CONNECT` button on the cluster overview page after logging in at [MongoDB](https://mongodb.com) . Then click on `Connect your application` and copy the connection string. Paste it into the .env file after the = sign onto the line with the `MONGO` variable.

8. Invite the bot to your server

    Go to the `OAuth2` tab and select the `bot` scope. Then select the following permissions: `Send messages`, `Embed Links`, `Read Message History`, `Connect` and `Speak`. Copy the link and paste it into your browser. Select the server you want to invite the bot to and click on `Authorize`.

9. Start the bot

    ```bash
    node .
    ```
