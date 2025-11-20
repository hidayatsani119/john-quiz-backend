import { app } from "./application/web";
import { logger } from "./lib/logging";

app.listen(3000, () => {
  logger.info("application statr on port:" + 3000);
});
