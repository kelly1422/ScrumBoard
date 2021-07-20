const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const User = require("../schemas/user");
const Comment = require('../schemas/comment');

router.post("/delete", async (req, res) => {
    try {
      await Comment.remove({
        _id: req.body._id
      });
      res.json({ message: true });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });

router.post("/update", async (req, res) => {
  try {
    await Comment.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "게시글이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  console.log('write comment');
  try {
    let obj;

    obj = {
      writer: req.body._id,
      content: req.body.content
    };

    const comment = new Comment(obj);
    await comment.save();
    res.json({ message: "댓글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
}); 

router.post("/getCommentList", async (req, res) => {
  try {
    const _id = req.body._id;
    const comment = await Comment.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: comment });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;