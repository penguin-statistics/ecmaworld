import { model, Model, prop } from 'mobx-keystone';
import { Cache } from './models/cache';
import { Preferences } from './models/preferences/index';

@model('coredata/RootStore')
export class RootStore extends Model({
  cache: prop<Cache>(() => (new Cache({}))),
  preferences: prop<Preferences>(() => (new Preferences({}))),
}) {}

export const store = new RootStore({})
