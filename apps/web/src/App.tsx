import { useGetInitQuery } from "@exusiai-dev/coredata/api/penguinV3Api";
import {
  changeLanguage,
  changeServer,
} from "@exusiai-dev/coredata/preferences";
import { RootState } from "@exusiai-dev/coredata/store";
import { SiteLanguages } from "@exusiai-dev/rest/v3/i18n";
import { Stage } from "@exusiai-dev/rest/v3/stages";
import { Zone } from "@exusiai-dev/rest/v3/zones";
import { Button, Menu, MenuItem } from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const language = useSelector((state: RootState) => state.preference.language);
  const dispatch = useDispatch();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        variant="contained"
      >
        Language: {language}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {(["zh", "en", "ja", "ko"] as SiteLanguages[]).map((lang) => (
          <MenuItem
            sx={{
              "&": {
                fontFamily: "JetBrains Mono",
              },
            }}
            key={lang}
            onClick={() => {
              dispatch(changeLanguage(lang));
              handleClose();
            }}
            selected={lang === language}
          >
            Change to Language: {lang}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

const StageSelectorStageNavigator = ({ code }: { code: string }) => {
  return <Button variant="outlined">{code}</Button>;
};

const StageSelectorZoneSegment = memo(
  ({ zone, stages }: { zone: Zone; stages: Stage[] }) => {
    const language = useSelector(
      (state: RootState) => state.preference.language
    );

    return (
      <div>
        <h3>{zone.name[language]}</h3>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem",
          }}
        >
          {stages
            .filter((stage) => stage.zoneId === zone.pgZoneId)
            .map((stage) => (
              <StageSelectorStageNavigator
                key={stage.pgStageId}
                code={stage.code[language]}
              />
            ))}
        </div>
      </div>
    );
  }
);
StageSelectorZoneSegment.displayName = "memo(StageSelectorZoneSegment)";

const StageSelector = () => {
  const { data, error, isLoading } = useGetInitQuery();

  if (error) {
    if ("status" in error) {
      const errMsg =
        "error" in error ? error.error : JSON.stringify(error.data);

      return (
        <div>
          <div>A request error has occurred: {errMsg}</div>
        </div>
      );
    } else {
      return <div>An unexpected code error has {error.message}</div>;
    }
  }
  if (isLoading) return <div>Loading...</div>;

  return (
    <div
      style={{
        marginTop: "1rem",
        textAlign: "left",
      }}
    >
      {data?.zones.map((zone) => (
        <StageSelectorZoneSegment
          zone={zone}
          stages={data?.stages.filter(
            (stage) => stage.zoneId === zone.pgZoneId
          )}
        />
      ))}
    </div>
  );
};

const AppPreference = () => {
  const server = useSelector((state: RootState) => state.preference.server);
  const dispatch = useDispatch();
  return (
    <>
      <h1>{server}</h1>
      <LanguageSelector />
      <div className="card">
        <button
          onClick={() => {
            dispatch(changeServer("CN"));
          }}
        >
          server = CN
        </button>

        <button
          onClick={() => {
            dispatch(changeServer("US"));
          }}
        >
          server = US
        </button>

        <button
          onClick={() => {
            dispatch(changeLanguage("zh"));
          }}
        >
          lang = zh
        </button>

        <button
          onClick={() => {
            dispatch(changeLanguage("en"));
          }}
        >
          lang = en
        </button>

        {/* <div>Total {stages.size} stages</div>
        <div>main_01-07: {JSON.stringify(stages.get("main_01-07"))}</div>
        <div>
          randomMaterial_1 code: {stages.get("randomMaterial_1")?.localizedCode}
        </div> */}
      </div>
    </>
  );
};

const App = () => {
  return (
    <div className="App">
      <AppPreference />
      <div className="card">
        <StageSelector />
      </div>
    </div>
  );
};

export default App;
