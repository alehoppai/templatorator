# Templatorator

## Description

Templatorator is a template for my project. To quickstart MVPs and testout some ideas.
This template is unopinionated about code style and other crap. It's just meant to be used as quick start with a couple of tweaks.

## Features

- Quick project start
- Controllers and pages generation
- Prisma orm
- Pug templates
- Tailwindcss
- Auth (sign in/up) out of the box

## Structure

### - `app`

- `controllers`
- `pages`
- `views` (pls note how this dir is structured, when generating pages with CLI, they gonna be created that way)
- `layouts` (page layout)
- `pages` (page content)
- `mixins` (for shared views, you may found examples of Link, TextInput, Form, Button)
- `assets` (for frontend) 
- `utils`
- `middlewares`

### - `config`

Application config. Most of it is already set up.
Few things to note here:
- New configs can be added here and then used in root `index.js`. By convention each config file exports function `enable[something](app)`
- New passport strategies can be added look at example in `passport.js`
- `vars.js` is used for global constants across the project

Anything else can be changed based on project preferences.

### - `db`

Not straightforward but this one is for sqlite3 session storage. And prisma generates its db dir inside `prisma/`

### - `public`

Speaks for itself. `express.static` targeted here.

### - `scripts`

Preferably do not touch! Generation scripts and other one meant to use as scripts like post install.

### - `utils`

We have one inside app, right? Yes we do, we need this one for global utils.
