"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
// Configure enviroment variables
(0, dotenv_1.config)({ path: "./.env" });
//////////////////////////
const app_1 = __importDefault(require("./app"));
const swagger_1 = __importDefault(require("./swagger"));
const PORT = process.env.PORT;
app_1.default.listen(PORT, () => {
    (0, swagger_1.default)(app_1.default);
    console.log(`Application Running on port ${PORT}...`);
});
//# sourceMappingURL=index.js.map