const express = require("express");
const router = express.Router();
const Calendar = require("../schemas/calendar");

router.post("/delete", async (req, res) => {
  try {
    await Calendar.remove({
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
    await Calendar.update(
      { _id: req.body._id },
      {
        $set: {
          title: req.body.title,
          content: req.body.content
        }
      }
    );
    res.json({ message: "스케줄이 수정 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/write", async (req, res) => {
  console.log('write new schedule');
  try {
    let obj;

    obj = {
      title: req.body.title,
      content: req.body.content
    };

    const calendar = new Calendar(obj);
    await calendar.save();
    res.json({ message: "스케줄이 업로드 되었습니다." });
  } catch (err) {
    console.log(err);
    res.json({ message: false });
  }
});

router.post("/detail", async (req, res) => {
    try {
      const _id = req.body._id;
      const calendar = await Calendar.find({ _id });
      res.json({ calendar });
    } catch (err) {
      console.log(err);
      res.json({ message: false });
    }
  });
  
  module.exports = router;