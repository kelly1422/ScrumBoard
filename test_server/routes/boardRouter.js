const express = require("express");
const router = express.Router();
const Board = require("../schemas/board");
const User = require("../schemas/user");



router.post("/delete", async (req, res) => {
  try {
    await Board.remove({
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
    await Board.update(
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
  try {
    let obj;

    obj = {
      writer: req.body._id,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author
    };

    const board = new Board(obj);
    await board.save();
    res.json({ message: "게시글이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/getBoardListUser", async (req, res) => { //그 유저가 쓴 글만 보내기
  try {
    const _id = req.body._id;
    const board = await Board.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    const author = await User.find({ _id: _id });
    console.log(author);
    res.json({ 
      list: board,
      author: author.name 
    });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});
router.post("/getBoardList", async (req, res) => {
  try {
    const board = await Board.find(null, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: board });
  } catch (err) {
    console.log("error " + err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
  try {
    const _id = req.body._id;
    const board = await Board.find({ _id });
    res.json({ board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/userdetail", async(req, res) => {
  try{
    const _id = req.body._id;
    const board = await Board.find({ writer: _id }, null, {
      sort: { createdAt: -1 }
    });
    res.json({ list: board });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

module.exports = router;
