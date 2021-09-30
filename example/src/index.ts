import * as express from "express";
import { wrap } from "./oxpress.generated";

const app = express();
const router = wrap(app);

router.get("/v1/users/:userId", (req, res) => {
  res.status(200).json({
    age: 21,
    name: "Jan",
    id: "123",
  });
});
