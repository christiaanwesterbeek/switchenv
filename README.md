# switchenv
Command line tool to quickly switch .env file from Keepass entries (content from the Notes field)

## Install

`yarn add -D switchenv`

or

`npm install -D switchenv`

## Setup

1. Create a directory to store your keepass file and keyfile in.
2. In that directory create a keepass file where each entry is an environment.
3. To add an environment to the keepass file, create a new entry in it.
  - The Title field of the entry should be the name of your environment. Use names like development, staging, production.
  - The Notes field of the entry is the desired contents of your .env file for that environment.
4. Generate a key file for the keepass file and preferably store it in the same directory as your keepass file.

Nota Bene: Add `envs/` to your .gitignore file.

Your keepass and key file should never be committed!

5. In your app's `package.json` file add a switchenv command in the `scripts` section.

```
{
  "name": "your-app",
  "scripts": {
    "switchenv": "node ./node_modules/switchenv -f /envs/env.kdbx -k /envs/keyfile"
  },
  ...
}
```

In this example
- `-f /envs/env.kdbx` -> the path to the keepass file.
- `-k /envs/keyfile` -> the path to the  key file.

## Usage

`yarn switchenv development`

or

`npm run switchenv development`

That will read and decrypt the keepass file and look for an entry with the title development.
The Notes of that entry will overwrite the .env file.

Nota Bene: It will overwrite the .env file without warning!
