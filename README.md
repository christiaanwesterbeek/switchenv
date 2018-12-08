# switchenv
Command line tool to quickly switch .env file from Keepass entries (content from the Notes field)

## Install

`yarn add -D switchenv`

or

`npm install -D switchenv`

## Usage

You need to go through a one time setup. That will take you a few minutes.
Afterwards you'll be able to run this command to change your .env file.

`yarn switchenv development`

or

`npm run switchenv development`

It will read and decrypt the keepass file and look for an entry with the title: development.
The Notes of that entry will overwrite the .env file.

Nota Bene: It will overwrite the .env file without warning!

## Setup

1. Create a directory to store your keepass file and keyfile in.
2. Add the created directory to your .gitignore file!!

NB: Your keepass and key file should never be committed!

3. In that directory create a keepass file where each entry is an environment.
4. To add an environment to the keepass file, create a new entry in it.
  - The Title field of the entry should be the name of your environment. Use names like development, staging, production.
  - The Notes field of the entry is the desired contents of your .env file for that environment.
5. Generate a key file for the keepass file and preferably store it in the same directory as your keepass file.
6. In your app's `package.json` file add a `switchenv` command in the `scripts` section.

```
{
  ...
  "scripts": {
    "switchenv": "node ./node_modules/switchenv --source /envs/env.kdbx --key /envs/keyfile"
  },
  ...
}
```

In this example
- `--source /envs/env.kdbx` is the path to the keepass file.
- `--key /envs/keyfile` is the path to the key file.

### Optionally

- `--target /config.js` if you want to write to something else than /.env
- `--title .env-{title}-backend` if you have longer entry titles like `.env-development-backend` instead of just `development`. In this case, you can still run `yarn switchenv development`

## Todo

- Each time switchenv is run, warn if the source directory containing the keepass and key file is not in .gitignore
