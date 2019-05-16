// cars-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const cars = new Schema({
    name: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return v.length > 3;
        },
        message: props => `${props.value} is too short`
      },
    },
    available: {
      type: Boolean,
      default: false
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('cars', cars);
};
