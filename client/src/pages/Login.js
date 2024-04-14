import '../styles/Login.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Typography } from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Link from '@mui/material/Link';
import ofpptImage from '../assets/icons/ofpptLogo.png'
import { useNavigate } from 'react-router-dom'


function Login() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [auth, setAuth] = useState({
    "CIN" : "",
    "motDePasse" : ""
  });
  const navigate = useNavigate()

  useEffect(()=>{
    const isLogged = JSON.parse(localStorage.getItem('token'))
    if(isLogged) {
      navigate('/directeur/statistique')
    }
    navigate('/')
  }, [navigate])

  const handleLogIn = (e) => {
    e.preventDefault();
    axios.post('http://localhost:7000/Login', auth)
    .then((res)=>{
      localStorage.setItem('token', JSON.stringify(res.data))
      localStorage.setItem('isLogged', 'true')
      console.log(JSON.parse(localStorage.getItem('token')))
      navigate('/directeur/statistique')
    })
    .catch((err) => {
      alert(err.response.data.message)
    })
    setAuth({"CIN" : "", "motDePasse" : ""})
  }


  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <div className='login'>
      <div className='container'>
        <div className='leftSide'>
          <form onSubmit={handleLogIn}>
            <Box 
              // sx={{backgroundColor : "red"}}
              display = "flex" 
              flexDirection = {"column"} 
              alignItems="center"
              justifyContent={"center"} 
              paddingTop={"55px"}
              maxWidth={400}
            >
              <Typography 
                variant='h5' 
                color={"rgba(231, 233, 236, 1)"}
                sx={{
                  marginBottom : "20px",
                }}
              >
                Log In
              </Typography>
              <TextField 
                onChange={(e)=>{setAuth({...auth, "CIN" : e.target.value})}}
                value={auth.CIN}
                label="CIN" 
                id="outlined-size-normal" 
                sx={{ 
                  m: 1, 
                  marginBottom : "20px",
                  width: '31ch',
                  '& .MuiOutlinedInput-root': {
                    '&:hover fieldset': {
                      borderColor: "rgba(231, 233, 236, 1)", // Couleur de l'outline lors du survol
                    },
                    '& fieldset' : {
                      borderColor: "rgba(231, 233, 236, 0.5)"
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "rgba(231, 233, 236, 1)", // Couleur de l'outline lorsqu'en focus
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'rgba(231, 233, 236, 1)', // Couleur du texte dans le TextField
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: "rgba(231, 233, 236, 1)", // Couleur du label lorsqu'en focus
                  },
                  '& .MuiInputLabel-root': {
                    color: "rgba(231, 233, 236, 0.8)",
                  },
                }}
              />
              <FormControl 
                variant="outlined"
                sx={{ 
                  m: 1, 
                  "&::selection" : {
                    color : 'red'
                  },
                  width: '31ch',
                  '& .MuiOutlinedInput-root': {
                    '& fieldset' : {
                      borderColor: "rgba(231, 233, 236, 0.6)"
                    },
                    '&:hover fieldset': {
                      borderColor : "white",
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: "rgba(231, 233, 236, 1)", // Couleur de l'outline lorsqu'en focus
                    },
                    '& .MuiOutlinedInput-input': {
                      color: 'white', // Couleur du texte dans le TextField
                    },
                  },
                  '& .MuiInputLabel-root.Mui-focused': {
                    color: "rgba(231, 233, 236, 1)", // Couleur du label lorsqu'en focus
                  },
                  '& .MuiInputLabel-root': {
                    color: "rgba(231, 233, 236, 0.8)",
                  },
                }}
              >
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                  onChange={(e)=>{setAuth({...auth, "motDePasse" : e.target.value})}}
                  value={auth.motDePasse}
                  id="outlined-adornment-password"
                  type={showPassword ? 'text' : 'password'}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color='white'
                      >
                        {showPassword ? <VisibilityOff/> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
              </FormControl>
              <Link
                component="button"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Merci de contacter la Direction !");
                }}
                color={'rgb(255, 255, 255)'}
                sx={{
                  marginRight : "144px",
                  marginTop : "-6px",
                  fontSize : "12.5px",
                  marginBottom : "15px"
                }}
              >
                Mot de passe oublié ?
              </Link>
              <Button 
                type='submit'
                variant="contained" 
                endIcon={<LoginOutlinedIcon />}
                sx={{
                  backgroundColor : 'rgba(31, 148, 128, 1)',
                  width: '32ch',
                  height : '50px',
                  marginTop : '20px',
                  "&:hover" : {
                    backgroundColor : 'rgba(31, 138, 128, 1)'
                  }
                }}
                >
                Se connecter
              </Button>
            </Box>
          </form>
        </div>
        <div className='rightSide'>
          <div style={{"color" : 'black', marginLeft : "53.5%", marginTop : "75px"}}>
            <img src={ofpptImage} width={240} height={240} alt='not found'/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
