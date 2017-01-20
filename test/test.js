import chai from 'chai';
import coockieSet from '../static_src/js/index.js';

chai.expect();
const expect = chai.expect;

describe(coockieSet(), function () {
	it('should return the correct value', () => {
	  expect(coockieSet()).to.be.oneOf(['sing_up_axe', 'sing_up_man']);
	});
});
