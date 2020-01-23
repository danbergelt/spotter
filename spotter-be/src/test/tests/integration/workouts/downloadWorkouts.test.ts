const app = require('../../../utils/index');
import { genToken } from '../../../utils/genToken';
import { describe, beforeEach, it } from 'mocha';
import { createWorkout } from '../../../utils/createWorkout';
import chaiHttp from 'chai-http';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);
const should = chai.should();
import Workout from '../../../../models/Workout';
import { createUser } from '../../../utils/createUser';
import { template } from '../../../utils/templateWorkout';

// configure Chai HTTP
chai.use(chaiHttp);

// binary parser --> allows the test to receive data
const binaryParser = function(res: any, cb: any) {
  res.setEncoding('binary');
  res.data = '';
  res.on('data', function(chunk: any) {
    res.data += chunk;
  });
  res.on('end', function() {
    cb(null, Buffer.from(res.data, 'binary'));
  });
};

describe('download workout data', () => {
  let uId: any;

  // create test user
  beforeEach(async () => {
    await Workout.deleteMany({});
    const { _id } = await createUser();
    template.user = _id;
    const { _id: temp } = await createWorkout(template);
    uId = temp;
    return uId;
  });

  it('should return download data', done => {
    const token = genToken(template.user!);
    chai
      .request(app)
      .get(`/api/auth/workouts/download`)
      .set('Authorization', `Bearer ${token}`)
      .buffer()
      .parse(binaryParser)
      .end((_, res) => {
        should.exist(res);
        res.status.should.equal(200);
        Buffer.isBuffer(res.body).should.equal(true);
        done();
      });
  });
});
