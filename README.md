# nodejs-starter
NodeJs Express Application starter

## 1. Postgres Installation
If you’re using a Mac,

Open up the Terminal and install postgresql with brew.

```
brew install postgresql
```

After the installation is complete, to get the postgresql up and running, which we can do with services start.
```
brew services start postgresql
==> Successfully started `postgresql` (label: homebrew.mxcl.postgresql)
```

To stop the postgresql service, you can run:
```
brew services stop postgresql
```

PostgreSQL is installed now, so the next step is to connect to the postgres command line, where we can run SQL commands.

### PostgreSQL command prompt
psql is the PostgreSQL interactive terminal. Running psql will connect you to a PostgreSQL host. Running psql --help will give you more information about the available options for connecting with psql.

--h — --host=HOSTNAME | database server host or socket directory (default: “local socket”)
--p — --port=PORT | database server port (default: “5432”)
--U — --username=USERNAME | database username (default: “your_username”)
--w — --no-password | never prompt for password
--W — --password | force password prompt (should happen automatically)
We’ll just connect to the default postgres database with the default login information – no option flags.
```
psql postgres
```
You’ll see that we’ve entered into a new connection. We’re now inside psql in the postgres database. The prompt ends with a # to denote that we’re logged in as the superuser, or root.
```
postgres=#
```
Commands within psql start with a backslash (\). To test our first command, we can ensure what database, user, and port we’ve connected to by using the \conninfo command.
```
postgres=# \conninfo
You are connected to database "postgres" as user "your_username" via socket in "/tmp" at port "5432".
```
Here is a reference table of a few common commands which we’ll be using in this tutorial.

\q | Exit psql connection
\c | Connect to a new database
\dt | List all tables
\du | List all roles
\list | List databases
Let’s create a new database and user so we’re not using the default accounts, which have superuser privileges.

### Create a user
First, we’ll create a role called me and give it a password of password. A role can function as a user or a group, so in this case, we’ll be using it as a user.
```
postgres=# CREATE ROLE me WITH LOGIN PASSWORD 'password';
```
We want me to be able to create a database.
```
postgres=# ALTER ROLE me CREATEDB;
```
You can run \du to list all roles/users.
```
me          | Create DB                           | {}
postgres    | Superuser, Create role, Create DB   | {}
```
Now we want to create a database from the me user. Exit from the default session with \q for quit.
```
postgres=# \q
```
We’re back in our computer’s default Terminal connection. Now we’ll connect postgres with me.
```
psql -d postgres -U me
```
Instead of postgres=#, our prompt shows postgres=> now, meaning we’re no longer logged in as a superuser.

### Create a database
We can create a database with the SQL command.
```
postgres=> CREATE DATABASE api;
```
Use the \list command to see the available databases.
```
Name    |    Owner    | Encoding |   Collate   |    Ctype    |
api     | me          | UTF8     | en_US.UTF-8 | en_US.UTF-8 |
```
Let’s connect to the new api database with me using the \c (connect) command.
```
postgres=> \c api
You are now connected to database "api" as user "me".
api=>
```
Our prompt now displays that we’re connected to api.

### Create a table
The last thing we’ll do in the psql command prompt is create a table called users with three fields – two VARCHAR types and an auto-incrementing PRIMARY KEY id.
```
api=>
CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(30),
  email VARCHAR(30)
);
```
Make sure not to use the backtick (`) character when creating and working with tables in PostgreSQL. While backticks are allowed in MySQL, they’re not valid in PostgreSQL. Also, ensure you do not have a trailing comma in the CREATE TABLE command.

We’ll add two entries to users to have some data to work with.
```
INSERT INTO users (name, email)
  VALUES ('Jerry', 'jerry@example.com'), ('George', 'george@example.com');
Let’s make sure that got added correctly by getting all entries in users.

api=> SELECT * FROM users;
id |  name  |       email        
----+--------+--------------------
  1 | Jerry  | jerry@example.com
  2 | George | george@example.com
```
Now we have a user, database, table, and some data. We can begin building our Node.js RESTful API to connect to this data stored in a PostgreSQL database.
## Setting up an Express server

Clone this repo and cd in to the root folder and follow as:

To install packages in package.json
 ``` 
 $ npm install
 ```
To start the server in development:

  On Windows, use this command:
  

    SET DEBUG=express-locallibrary-tutorial:* & npm run devstart
   
    
  On macOS or Linux, use this command:
  

    DEBUG=express-locallibrary-tutorial:* npm run devstart
