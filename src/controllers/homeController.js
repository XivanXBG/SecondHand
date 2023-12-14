const catalogService = require("../services/catalogService");
const {isAuthenticatedGuard} = require('../middleware/authMiddle.js')
const router = require("express").Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/search",isAuthenticatedGuard, async(req, res) => {
  const offers = await catalogService.loadCatalog().lean();
  res.render("search",{offers});
});

router.post("/search",isAuthenticatedGuard, async(req, res) => {
  let {searchName,searchType} = req.body;
  const offers = await catalogService.findOffersBySearch(searchName.trim(),searchType.trim()).lean();
  res.render("search",{offers});
});
router.get("/catalog", async (req, res) => {
  const catalog = await catalogService.loadCatalog().lean();
  res.render("catalog",{catalog});
});
router.get("/404", (req, res) => {
  res.render("404");
});

module.exports = router;
