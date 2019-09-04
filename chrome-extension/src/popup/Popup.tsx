import * as React from "react";
import { Button, CircularProgress, Typography, Paper } from "@material-ui/core";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Heart from "@material-ui/icons/Favorite";
import { observer } from "mobx-react";
import { observable } from "mobx";
import "./Popup.scss";
import { theme } from "../constants/theme";
const logo = require("../../assets/logo.png");

interface AppProps {}

interface AppState {}

@observer
export default class Popup extends React.Component<AppProps, AppState> {
  constructor(props: AppProps, state: AppState) {
    super(props, state);
  }

  @observable selector = "body";
  @observable loading = false;
  @observable done = false;

  htmlToFigma() {
    this.loading = true;
    chrome.runtime.sendMessage({ inject: true }, response => {
      // TODO: detect error and display
      console.log("response", response);
      this.loading = false;
      this.done = true;
    });
  }

  render() {
    return (
      <div
        style={{
          width: 400,
          padding: 20,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <img
          style={{
            height: 61,
            width: 329,
            margin: "auto",
            marginBottom: 30,
            objectFit: "contain"
          }}
          src={logo}
        />
        {this.done ? (
          <Paper style={{ textAlign: "center", padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <CheckCircle
                style={{ color: theme.colors.primary }}
              />
              <Typography variant="body1" style={{ marginLeft: 10 }}>
                Done!
              </Typography>
            </div>
            <Typography variant="body2">
              Now grab the{" "}
              <a
                href="https://www.figma.com/c/plugin/747985167520967365/HTML-To-Figma"
                target="_blank"
                style={{
                  color: theme.colors.primary
                }}
              >
                Figma plugin
              </a>{" "}
              and choose "upload here" to upload the downloaded figma.json file
              to your current Figma document. <a
                href="https://github.com/BuilderIO/html-to-figma/tree/master/chrome-extension"
                target="_blank"
                style={{
                  color: theme.colors.primary
                }}
              >More info</a>
            </Typography>
            <img
              style={{ margin: "10px 0", maxWidth: "100%" }}
              src="https://imgur.com/ARz16KC.gif"
              alt="Chrome extension demo"
            />
          </Paper>
        ) : this.loading ? (
          <CircularProgress style={{ margin: "20px auto" }} />
        ) : (
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            onClick={() => this.htmlToFigma()}
          >
            Capture current page
          </Button>
        )}

        <div style={{ marginTop: 30, textAlign: "center", color: "#666" }}>
          Made with{" "}
          <Heart
            style={{
              color: "rgb(236, 55, 88)",
              fontSize: 16,
              verticalAlign: "middle"
            }}
          />{" "}
          by{" "}
          <a
            style={{ color: theme.colors.primary }}
            href="https://builder.io?ref=figma"
            target="_blank"
          >
            Builder.io
          </a>
        </div>

        <div
          style={{
            marginTop: 25,
            textAlign: "center",
            color: "#999",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.8,
            fontWeight: 400,
            fontSize: 9
          }}
        >
          <a
            style={{
              color: "#999",
              textDecoration: "none"
            }}
            href="https://github.com/BuilderIO/html-to-figma/issues"
            target="_blank"
          >
            Feedback
          </a>
          <span
            style={{
              display: "inline-block",
              height: 10,
              width: 1,
              background: "#999",
              marginTop: 1,
              opacity: 0.8,
              marginLeft: 5
            }}
          />
          <a
            style={{
              color: "#999",
              textDecoration: "none",
              marginLeft: 5
            }}
            href="https://github.com/BuilderIO/html-to-figma"
            target="_blank"
          >
            Source
          </a>
        </div>
      </div>
    );
  }
}
