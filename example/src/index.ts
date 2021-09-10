import * as express from "express";
import { wrap } from "./oxpress.generated";

const app = express();
const router = wrap(app);

router.get("/v1/events", (req, res) => {
  res.status(200).json([
    {
      lat: req.query.lat,
      lng: req.query.lng,
    },
  ]);
});
