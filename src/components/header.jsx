import React, { Component, Fragment } from 'react';
//App bar imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

//Dialogs imports
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//Drawer imports
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
//import Divider from '@material-ui/core/Divider';

//List imports for drawer

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideocamIcon from '@material-ui/icons/Inbox';


//axios import
import axios from 'axios';

const pathToLogin ='https://radiant-badlands-50472.herokuapp.com/login/', pathToIsLoggued='https://radiant-badlands-50472.herokuapp.com/isLogged/',
pathToLogOut='https://radiant-badlands-50472.herokuapp.com/logout/',pathToAddUser='https://radiant-badlands-50472.herokuapp.com/addUser/';

class Header extends Component {
    constructor(props) {
        super(props);
        //State of the component to manage all data

        this.state = { 
            name:'',
            pass:'',
            open: false,
            openmsg: false,
            title:'Log in',
            signup:false,
            openDrawer: false,
            msgResp:'',
            buttonTxt:'Login',
            isLoggued:false,
            first_name:'',
            last_name:'',
            image:'',
            country:'',
            username:'',
            email:'',
            city:''
         };
    }

    //Class expressions to handle events changes
    handleClickOpen = () => {this.setState({ open: true });};
    handleClickOpenDrawer = () => {this.setState({ openDrawer: true });};
    handleClickCloseDrawer = () => {this.setState({ openDrawer: false });};
    handleClose = () => {this.setState({ open: false, title: 'Log in', signup:false });};
    handleClosemsg = () => {this.setState({ openmsg: false });};
    handleOpenmsg = () => {this.setState({ openmsg: true });};
    handleLoggedDone = () => {this.setState({ buttonTxt: this.state.name+' - Log out', isLoggued:true});};
    handleChangemsg = (m) => { this.setState({ msgResp: m });};
    handleSignup = () => {this.setState({ title: 'Sign up',  signup:true});};
    handleSignuptoLogin = () => {this.setState({ title: 'Log in',  signup:false});};
    changeN = (n) => { this.setState({name:n.target.value})};
    changeC = (c) => {this.setState({pass:c.target.value})};
    changeUsn = (n) => { this.setState({username:n.target.value})};
    changeImg = (n) => { this.setState({image:n.target.value})};
    changeEmail= (n) => { this.setState({email:n.target.value})};
    changeCity= (n) => { this.setState({city:n.target.value})};
    changeCountry= (n) => { this.setState({country:n.target.value})};
    changeLN= (n) => { this.setState({last_name:n.target.value})};
    changeFN= (n) => { this.setState({first_name:n.target.value})};


    handleAddUser =() =>{
        let ps={
            username:this.state.username  ,first_name:this.state.first_name ,last_name:this.state.last_name ,password:this.state.pass ,email:this.state.email ,
                                        custom: {
                                            country:this.state.country ,
                                            city: this.state.city,
                                            image: this.state.image
                                        }
          };
        axios.post(pathToAddUser,ps
        )
        .then(res => {
        console.log(res);
        const stat = res.status;
        console.log('sevraResp',stat)
        if (stat===200){
            console.log('entro papeh')
            this.handleClose();
        }
        })}
    componentWillMount(){
        axios.get(pathToIsLoggued)
        .then(res => {
        console.log(res);
        const media = res.data;
        console.log('EstaLogueado?'+media.mensaje);
        if (media.mensaje==='ok'){
            this.setState({
            buttonTxt:'LogOut',
            isLoggued:true
            });
        }

        })
    }
    logOut = ()=>{
        console.log('logout')
        axios.get(pathToLogOut)
        .then(res => {
        console.log(res);
        const media = res.data;
        if (media.mensaje==='ok'){
            this.setState({
            buttonTxt:'Log in',
            isLoggued:false
            });
        }

        })
    }

    login = () => {
        axios.post(pathToLogin,{
            username: this.state.name,
            password: this.state.pass
          })
        .then(res => {
        console.log(res);
        const media = res.data;
        if (media.mensaje==='ok'){
            this.handleLoggedDone();
            this.handleChangemsg('Bienvenido');
            this.handleClose();
        }else{
            this.handleChangemsg(media.mensaje);
        }
        this.handleOpenmsg();
        console.log('ISLOGGUED'+this.state.isLoggued)
        })
    };
    
    render() {
        // Handle variables signup & options on dialog
        let signup,opt, sideList, msgDialog,btnLog ;
        if(!this.state.isLoggued){
            btnLog=(
                <Button color="inherit" align='right' onClick={this.handleClickOpen}>{this.state.buttonTxt}</Button>
            )
        }else{
            btnLog=(
                <Button color="inherit" align='right' onClick={this.logOut}>{this.state.buttonTxt}</Button>
            )
        }
        msgDialog=(
            <Fragment>
                 <Dialog
                    open={this.state.openmsg}
                    onClose={this.handleClosemsg}
                    aria-labelledby="form-dialog-title"
                    >
                    <DialogTitle id="form-dialog-title" align='center'>{this.state.msgResp}</DialogTitle>
    
                </Dialog>
            </Fragment>
        )
        sideList=(
            <div style={{width: 250,}}>
                <List component="nav">
                    <ListItem button>
                    <ListItemIcon>
                        <VideocamIcon />
                    </ListItemIcon>
                    <ListItemText primary="Gallery" />
                    </ListItem>
                    <ListItem button>
                    <ListItemIcon>
                        <VideocamIcon />
                    </ListItemIcon>
                    <ListItemText primary="Audios" />
                    </ListItem>
                </List>
            </div>
        );
        if(!this.state.signup){
            signup =(
                <Fragment>
                <TextField required autoFocus margin="dense" id="name" label="Username" type="text" fullWidth onChange={e=>this.changeN(e)} />
                <TextField required margin="dense" id="pass" label="password" type="password" fullWidth onChange={e=>this.changeC(e)} />
                </Fragment>
            );
            opt =(
                <Fragment>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button color="primary" onClick={this.login}>{this.state.title}</Button>
                </DialogActions>
                <Button onClick={this.handleSignup} color="primary">Create Account</Button>
                <Button onClick={this.handleClose} color="primary">Did you forgot your password?</Button>
                </Fragment>
            );

        }else{
            signup =(
                <Fragment>
                <TextField required autoFocus margin="dense" id="first_name" label="First Name" type="text" fullWidth onChange={ e =>this.changeFN(e)}/>
                <TextField  required margin="dense" id="last_name" label="Last Name" type="text" fullWidth onChange={e=>this.changeLN(e)}/>
                <TextField  required margin="dense" id="image" label="Link to image" type="text" fullWidth onChange={e=>this.changeImg(e)}/>
                <TextField  required margin="dense" id="country" label="Country" type="text" fullWidth onChange={e=>this.changeCountry(e)}/>
                <TextField  required margin="dense" id="city" label="city" type="text" fullWidth onChange={e=>this.changeCity(e)}/>
                <TextField  required margin="dense" id="email" label="Email Address" type="email" fullWidth onChange={e=>this.changeEmail(e)}/>
                <TextField  required margin="dense" id="username" label="username" type="text" fullWidth onChange={e=>this.changeUsn(e)}/>
                <TextField  required margin="dense" id="pass" label="password" type="password" fullWidth onChange={e=>this.changeC(e)}/>
                </Fragment>
            );
            opt =(
                <Fragment>
                <DialogActions>
                <Button onClick={this.handleClose} color="primary">Cancel</Button>
                <Button onClick={this.handleAddUser} color="primary">{this.state.title}</Button>
                </DialogActions>
                <Button onClick={this.handleSignuptoLogin} color="primary">Login</Button>
                <Button onClick={this.handleClose} color="primary">Did you forgot your password?</Button>
                </Fragment>
            );
        }
        return (
        //App bar render
        <AppBar position="static">
            <Drawer open={this.state.openDrawer} onClose={this.handleClickCloseDrawer}>
            <div
                tabIndex={0}
                role="button"
                onClick={this.handleClickCloseDrawer}
                onKeyDown={this.handleClickCloseDrawer}
            >
                {sideList}
            </div>
            </Drawer>
            <Toolbar>
            <IconButton styles={{marginLeft: -12, marginRight: 20,}} color="inherit" aria-label="Menu" onClick={this.handleClickOpenDrawer}>
                <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit" style={{ flexGrow: 1,}}>
                Gallery 
            </Typography>
            {btnLog}
            </Toolbar>

        {/* Dialog render with variables signup and options */}

            <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
            >
            <DialogTitle id="form-dialog-title" align='center'>{this.state.title}</DialogTitle>
            <DialogContent>
                {signup}
            </DialogContent>
                {opt}
            </Dialog>
            {msgDialog}
        </AppBar>
        
        );
    }
}

export default Header;