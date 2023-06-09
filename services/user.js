const dbase = require("../utils/connectDB");
const lodash = require("lodash");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const registerUser = async (event, arg) => {
  try {
    const file = "./.db";
    if (!fs.existsSync(file)) {
      fs.mkdirSync(file);
    }
    const db = await dbase();
    // console.log(db);
    db.chain = lodash.chain(db.data);
    if (db.chain.get("users").find({ matric: arg.matric }).value()) {
      return event.sender.send("reg-stats", {
        error: true,

        status: "Student Already Registered",
      });
    }
    if (arg.courses.length < 1) {
      return event.sender.send("reg-stats", {
        error: true,

        status: "You must Select Courses",
      });
    }
    arg._id = uuid();

    arg.scanned = false;
    // Create and query items using plain JS
    db.data.users.push(arg);
    await db.write();
    // const user = db.chain.get("users").remove({ matric: "ddd" }).value();
    // await db.write();
    // console.log(user);
    return (
      db.chain.get("users").find({ matric: arg.matric }).value() &&
      event.sender.send("reg-stats", {
        error: false,
        _id: arg._id,
        status: "success",
      })
    );
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
};
