import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    name: "Lazy Susan WordPress Plugin",
    message: "Plugin server is running"
  });
});

app.post("/limitless", async (req, res) => {
  const { action, params } = req.body;

  if (!action) {
    return res.status(400).json({
      ok: false,
      error: "Missing action"
    });
  }

  if (action === "list_posts") {
    return res.json({
      ok: true,
      action: "list_posts",
      message: "Here are your recent posts",
      posts: [
        { id: 1, title: "Hello World", status: "published" },
        { id: 2, title: "Draft Post", status: "draft" }
      ]
    });
  }

  if (action === "create_post") {
    return res.json({
      ok: true,
      action: "create_post",
      message: "Draft created successfully",
      post: {
        id: 3,
        title: params?.title || "Untitled Draft",
        status: "draft"
      }
    });
  }

  if (action === "publish_post") {
    return res.json({
      ok: true,
      action: "publish_post",
      message: "Post published successfully",
      post: {
        id: params?.id || 3,
        status: "published"
      }
    });
  }

  return res.status(400).json({
    ok: false,
    error: `Unknown action: ${action}`
  });
});

app.listen(PORT, () => {
  console.log(`Lazy Susan plugin running on port ${PORT}`);
});
