import express from "express";
import {
  getAllMedia,
  getAllPost,
  getAllLike,
  getFollow,
  getUser,
  getPost,
} from "../controllers/getControllers.js";
import {
  postComment,
  postFollow,
  postLike,
} from "../controllers/postControllers.js";

const router = express.Router();

router.get("/posts/follow/followers", getFollow);
router.get("/comment", getAllLike);
router.get("/", getAllMedia);
router.get("/posts", getAllPost);
router.get("/posts/:id", getPost);
router.get("/:id", getUser);

router.post("/post/comment", postComment);
router.post("/post/like", postLike);
router.post("/post/follow", postFollow);

export default router;
