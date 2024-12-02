"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const errorController_1 = require("./controllers/errorController");
const schedulesRouter_1 = require("./routes/schedulesRouter");
const genreRouter_1 = require("./routes/genreRouter");
const cinemaRouter_1 = require("./routes/cinemaRouter");
const roomRouter_1 = require("./routes/roomRouter");
const ticketRouter_1 = require("./routes/ticketRouter");
const invoiceRouter_1 = require("./routes/invoiceRouter");
const app = (0, express_1.default)();
// Enable fetching from localhost
app.use((0, cors_1.default)());
// Middle to parse body request
app.use(express_1.default.json());
app.use("/movies", routes_1.movieRouter);
app.use("/casts", routes_1.castRouter);
app.use("/presigned", routes_1.s3Router);
app.use("/auth", routes_1.authRouter);
app.use("/user", routes_1.userRouter);
app.use("/schedules", schedulesRouter_1.schedulesRouter);
app.use("/languages", routes_1.languageRouter);
app.use("/genres", genreRouter_1.genreRouter);
app.use("/payments", routes_1.paymentRouter);
app.use("/cinemas", cinemaRouter_1.cinemaRouter);
app.use("/rooms", roomRouter_1.roomRouter);
app.use("/invoice", invoiceRouter_1.invoiceRouter);
app.use("/seats", routes_1.seatRouter);
app.use("/tickets", ticketRouter_1.ticketRouter);
app.use(errorController_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map