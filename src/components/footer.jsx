import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 0,
          };
    }
    handleChange = (event, value) => {
        this.setState({ value });
      };

    render() {
        return (
            <Paper style={{flexGrow: 1,}}>
            <Tabs
              value={this.state.value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three" />
            </Tabs>
          </Paper>

          
        );
    }
}

export default Footer;