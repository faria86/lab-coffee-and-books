"use strict";

const { Router } = require("express");

const placeRouter = new Router();

const Place = require("./../models/place");

placeRouter.get("/list", (req, res, next) => {
  Place.find()
    .then((places) => {
      res.render("place/list", { places });
    })
    .catch((error) => {
      next(error);
    });
});

placeRouter.get("/create", (req, res, next) => {
  res.render("place/create");
});

placeRouter.get("/:placeId", (req, res, next) => {
  const placeId = req.params.placeId;

  Place.findById(placeId)
    .then((place) => {
      res.render("place/single", { place });
    })
    .catch((error) => {
      next(error);
    });
});

//route handler to edit a place (not updating the values in browser)
placeRouter.post("/edit/:id", (req, res, next) => {
  const placeId = req.params.id;
  var place = new Place();
  place.id = placeId;
  place.name = req.body.name;
  place.coordinates = [];
  place.coordinates.push(req.body.longitude);
  place.coordinates.push(req.body.latitude);
  Place.findByIdAndUpdate(placeId, place)
    .then((place) => {
      res.render('place/single', { place })
    })
    .catch((error) => {
      next(error);
    });
});
//route handler tod delete a place
placeRouter.post("/delete/:id", (req, res, next) => {
  const placeId = req.params.id;

  Place.findByIdAndDelete(placeId)
    .then(() => {
      res.render('place/list')
    })
    .catch((error) => {
      next(error);
    });
});

placeRouter.post("/create", (req, res, next) => {
  const name = req.body.name;
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;

  Place.create({
    name,
    location: {
      coordinates: [longitude, latitude],
    },
  })
    .then((place) => {
      res.redirect("/");
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = placeRouter;
