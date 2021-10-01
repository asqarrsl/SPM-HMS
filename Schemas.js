const BaseJoi = require("joi");
const sanitizeHTML = require("sanitize-html");
const extension = (joi) => ({
  type: "string",
  base: joi.string(),
  messages: {
    "string.escapeHTML": "{{#label}} must not include HTML",
  },
  rules: {
    escapeHTML: {
      validate(value, helpers) {
        const clean = sanitizeHTML(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error("string.escapeHTML", { value });
        return clean;
      },
    },
  },
});
const Joi = BaseJoi.extend(extension);
module.exports.campgroundSchema = Joi.object({
  campground: Joi.object({
    title: Joi.string().required().escapeHTML(),
    price: Joi.number().required().min(0),
    // image:Joi.string().required(),
    location: Joi.string().required().escapeHTML(),
    description: Joi.string().required().escapeHTML(),
  }).required(),
  deleteImages: Joi.array(),
});

module.exports.reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    body: Joi.string().required().escapeHTML(),
  }).required(),
});

module.exports.customerSchema = Joi.object({
  customer: Joi.object({
    fname: Joi.required(),
    lname: Joi.required(),
    email: Joi.string().email().required(),
    mobile: Joi.number().required(),
    nic: Joi.required(),
    dob: Joi.required(),
    address: Joi.required(),
    city: Joi.required(),
    state: Joi.required(),
    country: Joi.required(),
  }).required(),
});

module.exports.ammenitySchema = Joi.object({
  ammenity: Joi.object({
    name: Joi.required(),
    quantity: Joi.required(),
    price_per_unit: Joi.required(),
  }).required(),
});

module.exports.countrySchema = Joi.object({
  country: Joi.object({
    name: Joi.required(),
    code: Joi.required(),
  }).required(),
});

module.exports.facilitySchema = Joi.object({
  facility: Joi.object({
    name: Joi.required(),
    duration: Joi.required(),
    headcount: Joi.required(),
    price: Joi.required(),
  }).required(),
});

module.exports.packageSchema = Joi.object({
  package: Joi.object({
    name: Joi.required(),
    amount: Joi.required(),
    facilities: Joi.required(),
    ammenities: Joi.required(),
    type: Joi.required(),
  }).required(),
});

module.exports.paymentSchema = Joi.object({
  payment: Joi.object({
    name: Joi.required(),
    card_no: Joi.required(),
    cvc: Joi.required(),
    expire: Joi.required(),
  }).required(),
});

module.exports.bookingSchema = Joi.object({
  booking: Joi.object({
    room: Joi.required(),
    customer: Joi.required(),
    ammenities: Joi.required(),
    package: Joi.required(),
    total: Joi.required(),
    check_in: Joi.required(),
    checkout: Joi.required(),
  }).required(),
});
module.exports.roomSchema = Joi.object({
  room: Joi.object({
    number: Joi.required(),
    type: Joi.required(),
    charge: Joi.required(),
    headcount: Joi.required(),
  }).required(),
});

module.exports.stateSchema = Joi.object({
  state: Joi.object({
    name: Joi.required(),
    country: Joi.required(),
  }).required(),
});

module.exports.userSchema = Joi.object({
  user: Joi.object({
    email: Joi.required(),
    username: Joi.required(),
    fname: Joi.required(),
    password: Joi.required(),
    lname: Joi.required(),
    role: Joi.required(),
  }).required(),
});
