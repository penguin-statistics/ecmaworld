import { SiteLanguages as SiteLanguage, SiteServers as SiteServer } from "@exusiai-dev/rest/v3/i18n";
import { Model, model, modelAction, prop } from "mobx-keystone";

@model("coredata/Preferences")
export class Preferences extends Model({
  server: prop<SiteServer>("CN"),
  language: prop<SiteLanguage>("zh")
}) {
  @modelAction
  changeServer(server: SiteServer) {
    this.server = server
  }

  @modelAction
  changeLanguage(language: SiteLanguage) {
    this.language = language
  }
}
