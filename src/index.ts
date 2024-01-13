import "dotenv/config";
import app, { port } from "./app";

app.listen(port, () => {
  console.log(`🚀 Server ready on port ${port}`);
});
