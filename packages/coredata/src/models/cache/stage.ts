import { Existence, I18nString } from '@exusiai-dev/rest/v3/common';
import { DropInfo, StageType } from '@exusiai-dev/rest/v3/stages';
import { computed } from 'mobx';
import { idProp, Model, model, prop } from 'mobx-keystone';
import { store } from '../../store';

@model("coredata/Stage")
export class Stage extends Model({
  pgStageId: prop<number>(),
  arkStageId: idProp,
  zoneId: prop<number>(),
  stageType: prop<StageType>(),
  code: prop<I18nString>(),
  sanity: prop<number>(),
  existence: prop<Existence>(),
  minClearTime: prop<number | null>(),
  dropInfos: prop<DropInfo[]>(() => []),
  recognitionOnly: prop<string[]>(() => []),
}) {
  @computed
  get localizedCode() {
    return this.code[store.preferences.language] || this.code["en"];
  }
}