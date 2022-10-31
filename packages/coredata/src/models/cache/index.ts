import { getInit } from '@exusiai-dev/rest';
import { runInAction } from 'mobx';
import { Model, model, modelFlow, objectToMapTransform, prop, _async, _await } from 'mobx-keystone';
import { Stage } from './stage';

@model('coredata/Cache')
export class Cache extends Model({
  stages: prop<Record<string, Stage>>(() => ({}))
    .withTransform(objectToMapTransform())
}) {
  @modelFlow
  invalidateFoundationalDataset = _async(function* (this: Cache) {
    const resp = yield * _await(getInit());

    runInAction(() => {
      for (const stage of resp.stages) {
        this.stages.set(stage.arkStageId, new Stage(stage))
      }
    })
  })
}
