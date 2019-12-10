import React from 'react';
import './App.css';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {},
      locations: ["bangalore", "GOA"],
      config: "bedcfc9b0d44118b9f60040b473ac650"
    }
    this.categories = [];
  }

  componentDidMount() {
    (async () => {
      const {config} = this.state;
      let catArr = []
      const categories = await axios.get(`https://developers.zomato.com/api/v2.1/categories`,
        { headers: { 'user-key': config } })
        categories.data.categories.map(val => catArr.push(val.categories))
      this.setState({
        categories: catArr
      })
    })();
  }

  handleSelect = (e, type) => {
    const {config} = this.state;
    (async () => {
      if(type === "location") {
        let place = e.target.value;
        const locationResponse = await axios.get(`https://developers.zomato.com/api/v2.1/locations?query=${place}`,
        { headers: { 'user-key': config } })
      this.setState({
        place: locationResponse.data.location_suggestions[0]
      })
      } else if(type === "category" ) {
        
        this.categories.push(e.target.value);
        this.setState({ categories: this.categories})
      }
      
    })();
  }

  render() {
    const { locations, categories} = this.state;
    return (
      <div className="App">
        <select onChange={(e) => this.handleSelect(e,"location")}>
          {locations.map(val => {
            return <option value={val}>{val}</option>
          })}
        </select>
        <div></div>
        <select multiple onChange={(e) => this.handleSelect(e,"category")}>
          {categories && categories.map(val => {
            return <option value={val.name}>{val.name}</option>
          })}
        </select>


      </div>
    );
  }
}

export default App;
