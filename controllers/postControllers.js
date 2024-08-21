import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postComment = async (req, res) => {
  try {
    const { media_id, comment, created_by_user_id } = req.body;

    await prisma.comment.create({
      data: {
        comment: comment,
        created_by_user: {
          connect: { id: created_by_user_id },
        },
        media: {
          connect: { id: media_id },
        },
      },
    });

    res.status(201).json({ message: "Comment created successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error creating comment: ${err.message}` });
  }
};

export const postLike = async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    // Check if the like already exists
    const existsLike = await prisma.like.findFirst({
      where: {
        post_id: post_id,
        user_id: user_id,
      },
    });

    if (existsLike) {
      // If it exists, delete the like
      await prisma.like.delete({
        where: {
          id: existsLike.id, // Use the id of the existing like
        },
      });
      return res.status(200).json({ message: "Like removed successfully" });
    } else {
      // If it doesn't exist, create a new like
      await prisma.like.create({
        data: {
          user_id: user_id,
          post_id: post_id,
        },
      });
      return res.status(201).json({ message: "Post liked successfully" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error processing like: ${err.message}` });
  }
};

export const postFollow = async (req, res) => {
  try {
    const { user_follower_id, user_following_id } = req.body;

    const existsFollow = await prisma.follow.findFirst({
      where: {
        follower_id: user_follower_id,
        following_id: user_following_id,
      },
    });

    if (existsFollow) {
      await prisma.follow.delete({
        where: {
          id: existsFollow.id, // استفاده از id رکورد موجود
        },
      });
      return res.status(200).json({ message: "follow removed successfully" });
    } else {
      await prisma.follow.create({
        data: {
          follower_id: user_follower_id,
          following_id: user_following_id,
        },
      });
      return res.status(201).json({ message: "followed user successfully" });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: `Error processing like: ${err.message}` });
  }
};
