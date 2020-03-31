import ReactDOM from "react-dom";
import React from "react";
import { Button, CircularProgress } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

window.addEventListener("load", main, false);
var isLoaded = false;
// var commentsField = document.getElementsByTagName('ytd-item-section-renderer').getElementsByTagName();

const e = React.createElement;

function AAA() {
  return <Button variant="contained">Hello World</Button>;
}

function MyCard() {
  // return <h1>これはwwwwだめだぁ…</h1>;
  return (
      <Card>
      <CardContent>
        <Typography variant="h10" component="h3">
          このコメントはブロックされました。理由：ＮＧユーザー
        </Typography>
      </CardContent>
    </Card>
  );
}

function MyProgress() {
  return <CircularProgress />
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

console.log("nonedsadasdasdadssanisitat!!!!!");

function banCommentInNeed(comment){
  return new Promise(resolve => {
    // try{
    //   comment.
    //   resolve();
    // }catch{

    // }
    setTimeout(() =>{
      setBannedText(comment);
    }, 500)
  })
}

function main(e) {
  const jsInitCheckTimer = setInterval(jsLoaded, 1000);
  function jsLoaded() {
    // if (isLoaded) return;
    isLoaded = true;

    const observer = new MutationObserver((render) => {
      console.log(render);
//      if (render[0].attributeName != 'can-show-more') return;



      let target = render[0].target;

      const addedNodes = render[0].addedNodes;

      addedNodes.forEach(node => {
        setBannedText(node)
      })

      // let loadedComments = target.getElementsByTagName('ytd-comment-thread-renderer');
      // Array.prototype.forEach.call(loadedComments, comment => {
      //   setBannedText(comment)
      // })


      // let myPromise = new Promise((resolve) => {
      //   setTimeout(() => {
      //     let loadedComments = target.getElementsByTagName('ytd-comment-thread-renderer');
      //     Array.prototype.forEach.call(loadedComments, comment => {
      //       setBannedText(comment);
      //     })
      //     resolve("AA!!")
      //   }, 500)
      // })

      // myPromise.then((successMessage) => {
      //   render[0].target.style.display = "block";
      //   console.log("Yay! " + successMessage)
      // });

      // let loadedComments = target.getElementsByTagName('ytd-comment-thread-renderer');
      // Array.prototype.forEach.call(loadedComments, comment => {
      //   setBannedText(comment);
      // })
      // render[0].target.style.display = "block";
      
      //const target2 = target.cloneNode(true);
       
      //ReactDOM.render(<CircularProgress />, target);

      //render[0].target.style.display = "block";
      //ReactDOM.render(target2, target);
      
      //この段階でリストを作る
      console.log(render[0].target);
      //onCommentsLoad();
    });
    var renderer = document.getElementsByTagName(
      "ytd-item-section-renderer"
    )[0].children[2];
    //console.log(renderer);
    observer.observe(renderer, {
      //attributes: true,
      childList: true,
      //characterData: true
      //subtree: true
    });
  }
}

function onCommentsLoad() {

  var comments = document.getElementsByTagName("ytd-comment-renderer");
  var buttons = document.getElementsByClassName(
    "dropdown-trigger style-scope ytd-menu-renderer"
  );

  Array.prototype.forEach.call(comments, comment => {
    var button = comment.getElementsByTagName("yt-icon-button")[2];
    // var banButton = document.createElement("button");
    // banButton.innerText = "このユーザーをブロック";
    // banButton.className = "sample btn btn-primary";
    //if (button != null) button.appendChild(banButton);

    // var div = document.createElement("div");
    // div.innerHTML = "OOOOOO!!!!!";
    // div.className = "card";
    // console.log(div.textContent);

    var aaa = React.createElement("span", null, "hello world!");

    ReactDOM.render(<MyCard />, comment);

    // comment.innerHTML =
    //   '<Button color="primary">Hello World</Button>';
  });
}

function setBannedText(comment){
  ReactDOM.render(<MyCard />, comment);
}

function onClick() {
  console.log("clicked");
}

function onBanButtonClick() {
  window.alert("blocked!");
}
