const router = require("express").Router();
const userService = require("../services/userService");
const {
  isLoggedInGuard,
  isAuthenticatedGuard,
} = require("../middleware/authMiddle");
const { loadErrorMessages } = require("../utils/loadErrorMessages");

router.get("/login", isLoggedInGuard, (req, res) => {
  res.render("user/login");
});

router.post("/login", isLoggedInGuard, async (req, res) => {
  try {
    const body = req.body;
    const token = await userService.login(body);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errMsgs = loadErrorMessages(error);
    res.status(404).render("user/login", { errMsgs });
  }
});

router.get("/register", isLoggedInGuard, (req, res) => {
  res.render("user/register");
});

router.post("/register", isLoggedInGuard, async (req, res) => {
  try {
    const body = req.body;
    const token = await userService.register(body);
    res.cookie("auth", token, { httpOnly: true });
    res.redirect("/");
  } catch (error) {
    const errMsgs = loadErrorMessages(error);
    res.status(404).render("user/register", { errMsgs });
  }
});
router.get("/logout", isAuthenticatedGuard, (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = router;
