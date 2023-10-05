const { List } = require("../model/list");
exports.deleteList = async (req, res) => {
  try {
    await List.findByIdAndDelete(req.params.list);
    res.json({ status: "success" });
  } catch (e) {
    res.json({ status: "error", message: "server error" });
  }
};
