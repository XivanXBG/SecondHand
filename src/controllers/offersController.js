const router = require("express").Router();
const catalogService = require("../services/catalogService");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const { isAuthenticatedGuard } = require("../middleware/authMiddle");
const { loadErrorMessages } = require("../utils/loadErrorMessages");
const path = require("path");

function isOwnerFn(offerOwnerId, userId) {
  if (offerOwnerId === userId) {
    return true;
  }
  return false;
}
router.get("/create", isAuthenticatedGuard, (req, res) => {
  res.render("offers/create");
});
router.post("/create", isAuthenticatedGuard, async (req, res) => {
  try {
    const body = req.body;
    body.owner = req.user._id;
    await catalogService.createOffer(body);
    res.redirect("/catalog");
  } catch (error) {
    const errMsgs = loadErrorMessages(error);

    res.status(404).render("offers/create", { errMsgs });
  }
});

router.get("/details/:offerId", async (req, res) => {
  const { offerId } = req.params;
  const user = req.user;
  const offer = await catalogService.loadOfferById(offerId).lean();
  let isOwner = false;
  let canBuy = false;
  let hasBought = false;
  if (user) {
    //owner
    const userId = user._id;
    if(isOwnerFn(offer.owner.toString(), userId)){
      isOwner = true;
    };
    //canBuy
    const userObjectId = new ObjectId(userId);
    const buyingList = offer.buyingList;

    hasBought = buyingList.some((buyer) => buyer.equals(userObjectId));

    if (!isOwner && !hasBought) {
      canBuy = true;
    }
  }
  res.render("offers/details", { offer, isOwner, canBuy, hasBought });
});

router.get("/details/:offerId/buy", isAuthenticatedGuard, async (req, res) => {
  const { offerId } = req.params;
  const offer = await catalogService.loadOfferById(offerId).lean();

  if (isOwnerFn(offer.owner.toString(), req.user._id)) {
    console.log("isowner");
  } else {
    offer.buyingList.push(req.user._id);
    catalogService.updateById(offerId, offer);
  }

  res.redirect(`/offers/details/${offerId}`);
});
router.get("/details/:offerId/edit", isAuthenticatedGuard, async (req, res) => {
  const { offerId } = req.params;
  const offer = await catalogService.loadOfferById(offerId).lean();
  if (isOwnerFn(offer.owner.toString(), req.user._id)) {
    res.render(`offers/edit`, { offer });
  } else {
    res.redirect(`/offers/details/${offerId}`);
  }
});
router.post(
  "/details/:offerId/edit",
  isAuthenticatedGuard,
  async (req, res) => {
    const { offerId } = req.params;
    const offer = await catalogService.loadOfferById(offerId).lean();
    try {
      
      if (isOwnerFn(offer.owner.toString(), req.user._id)) {
        const body = req.body;
        await catalogService.updateById(offerId, body);
        res.redirect(`/offers/details/${offerId}`);
      } else {
        res.redirect(`/offers/details/${offerId}`);
      }
    } catch (error) {
      const errMsgs = loadErrorMessages(error);
      res.render('offers/edit', {offer, errMsgs });
    }
  }
);
router.get(
  "/details/:offerId/delete",
  isAuthenticatedGuard,
  async (req, res) => {
    const { offerId } = req.params;
    const offer = await catalogService.loadOfferById(offerId).lean();
    if (isOwnerFn(offer.owner.toString(), req.user._id)) {
      await catalogService.deleteById(offerId);
      res.redirect(`/catalog`);
    } else {
      res.redirect(`/offers/details/${offerId}`);
    }
  }
);

module.exports = router;
