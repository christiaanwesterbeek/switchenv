# switchenv
Command line tool to quickly switch .env file from Keepass entries (content from the Notes field)

## Install

`yarn add -D switchenv`

or

`npm install -D switchenv`

## Usage

In your app's `package.json` file add a switchenv command in the `scripts` section.

```
{
  "name": "your-app",
  "bin": {
    "switchenv": "./index.js -d envs -f env.kdbx -k keyfile -e $1"
  },
   "dependencies": {
    ...
  },

  "devDependencies": {
    ...
  }
}
```
