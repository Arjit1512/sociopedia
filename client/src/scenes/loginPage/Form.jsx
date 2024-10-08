import { useState } from "react";
import { Box, Button, TextField, useMediaQuery, Typography, useTheme } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";
import { API_BASE_URL } from '../../Config.js';
import axios from 'axios';


const registerSchema = yup.object().shape(  /*ADE RA MANAM EDIANA FORM FILLUP CHESETAPUD EDAINA MISS CHESTE " *required " ANI VASTHAD KADA DAANI KOSAM*/
    {
        firstName: yup.string().required("required"),
        lastName: yup.string().required("required"),
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
        location: yup.string().required("required"),
        occupation: yup.string().required("required"),
        picture: yup.string().required("required"),

    }
);

const loginSchema = yup.object().shape(  /*ADE RA MANAM EDIANA FORM FILLUP CHESETAPUD EDAINA MISS CHESTE " *required " ANI VASTHAD KADA DAANI KOSAM*/
    {
        email: yup.string().email("invalid email").required("required"),
        password: yup.string().required("required"),
    }
);

const initialValuesRegister ={
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
}

const initialValuesLogin ={
    email: "",
    password: "",
}


const Form = () => {
    const [pageType, setPageType] = useState("login");
    const { palette } = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";
    axios.defaults.withCredentials = true;
    console.log("API Base URL: ", API_BASE_URL);


    const register = async(values,onSubmitProps) => {
        //this allows us to send form info with image
       const formData = new FormData();
       for(let value in values){
        formData.append(value,values[value]);
       }
       formData.append("picturePath",values.picture.name);

       const savedUserResponse = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
            method:"POST",
            body:formData,
        }
       );
       const savedUser = await savedUserResponse.json();
       onSubmitProps.resetForm();

       if(savedUser) {
        setPageType("login");
       }
    };

        const login = async (values,onSubmitProps) => {
        const loggedInResponse = await fetch(
        `${API_BASE_URL}/auth/login`, 
        {
           method: "POST",
           headers: { "Content-Type": "application/json" },
           body: JSON.stringify(values),
        });
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();
        
        
        if (loggedIn) {
           dispatch(
             setLogin({
             user: loggedIn.user,
             token: loggedIn.token,
             })
        );

        navigate("/home");
        }
}

    const handleFormSubmit = async (values,onSubmitProps) => {
        if(isLogin) await login(values,onSubmitProps);
        if(isRegister) await register(values,onSubmitProps);
    };


    return(
        <Formik 
           onSubmit={handleFormSubmit}
           initialValues = {isLogin ? initialValuesLogin : initialValuesRegister}
           validationSchema={isLogin ? loginSchema : registerSchema}
        >
          {({values,errors,touched,handleBlur,handleChange,handleSubmit,setFieldValue,resetForm}) => (
            <form onSubmit={handleSubmit}>
                <Box display="grid" gap="30px" gridTemplateColumns="repeat(4,minmax(0,1fr))" sx={{
                    "& > div" : { gridColumn : isNonMobile ? undefined : "span 4"}, /*MEANING:- FOR ANY DIV THAT IS PRESENT IN THIS BOX*/
                }}
                >
                    {isRegister && (
                        <>
                            <TextField label="First Name" onBlur={handleBlur} onChange={handleChange} 
                              value={values.firstName} name="firstName" /*NAME AND VALUE SHUD BE THE SAME THING AS MENTIONED AS IN LINE 15*/
                              error={Boolean(touched.firstName) && Boolean(errors.firstName)} /*THIS WILL JUST SAY WHETHER THE FIRSTNAME DIV HAS BEEN TOUCHED BY THE USER OR NOT*/
                              helperText={touched.firstName && errors.firstName} /*IT IS USED TO SOLVE THE ERROR OCCURED (by showing the error to client)*/
                              sx={{gridColumn:"span 2"}}
                              >
                            </TextField>

                            <TextField label="Last Name" onBlur={handleBlur} onChange={handleChange} 
                              value={values.lastName} name="lastName" /*NAME AND VALUE SHUD BE THE SAME THING AS MENTIONED AS IN LINE 15*/
                              error={Boolean(touched.lastName) && Boolean(errors.lastName)} /*THIS WILL JUST SAY WHETHER THE FIRSTNAME DIV HAS BEEN TOUCHED BY THE USER OR NOT*/
                              helperText={touched.lastName && errors.lastName} /*IT IS USED TO SOLVE THE ERROR OCCURED (by showing the error to client)*/
                              sx={{gridColumn:"span 2"}}
                              >
                            </TextField>

                            <TextField label="Location" onBlur={handleBlur} onChange={handleChange} 
                              value={values.location} name="location" /*NAME AND VALUE SHUD BE THE SAME THING AS MENTIONED AS IN LINE 15*/
                              error={Boolean(touched.location) && Boolean(errors.location)} /*THIS WILL JUST SAY WHETHER THE FIRSTNAME DIV HAS BEEN TOUCHED BY THE USER OR NOT*/
                              helperText={touched.location && errors.location} /*IT IS USED TO SOLVE THE ERROR OCCURED (by showing the error to client)*/
                              sx={{gridColumn:"span 4"}}
                              >
                            </TextField>

                            <TextField label="Occuaption" onBlur={handleBlur} onChange={handleChange} 
                              value={values.occupation} name="occupation" /*NAME AND VALUE SHUD BE THE SAME THING AS MENTIONED AS IN LINE 15*/
                              error={Boolean(touched.occupation) && Boolean(errors.occupation)} /*THIS WILL JUST SAY WHETHER THE FIRSTNAME DIV HAS BEEN TOUCHED BY THE USER OR NOT*/
                              helperText={touched.occupation && errors.occupation} /*IT IS USED TO SOLVE THE ERROR OCCURED (by showing the error to client)*/
                              sx={{gridColumn:"span 4"}}
                              >
                            </TextField>

                            <Box gridColumn="span 4" border={`1px solid ${palette.neutral.medium}`} borderRadius="5px" p="1rem">
                                <Dropzone
                                  acceptedFiles=".jpg,.jpeg,.png"
                                  multiple={false}
                                  onDrop={(acceptedFiles) => setFieldValue("picture",acceptedFiles[0])}
                                >

                                  {({getRootProps,getInputProps}) => (
                                    <Box 
                                      {...getRootProps()}
                                      border={`2px dashed ${palette.primary.main}`}
                                      p="1rem"
                                      sx={{"&:hover" : {cursor : "pointer"}}}
                                      >
                                        <input {...getInputProps()}></input>
                                        {!values.picture ? (
                                            <p>Add Picture Here</p>
                                        ) : (
                                            <FlexBetween>
                                                <Typography>{values.picture.name}</Typography>  {/*to display the name of the picture after uploading*/}
                                                <EditOutlinedIcon></EditOutlinedIcon>
                                            </FlexBetween>
                                        )}
                                      </Box>
                                  )}


                                </Dropzone>
                            </Box>
                        </>
                    )}
                   {/*this section comes under both login and register*/}


                            <TextField label="Email" onBlur={handleBlur} onChange={handleChange} 
                              value={values.email} name="email" /*NAME AND VALUE SHUD BE THE SAME THING AS MENTIONED AS IN LINE 15*/
                              error={Boolean(touched.email) && Boolean(errors.email)} /*THIS WILL JUST SAY WHETHER THE FIRSTNAME DIV HAS BEEN TOUCHED BY THE USER OR NOT*/
                              helperText={touched.email && errors.email} /*IT IS USED TO SOLVE THE ERROR OCCURED (by showing the error to client)*/
                              sx={{gridColumn:"span 4"}}
                              >
                            </TextField>

                            <TextField label="Password" type="password" onBlur={handleBlur} onChange={handleChange} 
                              value={values.password} name="password" /*NAME AND VALUE SHUD BE THE SAME THING AS MENTIONED AS IN LINE 15*/
                              error={Boolean(touched.password) && Boolean(errors.password)} /*THIS WILL JUST SAY WHETHER THE FIRSTNAME DIV HAS BEEN TOUCHED BY THE USER OR NOT*/
                              helperText={touched.password && errors.password} /*IT IS USED TO SOLVE THE ERROR OCCURED (by showing the error to client)*/
                              sx={{gridColumn:"span 4"}}
                              >
                            </TextField>
                </Box>
                
                {/*BUTTONS*/}
                <Box>
                    <Button fullWidth type="submit" sx={{  /*type='submit' is must here,since it is the one that checks handleSubmit*/
                        m: "2rem 0",
                        p:"1rem",
                        backgroundColor : palette.primary.main,
                        color:palette.background.alt,
                        "&:hover" : {color:palette.primary.main},
                        }}
                        >
                            {isLogin ? "LOGIN" : "REGISTER"}
                        </Button>
                        <Typography onClick={ () => {
                            setPageType(isLogin ? "register" : "login");
                            resetForm();
                        }}
                        sx={{
                           textDecoration:"underline",
                           color:palette.primary.main,
                           "&:hover" : {
                            cursor:"pointer",
                            color:palette.primary.light,
                           }, 
                        }}>
                         {isLogin ? "Don't have an account? Sign Up here." : "Already have an account? Login here."}
                        </Typography>
                </Box>


            </form>
          )}
        </Formik>
    )

}

export default Form;
