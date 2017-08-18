import { when, discard, setByDot } from 'feathers-hooks-common';
import { sanitizeAddress, validateAddress } from '../../hooks/address';
import { restrictToOwner, restrictToAuthenticated } from 'feathers-authentication-hooks';

const restrict = [
  restrictToOwner({
    idField: 'address',
    ownerField: 'address',
  }),
];

const setAddress = context => {
  setByDot(context.data, "address", context.params.user.address);
  return context
};

const address = [
  setAddress,
  sanitizeAddress("address"),
  validateAddress("address"),
];

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [ discard('_id'), restrictToAuthenticated(), ...address ],
    update: [ ...restrict ],
    patch: [ ...restrict ],
    remove: [],
  },

  after: {
    all: [
      when(
        hook => hook.params.provider,
        discard('_id'),
      ),
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
