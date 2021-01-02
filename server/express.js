import path from "path";
import express from "express";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import htmlTemplate from "./../htmlTemplate";

import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";

const CURRENT_WORKING_DIR = process.cwd();

const app = express();

async function bundle(app) {
  const obj = await import("../build-utils/devBundle");
  const devBundle = obj.default;
  devBundle(app);
}

const development = process.env.NODE_ENV === "development";
if (development) {
  bundle(app);
}

app.use(compress());
app.use(cookieParser());
if (development) {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
} else {
  app.use(helmet());
}

app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/", userRoutes);
app.use("/", authRoutes);

app.get("/", (req, res) => {
  res.status(200).send(htmlTemplate());
});

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
