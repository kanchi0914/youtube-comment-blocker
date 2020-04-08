import ReactDOM from "react-dom";
import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

window.addEventListener("load", main, false);
var isLoaded = false;

const e = React.createElement;

var comments = [];

function AAA() {
  return <Button variant="contained">Hello World</Button>;
}

function MyCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="subtitle1" component="h3">
          このコメントはブロックされました。理由：ＮＧユーザー
        </Typography>
      </CardContent>
    </Card>
  );
}

function BanButton(props) {
  return (
    <Button
      id="banButton"
      label="Sign in"
      color="primary"
      variant="contained"
      className="sample"
      onClick={(e) => {
        resisterNGUser(props.comment);
        //setBannedText(props.comment);
      }}
    >
      このユーザーをブロック
    </Button>
  );
}

function MyProgress() {
  return <CircularProgress />;
}

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return "You liked this.";
    }

    return e(
      "button",
      { onClick: () => this.setState({ liked: true }) },
      "Like"
    );
  }
}

function main(e) {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  function jsLoaded() {
    isLoaded = true;

    const observer = new MutationObserver((render) => {
      const addedNodes = render[0].addedNodes;
      addedNodes.forEach((commentThread) => {
        const commentRenderers = commentThread.getElementsByTagName(
          "ytd-comment-renderer"
        );
        const mainCommentRender = commentThread.children[0];
        const mainComment = mainCommentRender.children[0].children[1];
        const comment = mainComment.innerText;

        if (comments.includes(comment)) return;

        setButton(mainCommentRender);

        blockCommentInNeed(mainCommentRender);

      });
    });
    var renderer = document.getElementsByTagName("ytd-item-section-renderer")[0]
      .children[2];
    observer.observe(renderer, {
      childList: true,
    });
  }
}

function setButton(mainCommentRender) {
  var button = mainCommentRender.getElementsByTagName("yt-icon-button")[2];
  button.style.position = "relative";
  button.style.marginLeft = "auto";

  var menu = mainCommentRender.children[0].children[2];
  menu.style.position = "relative";

  var div = document.createElement("div");
  if (menu != null) menu.appendChild(div);
  ReactDOM.render(<BanButton comment={mainCommentRender}></BanButton>, div);

  div.style.display = "none";

  menu.onmouseover = () => {
    div.style.display = "block";
  };
  menu.onmouseout = () => {
    div.style.display = "none";
  };
  menu.style.align = "right";
  button.style.align = "right";
}

function resisterNGUser(commentRenderer) {
  const userName = getUserName(commentRenderer);
  chrome.storage.sync.get(["NGUserNames"], (items) => {
    var NGUserNames = items.NGUserNames;
    if (!NGUserNames) NGUserNames = [];
    console.log(NGUserNames);
    NGUserNames.push(userName);
    chrome.storage.sync.set({
      NGUserNames: NGUserNames,
    });
  });
}

function blockCommentInNeed(commentRenderer) {
  const userName = getUserName(commentRenderer);
  chrome.storage.sync.get(["NGUserNames"], (items) => {
    const NGUserNames = items.NGUserNames;
    console.log(userName);
    if (NGUserNames.includes(userName)) {
      blockComment(commentRenderer);
    }
  });
}

function getUserName(commentRenderer) {
  return commentRenderer.querySelector("#author-text").innerText;
}

function blockComment(commentRenderer) {
  ReactDOM.render(<MyCard />, commentRenderer);
}

function onClick() {
  console.log("clicked");
}

function onBanButtonClick() {
  window.alert("blocked!");
}
