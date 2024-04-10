import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';
import ContentPasteOutlinedIcon from '@mui/icons-material/ContentPasteOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import { Avatar, Button } from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import ofpptIcon from "../assets/icons/ofppt-high-resolution-logo-transparent 2.svg"


const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': {...openedMixin(theme), backgroundColor: 'rgba(31, 148, 128, 1)'},
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': {...closedMixin(theme), backgroundColor: 'rgba(31, 148, 128, 1)'},
    }),
  }),
);



export default function Layout(props) {

  useEffect(()=>{
    const isLogged = JSON.parse(localStorage.getItem('isLogged'))
    if(!isLogged) {
      navigate('/')
    }
    // navigate('/directeur/statistique')
  })

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate()
  // const [personnelName, setPersonnelName] = useState('')
  // const [personnelRole, setPersonnelRole] = useState('')
  const personnelName = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).nom : ""
  const personnelRole = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).fonction : ""
  const personnelPrenom = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')).prenom : ""

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   let personnelData = JSON.parse(localStorage.getItem('token'));
  //   setPersonnelName(personnelData.nom)
  //   setPersonnelRole(personnelData.fonction)
  // }, [personnelName, personnelRole])

  return (
    <Box sx={{ display: 'flex'}}>
      <CssBaseline />
      <AppBar position="fixed" open={open} style={{backgroundColor : "rgba(231, 233, 236, 1)"}}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            {/* <MenuIcon sx={{color : "rgba(67, 109, 119, 1)"}}/> */}
            <img src={ofpptIcon} alt="Logo OFPPT" width={50} height={48.2} style={{height : "50" , marginLeft : "-13px", paddingBottom:"10px"}} />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* {['Statistiques', 'Gestion Formateurs', 'Gestion Mod/Grp/Filière', 'Gestion EFMs', 'Audit'].map((text, index) => ( */}
            <ListItem key={"Statistiques"} disablePadding sx={{ display: 'flex', }}>
              <ListItemButton
                onClick={()=>{
                  navigate("/directeur/statistique")
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <DonutLargeOutlinedIcon/>
                </ListItemIcon>
                <ListItemText 
                  primary={"Statistiques"} 
                  sx={{ 
                    opacity: open ? 0.85 : 0 , 
                    color : 'white',
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Gestion Formateurs"} disablePadding sx={{ display: 'flex', }}>
              <ListItemButton
                onClick={()=>{
                  navigate("/directeur/gestionFormateurs/Liste")
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <PersonOutlineOutlinedIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={"Gestion Formateurs"} 
                  sx={{ 
                    opacity: open ? 0.85 : 0 , 
                    color : 'white',
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Gestion Mod/Grp/Filière"} disablePadding sx={{ display: 'flex', }}>
              <ListItemButton
                onClick={()=>{
                  navigate("/directeur/gestionModFilGrp/Filiere")
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <SchoolOutlinedIcon />
                  {/*
                  {index === 3 && <ContentPasteOutlinedIcon />}
                  {index === 4 && <InventoryOutlinedIcon />} */}
                </ListItemIcon>
                <ListItemText 
                  primary={"Gestion Mod/Grp/Filière"} 
                  sx={{ 
                    opacity: open ? 0.85 : 0 , 
                    color : 'white',
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Gestion EFMs"} disablePadding sx={{ display: 'flex', }}>
              <ListItemButton
                onClick={()=>{
                  navigate("/directeur/gestionEFM")
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <ContentPasteOutlinedIcon />
                  {/*
                  {index === 4 && <InventoryOutlinedIcon />} */}
                </ListItemIcon>
                <ListItemText 
                  primary={"Gestion EFMs"} 
                  sx={{ 
                    opacity: open ? 0.85 : 0 , 
                    color : 'white',
                  }} 
                />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Audit"} disablePadding sx={{ display: 'flex', }}>
              <ListItemButton
                onClick={()=>{
                  navigate("/directeur/Audit")
                }}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 2 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <InventoryOutlinedIcon />
                </ListItemIcon>
                <ListItemText 
                  primary={"Audit"} 
                  sx={{ 
                    opacity: open ? 0.85 : 0 , 
                    color : 'white',
                  }} 
                />
              </ListItemButton>
            </ListItem>
            
          {/* ))} */}
          <div style={{ display: 'flex', height: '85%', justifyContent: 'flex-end', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
              <Avatar 
                sx={{ 
                  bgcolor : "white", 
                  color : "teal", 
                  marginLeft: open ? '33px' : "13px", 
                  marginTop: open ? '0' : "-6px" 
                }}
              >
                {personnelPrenom[0].toLocaleUpperCase()}
              </Avatar>
              {open && <span style={{ color: 'white', marginLeft: '10px' }}>
                        {personnelRole === "formateur" ? "Formateur. " : ""}
                        {personnelRole === "directeur" ? "Directeur. " : ""}
                        {personnelRole === "directeur complexe" ? "Dir. Complexe  " : ""}
                        {personnelName.toLocaleUpperCase()}
                      </span>
              }
            </div>
            {open && (
              <Button 
                onClick={()=>{
                  localStorage.removeItem('token');
                  localStorage.setItem('isLogged', 'false')
                  navigate('/')
                }}
                variant="filled" 
                startIcon={<LogoutOutlinedIcon />} 
                sx={{ 
                  backgroundColor: 'transparent',
                  width: '210px', 
                  color: 'white', 
                  margin: '0 auto', 
                  "border" : "1.5px solid rgba(255, 255, 255, 0.5)" 
                }}
              >
                Log out
              </Button>
            )}
          </div>
        </List>
      </Drawer>
      {/* render components here */}
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1,
        }}
      >
        <DrawerHeader />
          {props.children ? props.children : "not found"}
      </Box>
    </Box>
  );
}

