const Advertisement = require("../models/advertisement.model");
const AdvertisementImage = require("../models/advertisement_image.model");

exports.create = (req, res) => {
  const newAdvertisement = new Advertisement({
    vehicle_id: req.body.vehicle_id,
    brand: req.body.brand,
    model: req.body.model,
    manufactured_year: req.body.manufactured_year,
    vehicle_condition: req.body.vehicle_condition,
    transmission: req.body.transmission,
    fuel_type: req.body.fuel_type,
    engine_capacity: req.body.engine_capacity,
    mileage: req.body.mileage,
    seller_name: req.body.seller_name,
    city: req.body.city,
    price: req.body.price,
    contact_number: req.body.contact_number,
    is_sold: 0,
  });

  newAdvertisement
    .create()
    .then(([result]) => {
      if (result.affectedRows === 1) {
        if (req.body.image_arr) {

          let image_arr = req.body.image_arr;
          
          image_arr.forEach((image) => {
            
            const newAdvertisementImage = new AdvertisementImage({
              advertisement_id: result.insertId,
              image: image,
            });
            newAdvertisementImage
              .create()
              .then(([image_result]) => {
                console.log("image_result => ", image_result);
              })
              .catch((error) => {
                console.log(error);
                return res.status(200).json({
                  code: 200,
                  success: false,
                  message: error.message,
                });
              });
          });
          return res.status(200).json({
            code: 200,
            success: true,
            message: "Successfully created",
          });
        } else {
          return res.status(200).json({
            code: 200,
            success: true,
            message: "Successfully created",
          });
        }
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Please try again",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.getAllAdvertisements = (req, res) => {
  let advertisement_arr = [];
  Advertisement.getAllAdvertisements()
    .then(async ([advertisements]) => {
      console.log(advertisements)
      if (advertisements.length) {
        advertisements.forEach((advertisement) => {
          AdvertisementImage.getAdvertisementImagesByAdvertisementId(
            advertisement.id
          )
            .then(([images]) => {
              const _advertisement = advertisement;
              const _images = { images: images };
              const NewElement = {
                ..._advertisement,
                ..._images,
              };
              advertisement_arr.push(NewElement);
            })
            .catch((error) => {
              console.log(error);
              return res.status(200).json({
                code: 200,
                success: false,
                message: error.message,
              });
            });
        });
        function sleep(millis) {
          return new Promise((resolve) => setTimeout(resolve, millis));
        }
        await sleep(500);
        return res.status(200).json({
          code: 200,
          success: true,
          data: advertisement_arr,
          message: "Data received",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          data: advertisements,
          message: "Data not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.getAdvertisementById = (req, res) => {
  Advertisement.getAdvertisementById(req.params.id)
    .then(([advertisement]) => {
      if (advertisement.length) {
        AdvertisementImage.getAdvertisementImagesByAdvertisementId(
          req.params.id
        )
          .then(([images]) => {
            console.log(images)
            const _advertisement = advertisement;
            const _images = { images: images };
            return res.status(200).json({
              code: 200,
              success: true,
              data: {
                ..._advertisement,
                ..._images,
              },
              message: "Data received",
            });
          })
          .catch((error) => {
            console.log(error);
            return res.status(200).json({
              code: 200,
              success: false,
              message: error.message,
            });
          });
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          data: advertisement,
          message: "Data not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.update = (req, res) => {
  if (req.body.image_arr && req.body.image_arr.length) {
    let image_arr = req.body.image_arr;
    const updatedAdvertisement = new Advertisement({
      vehicle_id: req.body.vehicle_id,
      brand: req.body.brand,
      model: req.bod.model,
      manufactured_year: req.body.manufactured_year,
      vehicle_condition: req.body.vehicle_condition,
      transmission: req.body.transmission,
      fuel_type: req.body.fuel_type,
      engine_capacity: req.body.engine_capacity,
      mileage: req.body.mileage,
      seller_name: req.body.seller_name,
      city: req.body.city,
      price: req.bod.price,
      contact_number: req.body.contact_number,
      is_sold: 0,
    });
    updatedAdvertisement
      .update(req.params.id)
      .then(([result]) => {
        if (result.affectedRows === 1) {
          AdvertisementImage.deleteByAdvertisementId(req.params.id)
            .then(([result]) => {
              image_arr.forEach((image) => {
                const newAdvertisementImage = new AdvertisementImage({
                  advertisement_id: result.insertId,
                  image: image.image,
                });
                newAdvertisementImage.create
                  .then(([image_result]) => {
                    console.log("image_result => ", image_result);
                  })
                  .catch((error) => {
                    console.log(error);
                    return res.status(200).json({
                      code: 200,
                      success: false,
                      message: error.message,
                    });
                  });
              });
              return res.status(200).json({
                code: 200,
                success: true,
                message: "Successfully updated",
              });
            })
            .catch((error) => {
              console.log(error);
              return res.status(200).json({
                code: 200,
                success: false,
                message: error.message,
              });
            });
        } else {
          return res.status(200).json({
            code: 200,
            success: false,
            message: "Please try again",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(200).json({
          code: 200,
          success: false,
          message: error.message,
        });
      });
  } else {
    const updatedAdvertisement = new Advertisement({
      vehicle_id: req.body.vehicle_id,
      brand: req.body.brand,
      model: req.bod.model,
      manufactured_year: req.body.manufactured_year,
      vehicle_condition: req.body.vehicle_condition,
      transmission: req.body.transmission,
      fuel_type: req.body.fuel_type,
      engine_capacity: req.body.engine_capacity,
      mileage: req.body.mileage,
      seller_name: req.body.seller_name,
      city: req.body.city,
      price: req.bod.price,
      contact_number: req.body.contact_number,
      is_sold: 0,
    });
    updatedAdvertisement
      .update(req.params.id)
      .then(([result]) => {
        if (result.affectedRows === 1) {
          return res.status(200).json({
            code: 200,
            success: true,
            message: "Successfully updated",
          });
        } else {
          return res.status(200).json({
            code: 200,
            success: false,
            message: "Please try again",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.status(200).json({
          code: 200,
          success: false,
          message: error.message,
        });
      });
  }
};

exports.delete = (req, res) => {
  Advertisement.delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 1) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Successfully deleted",
        });
      } else {
        return res.status(200).json({
          code: 200,
          success: false,
          message: "Please try again",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.message,
      });
    });
};

exports.changeStatus = (req, res) => {
  Advertisement.changeStatus(req.params.id).then(([result]) => {
    if (result.affectedRows === 1) {
      return res.status(200).json({
        code: 200,
        success: true,
        message: "Successfully updated",
      });
    } else {
      return res.status(200).json({
        code: 200,
        success: false,
        message: "Please try again",
      });
    }
  });
};
