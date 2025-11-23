"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const web_1 = require("./application/web");
const logging_1 = require("./lib/logging");
web_1.app.listen(3000, () => {
    logging_1.logger.info("application statr on port:" + 3000);
});
//# sourceMappingURL=main.js.map