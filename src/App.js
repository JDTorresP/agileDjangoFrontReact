import React, { Component } from 'react';
import './App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Gallery from './components/gallery.jsx'

import axios from 'axios';
import User from './components/models/User.js'


const pathToMedia='';
class App extends Component {
   
   state = { 
    videos: [],
    loggedIn: false,
    currentUser: null,
    auth: true,
    openSignIn: false,
    openSignUp: false
    };
  
  getUser = (id) => {
    
  };
  componentDidMount() {
    axios.get(pathToMedia)
      .then(res => {
        console.log(res);
        const media = res.data;
        this.setState({videos:media});
        console.log(this.state.videos);
      })
  }

  render() {

    return (
      <div className="App">
       <Header/>
       <Gallery videos={this.state.videos}/>
       {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
