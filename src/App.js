import React, { Component } from 'react';
import './App.css';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Gallery from './components/gallery.jsx'

import axios from 'axios';

let bupB=[];
const pathToMedia='https://radiant-badlands-50472.herokuapp.com/media/';
class App extends Component {
   
   state = { 
    videos: [],
    videosBkup: [],
    loggedIn: false,
    currentUser: null,
    auth: true,
    openSignIn: false,
    openSignUp: false
    };

    unfilterList=() =>{
        this.setState({
            videos:bupB
        });
    }
    filterList=() =>{
      let nv=[], mkl = bupB;
      mkl.map((t, i) => {
        if(!t.fields.url.includes('youtube')){
          nv.push(t);
        };
      });
        this.setState({
            videos:nv
        });
    }
     filterV=() =>{
      let nv=[],mkl=bupB;
      mkl.map((t, i) => {
        if(t.fields.url.includes('youtube')){
          nv.push(t);
        };
      });
        this.setState({
            videos:nv
        });
    }
  componentDidMount() {
    axios.get(pathToMedia)
      .then(res => {
        console.log(res);
        const media = res.data;
        this.setState({videos:media,videosBkup:media});
        bupB=media;
        console.log('VIDEOS',this.state.videos);
      })
  }

  render() {

    return (
      <div className="App">
       <Header unfilter={this.unfilterList} filterV={this.filterV} filter={this.filterList}/>
       <Gallery videos={this.state.videos}/>
       {/* <Footer/> */}
      </div>
    );
  }
}

export default App;
