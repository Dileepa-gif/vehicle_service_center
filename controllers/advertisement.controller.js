const Advertisement = require("../models/advertisement.model");

const JoiBase = require("@hapi/joi");
const JoiDate = require("@hapi/joi-date");
const Joi = JoiBase.extend(JoiDate);

const advertisementValidation = (data) => {
  const schema = Joi.object({
    vehicle_id: Joi.number().required(),
    brand: Joi.string().required().min(2).max(250),
    model: Joi.string().required().min(2).max(250),
    manufactured_year: Joi.string().required().min(2).max(250),
    vehicle_condition: Joi.string().required().min(2).max(250),
    transmission: Joi.string().required().min(2).max(250),
    fuel_type: Joi.string().required().min(2).max(250),
    engine_capacity: Joi.string().required().min(2).max(250),
    mileage: Joi.string().required().min(2).max(250),
    seller_name: Joi.string().required().min(2).max(250),
    city: Joi.string().required().min(2).max(250),
    price: Joi.number().required(),
    contact_number: Joi.string()
      .required()
      .regex(/^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/)
      .min(10)
      .max(12)
      .messages({
        "string.min": "Must have at least 10 characters",
        "object.regex": "Must have at least 12 characters",
        "string.pattern.base": "Phone number should be corrected"
      }),
    thumbnail: Joi.string().allow(null, ''),
  });
  return schema.validate(data);
};


exports.create = (req, res) => {
  const { error } = advertisementValidation(req.body);
  if (error)
    return res.status(200).json({
      code: 200,
      success: false,
      message: error.details[0].message,
    });
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
    thumbnail: "data:image/png;base64," + req.body.thumbnail,
    is_sold: 0,
  });

  newAdvertisement
    .create()
    .then(([result]) => {
      if (result.affectedRows === 1) {
        return res.status(200).json({
          code: 200,
          success: true,
          message: "Successfully created",
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
        return res.status(200).json({
          code: 200,
          success: true,
          data: advertisement,
          message: "Data received",
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
  if (req.body.thumbnail) {
    const { error } = advertisementValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
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
      thumbnail: "data:image/png;base64," + req.body.thumbnail,
      is_sold: 0,
    });
    updatedAdvertisement
      .update1(req.params.id)
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
  } else {
    const { error } = advertisementValidation(req.body);
    if (error)
      return res.status(200).json({
        code: 200,
        success: false,
        message: error.details[0].message,
      });
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
