import latitudeValidator from './validators/latitude';
import longitudeValidator from './validators/longitude';
import mongoose from '../libs/mongoose';

const METER_PER_DEGREES = 111320;
const GEOSPATIAL_MAX_DISTANCE = 1000;

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

const convertDegreesToMeters = (meters) => {
  return meters / METER_PER_DEGREES;
};

ReportSchema.statics = {
  findByGeolocation(geolocation, maxDistance) {
    const MAX_DISTANCE = convertDegreesToMeters(maxDistance || GEOSPATIAL_MAX_DISTANCE);
    const QUERY = {
      geolocation: {
        $near: geolocation,
        $maxDistance: MAX_DISTANCE
      }
    };

    return this.find(QUERY).execAsync();
  }
};

export default mongoose.model('Report', ReportSchema);
