import latitudeValidator from './validators/latitude';
import longitudeValidator from './validators/longitude';
import mongoose from '../libs/mongoose';

// MongoDB geospatial default unit is meters
const GEOSPATIAL_MAX_DISTANCE = 10;

let ReportSchema = new mongoose.Schema({
  geolocation: {
    type: [Number],
    index: '2d',
    required: true,
    // TODO: extract to a separate file
    validate: function(point) {
      return latitudeValidator(point[0]) && longitudeValidator([point[1]]);
    }
  },
  category: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
}, { timestamps: true });

ReportSchema.statics = {
  findByGeolocation(geolocation, maxDistance) {
    const QUERY = {
      geolocation: {
        $near: geolocation,
        $maxDistance: maxDistance || GEOSPATIAL_MAX_DISTANCE
      }
    };

    return this.find(QUERY).execAsync()
      .then((reports) => {
        if (reports) {
          return reports;
        }

        return Promise.reject(new Error('Reports not found'));
      });
  }
};

export default mongoose.model('Report', ReportSchema);
