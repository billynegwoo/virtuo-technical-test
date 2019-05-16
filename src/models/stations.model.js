// stations-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const stations = new Schema({
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
    cars: [{ type: Schema.Types.ObjectId, ref: 'cars' }]
  }, {
    timestamps: true
  });

  return mongooseClient.model('stations', stations);
};
