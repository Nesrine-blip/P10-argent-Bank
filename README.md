# Argent Bank API

This codebase contains the code needed to run the backend for Argent Bank.

## Getting Started

### Prerequisites

Argent Bank uses the following tech stack:

- [Node.js v12](https://nodejs.org/en/)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community)

Please make sure you have the right versions and download both packages. You can verify this by using the following commands in your terminal:

```bash
# Check Node.js version
node --version

# Check Mongo version
mongo --version
```

### Instructions

1. Fork this repo
1. Clone the repo onto your computer
1. Open a terminal window in the cloned project
1. Run the following commands:

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev:server

# Populate database with two users
npm run populate-db
```

Your server should now be running at http://locahost:3001 and you will now have two users in your MongoDB database!

## Populated Database Data

Once you run the `populate-db` script, you should have two users in your database:

### Tony Stark

- First Name: `Tony`
- Last Name: `Stark`
- Email: `tony@stark.com`
- Password: `password123`

### Steve Rogers

- First Name: `Steve`,
- Last Name: `Rogers`,
- Email: `steve@rogers.com`,
- Password: `password456`

## API Documentation

To learn more about how the API works, once you have started your local environment, you can visit: http://localhost:3001/api-docs

## Design Assets

Static HTML and CSS has been created for most of the site and is located in: `/designs`.

For some of the dynamic features, like toggling user editing, there is a mock-up for it in `/designs/wireframes/edit-user-name.png`.

And for the API model that you will be proposing for transactitons, the wireframe can be found in `/designs/wireframes/transactions.png`.
# P10-argent-Bank



---

## Additional Setup Instructions (Added by Student)

### Prerequisites

Before running the application, ensure MongoDB is installed on your system.

**Check if MongoDB is already installed:**
```bash
mongod --version
```

**If not installed, install MongoDB:**

**macOS (via Homebrew):**
```bash
brew tap mongodb/brew
brew install mongodb-community
```

**macOS (manual installation):**
```bash
curl -O https://fastdl.mongodb.org/osx/mongodb-macos-x86_64-6.0.18.tgz
tar -zxvf mongodb-macos-x86_64-6.0.18.tgz
sudo mv mongodb-macos-x86_64-6.0.18 /usr/local/mongodb
mkdir -p ~/data/db
```

### Running the Application

You need **3 separate terminals**:

**Terminal 1 - Start MongoDB:**
```bash
# If installed via Homebrew:
brew services start mongodb-community

# If installed manually:
/usr/local/mongodb/bin/mongod --dbpath ~/data/db
```

**Terminal 2 - Start Backend:**
```bash
npm run dev:server
```

Wait for: `Database successfully connected`

**Terminal 3 - Start Frontend:**
```bash
cd frontend
npm run dev
```

Your application should now be running at http://localhost:5173

**Note:** Always start MongoDB (Terminal 1) before the backend (Terminal 2).