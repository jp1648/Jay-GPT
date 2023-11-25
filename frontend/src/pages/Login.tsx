import { Box, Button, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import CustomizedInput from '../components/shared/CustomizedInput'
import { IoIosLogIn} from'react-icons/io'
import { useAuth } from '../context/AuthContext'
import {toast}  from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const handleSubmit = async(event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      try {
        toast.loading("Signing in...", {id: "login"});
        await auth?.login(email,password);
        toast.success("Logged in", {id:"login"});
      } catch (error) {
        console.log(error);
        toast.error("Login Failed", {id:"login"});
      } 
  };

  useEffect(() => {
    if (auth?.user) {
      return navigate("/chat") 
    }


  },[auth])

  return (
    <Box width = {'100%'} height = {'100%'} display = "flex" flex={1}>
      <Box padding = {8} mt ={8} display={{md:"flex", sm:"none", xs:"none"}}>
        { <img src= "airobot.png" alt="Robot" style = {{width:"2350 px"}} /> }
      
      </Box>
        <Box 
          display = {'flex'} 
          flex = {{xs:1, md:0.5}} 
          justifyContent={'center'} 
          alignItems={"center"} 
          padding={2} 
          ml={"auto"} 
          mt={16}
          >
            <form 
            onSubmit={(handleSubmit)}
            style={{margin:'auto', 
            padding:'30px', 
            boxShadow: "10px 10px 20px #000", 
            borderRadius: "10px", 
            border: "none"}}
            >
              <Box 
                sx={{
                    display: "flex", 
                    flexDirection:"column", 
                    justifyContent: "center",
                }}
            >
              <Typography 
              variant='h4' 
              textAlign="center" 
              padding={2} 
              fontWeight={600}
            >Login
            </Typography>
            <CustomizedInput type = "email" name = "email" label = "email"/>
            <CustomizedInput type = "password" name = "password" label = "password"/>
            <Button 
              type='submit' 
              sx = {{
                px:2,
                py:1,
                mt:2,
                width:"500px",
                borderRadius:2, 
                bgcolor: "#00fffc",
                ":hover" : {
                  bgcolor: "white", 
                  color:"black"
                },
                }}
                endIcon ={<IoIosLogIn/>}
            >
              Login
            </Button>
            </Box>
            </form>
        </Box>


    </Box>
  )
}

export default Login