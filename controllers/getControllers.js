import { PrismaClient } from "@prisma/client";

import "dotenv/config";

const prisma = new PrismaClient();

export const getAllMedia = async (req, res) => {
  try {
    const media = await prisma.user.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        Like: true,
        Comment: {
          include: {
            created_by_user: true,
          },
        },
        Notification: true,
        Post: true,
      },
    });
    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching media" });
  }
};

export const getAllLike = async (req, res) => {
  try {
    const media = await prisma.like.findMany();
    res.json(media);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching media" });
  }
};

export const getAllPost = async (req, res) => {
  try {
    const post = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        Comment: {
          include: {
            created_by_user: true,
          },
        },
        Like: true,
        Post_Media: true,
        created_by_user: {
          include: {
            // Follow: true,
            follower: true,
            following: true,
            Post: true,
          },
        },
      },
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching media" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: id,
      },
      include: {
        follower: {
          include: {
            follower: true,
            following: true,
          },
        },
        following: {
          include: {
            follower: true,
            following: true,
          },
        },
        Post: {
          include: {
            created_by_user: true,
            Post_Media: true,
          },
        },
        Save: {
          include: {
            post: {
              include: {
                created_by_user: true,
                Post_Media: true,
              },
            },
          },
        },
        Like: {
          include: {
            post: {
              include: {
                created_by_user: true,
                Post_Media: true,
              },
            },
          },
        },
        Notification: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching media" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findFirst({
      where: {
        id: id,
      },
      include: {
        Comment: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            created_by_user: true,
          },
        },
        Like: true,
        Post_Media: true,
        created_by_user: {
          include: {
            follower: true,
            following: true,
          },
        },
      },
    });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Error fetching media" });
  }
};

export const getFollow = async (req, res) => {
  try {
    const followers = await prisma.follow.findMany({
      include: {
        follower: {
          include: {
            follower: true,
            following: true,
          },
        },
        following: {
          include: {
            follower: true,
            following: true,
          },
        },
      },
    });
    res.json(followers);
  } catch (err) {
    console.error("Error fetching followers:", err);
    res.status(500).json({ error: "Failed to fetch followers" });
  }
};
