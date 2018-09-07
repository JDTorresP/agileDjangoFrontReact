import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';



class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            
         };
    }

    render() {
        return (
            <Grid container justify="flex-end" alignItems="stretch">
                <Grid item sm>
                Video list
                </Grid> 
            </Grid>
        );
    }
}

export default Gallery;