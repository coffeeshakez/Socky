import React, { Component } from "react";
import { Button, Container } from "reactstrap";
import { socket } from "../global/header";
class PlaceOrder extends Component {
  constructor() {
    super();
    this.state = {
      food_data: [],
      test: {},
      gameState: {},
      winner: "",
      gameOver: false,
      // this is where we are connecting to with sockets,
    };
  }
  getData = items => {
    console.log("neger", items);

    this.setState({ gameState: items });
  };

  gameOver = items => {
    console.log("game over, winner: ", items);
    this.setState({ gameOver: true, winner: items });
  }
  componentDidMount() {
    socket.emit("initial_data");
    var state_current = this;
    socket.on("get_data", state_current.getData);
    socket.on("test_received", state_current.getData);
    socket.on("winner", state_current.gameOver);
  }
  
  componentWillUnmount() {
    socket.off("get_data", this.getData);
  }
  //Function to place the order.
  sendOrder = id => {
    var order_details;
    this.state.food_data.map(food => {
      if (food._id == id) {
        order_details = food;
      }
      return food;
    });
    console.log(order_details);
    socket.emit("putOrder", order_details);
    var new_array = this.state.food_data.map(food => {
      food.order = 0;
      return food;
    });
    this.setState({ food_data: new_array });
  };
  // Changing the quantity in the state which is emitted to the backend at the time of placing the order.
  changeQuantity = (event, foodid) => {
    if (parseInt(event.target.value) < 0) {
      event.target.value = 0;
    }
    var new_array = this.state.food_data.map(food => {
      if (food._id == foodid) {
        food.order = parseInt(event.target.value);
      }
      return food;
    });
    this.setState({ food_data: new_array });
  };
  // To get the initial data
  getFoodData() {
    return this.state.food_data.map(food => {
      return (
        <tr key={food._id}>
          <td> {food.name} </td>
          <td>
            <input
              onChange={e => this.changeQuantity(e, food._id)}
              value={food.order}
              type="number"
              placeholder="Quantity"
            />
          </td>
          <td>
            <Button onClick={() => this.sendOrder(food._id)}>Order</Button>
          </td>
        </tr>
      );
    });
  }

  test() {
    socket.emit("test");
  }

  render() {
    return (
      <Container>

        <button onClick={this.test}> Test </button>

        <div className="pullTheRopeContainer">

          {Object.entries(this.state.gameState).map(([key, value], index) => {

            return (
              <div className="rope" style={{ width: ((100 + value) / 2) + "%", backgroundColor: `#${value}f3` }} key={index}> {value}  {key} </div>
            )
          })}

        </div>

        {this.state.gameOver && <h1> WINNER: {this.state.winner} </h1>}



      </Container>
    );
  }
}
export default PlaceOrder;
