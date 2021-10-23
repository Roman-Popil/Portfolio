### Installation

In order to start the program you need to create a folder 'config' with file 'keys.js' and using module.exports paste there your MongoURI.

```bash
# Install backend dependencies
npm install

# Start backend Express DevServer
npm run dev

# Install frontend dependencies
cd client && npm install

# Start frontend Vue DevServer
cd client
npm run serve

# Build frontend for production
cd client
npm run build

```

## API Routes

* GET /api/todos (retrieves todolist from DB and returns as an array)

* POST /api/todo (adds a todo task to the todolist in DB)

* PUT /api/todo/:id (updates todo task in DB)

* DELETE /api/todo/:id (deletes todo task in DB)

## Version


