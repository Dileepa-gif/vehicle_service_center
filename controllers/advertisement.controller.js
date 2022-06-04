const Advertisement = require("../models/advertisement.model");
const AdvertisementImage = require("../models/advertisement_image.model");

exports.create = (req, res) => {
  let image_arr = req.body.image_arr;
  if(image_arr.length >= 1){
    const newAdvertisement = new Advertisement({
      vehicle_id: req.body.vehicle_id,
      brand: req.body.brand,
      model: req.body.model,
      thumbnail: image_arr[0],
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
          if (image_arr.length > 1) {
  
            image_arr.slice(1).forEach((image) => {
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

  }else{
    return res.status(200).json({
      code: 200,
      success: false,
      message: "Requires at least 1 image",
    });
  }
};

exports.getAllAdvertisements = (req, res) => {
  Advertisement.getAllAdvertisements()
    .then(async ([advertisements]) => {
      if (advertisements.length) {
        return res.status(200).json({
          code: 200,
          success: true,
          data: advertisements,
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
            const _advertisement = advertisement[0];
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
  let image_arr = req.body.image_arr;
  if (image_arr.length >= 1) {
    const updatedAdvertisement = new Advertisement({
      vehicle_id: req.body.vehicle_id,
      brand: req.body.brand,
      model: req.body.model,
      thumbnail: image_arr[0],
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
    updatedAdvertisement
      .update1(req.params.id)
      .then(([advertisement]) => {
        if (advertisement.affectedRows === 1) {
          AdvertisementImage.deleteByAdvertisementId(req.params.id)
            .then(([deleted_images]) => {

              if (image_arr.length > 1) {
                image_arr.slice(1).forEach((image) => {
                  const newAdvertisementImage = new AdvertisementImage({
                    advertisement_id: req.params.id,
                    image: image,
                  });
                  newAdvertisementImage
                    .create()
                    .then(([inserted_images]) => {
                      console.log("inserted_images => ", inserted_images);
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
  
              } else {
                return res.status(200).json({
                  code: 200,
                  success: true,
                  message: "Successfully created",
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
    updatedAdvertisement
      .update2(req.params.id)
      .then(([advertisement]) => {
        if (advertisement.affectedRows === 1) {
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
  Advertisement.changeStatus(req.params.id)
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
};
