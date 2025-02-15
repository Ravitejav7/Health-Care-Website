import app from "./server.js";
import { createMongoConnection } from "./utils/db.utils.js";
import { createServer } from "http";


const port = process.env.PORT || 8080;
const uri = process.env.URI;

const server = createServer(app);

server.listen(port, async () => {
  try {
    console.log(`Attempting to connect to MongoDB at URI: ${uri}`);
    await createMongoConnection(uri);
    console.log(`server is listening on port ${port}`);
  } catch (error) {
    console.error("Error starting the server:", error);
  }
});
