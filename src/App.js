import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Header from "./components/Header";
import covers from "./covers.json";
import "./App.css";

class App extends Component {
  state = {
    covers,
    score: 0,
    highscore: 0
  };

  gameOver = () => {
    if (this.state.score > this.state.highscore) {
      this.setState({highscore: this.state.score}, function() {
        console.log(this.state.highscore);
      });
    }
    this.state.covers.forEach(cover => {
      cover.count = 0;
    });
    alert(`Game Over :( \nscore: ${this.state.score}`);
    this.setState({score: 0});
    return true;
  }

  clickCount = id => {
    this.state.covers.find((o, i) => {
      if (o.id === id) {
        if(covers[i].count === 0){
          covers[i].count = covers[i].count + 1;
          this.setState({score : this.state.score + 1}, function(){
            console.log(this.state.score);
          });
          this.state.covers.sort(() => Math.random() - 0.5)
          return true; 
        } else {
          this.gameOver();
        }
      }
    });
  }
  // Map over this.state.cards and render a cardCard component for each card object
  render() {
    return (
      <Wrapper>
        <Header score={this.state.score} highscore={this.state.highscore}>Clicky Game</Header>
        {this.state.covers.map(cover => (
          <Card
            clickCount={this.clickCount}
            id={cover.id}
            key={cover.id}
            image={cover.image}
          />
        ))}
      </Wrapper>
    );
  }
}

export default App;
