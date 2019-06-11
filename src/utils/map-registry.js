import uuid from 'uuid/v4';
import { Map } from 'immutable';
const registry = {};

export const register = (data) => {
  const id = uuid();
  registry[id] = new Map(data);
  console.log('registry', registry);
  return id;
};
export const get = (id) => {
  console.log('getting', id);
  console.log(registry[id]);
  return registry[id];
};
export const remove = (id) => {
  delete registry[id];
};
