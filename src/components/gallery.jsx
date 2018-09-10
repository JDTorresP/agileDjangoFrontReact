import React, { Component, Fragment } from 'react';

// Grid list for videos
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';



class Gallery extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            swi: window.innerWidth,
            categories: []
         };
    }

    getEmbebedURL= (url) => {
        let res;
        if(!url.includes('youtube')){
            res=url;
        }else{
            if (!url.includes("embed")){
                res= 'https://youtube.com/embed/'+url.split('?v=')[1]
            }
            else
                res='https://youtube.com/embed/'+ url;
        }
        return res;
    }

    render() {
        let v;
        if (Array.isArray(this.props.videos)){
            v=(<Fragment>
                {this.props.videos.map((t, i) => (
                    <GridListTile key={t + i}>
                    <iframe width="100vw" height="300"
                            src={this.getEmbebedURL(t.fields.url)} frameBorder="0"
                            allow="autoplay; encrypted-media" allowFullScreen
                            style={{width: 500,
                                height: 450,}}/>
                    
                    </GridListTile>
            ))}</Fragment>
            );}
        else{
            v=(<Fragment>
                <br/>  <br/>
                Theres no videos Yet!

                </Fragment>
            );
        }
        return (
            <GridList cellHeight={300} style={{display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            overflow: 'hidden',}} cols={2}>
             {v}  
            </GridList>

        );
    }
}

export default Gallery;