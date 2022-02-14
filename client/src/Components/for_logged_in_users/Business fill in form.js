import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from 'react-router-dom';
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../Firebase/firebase-config";
import { useAuth } from '../../contexts/AuthContext';


// Schema for register form
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  company_name: yup.string().required("Company name is required"),
  address1: yup.string().required("Address is required"),
  address2: yup.string(),
  city: yup.string().required("City is required"),
  province: yup.string().required("State or Province is required"),
  postal_code: yup.string().required("Zip or Postal Code is required"),
  country: yup.string().required("Country is required"),
});

const theme = createTheme();

export default function AddressForm() {

  const { currentUser } = useAuth()

  // Business Profile,and formstate: { errors } are for yup validation
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
    formState
  } = useForm({
    resolver: yupResolver(schema),
    mode: "all"
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    navigate('/dashboard');
    console.log(data);
    
    try {
      await addDoc(collection(db, 'business'), {
       name: data.firstName,
       last_name: data.lastName,
       company_name: data.company_name,
       address1: data.address1,
       address2: data.address2,
       city: data.city,
       province: data.province,
       postal_code: data.postal_code,
       country: data.country,
       uid: currentUser.uid
     }) } catch(error) {
       console.log(error)
     }

    alert("success");
    reset();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Business Information Form
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Controller
                name="firstName"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value}
                    required
                    id="firstName"
                    name="firstName"
                    label="Owner's first name"
                    fullWidth
                    autoComplete="given-name"
                    variant="standard"
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lastName"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    required
                    id="lastName"
                    name="lastName"
                    label="Owner's last name"
                    fullWidth
                    autoComplete="family-name"
                    variant="standard"
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="company_name"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    required
                    id="company name"
                    name="company_name"
                    label="Company name"
                    fullWidth
                    autoComplete="company-name"
                    variant="standard"
                    error={!!errors.company_name}
                    helperText={errors.company_name?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address1"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    required
                    id="address1"
                    name="address1"
                    label="Address line 1"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                    error={!!errors.address1}
                    helperText={errors.address1?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address2"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    id="address2"
                    name="address2"
                    label="Address line 2"
                    fullWidth
                    autoComplete="shipping address-line2"
                    variant="standard"
                  // error={!!errors.address2}
                  // helperText={errors.address2?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    required
                    id="city"
                    name="city"
                    label="City"
                    fullWidth
                    autoComplete="shipping address-level2"
                    variant="standard"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="province"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    id="province"
                    name="province"
                    label="Province"
                    fullWidth
                    variant="standard"
                    error={!!errors.province}
                    helperText={errors.province?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="postal_code"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    required
                    id="postal_code"
                    name="postal_code"
                    label="Postal code"
                    fullWidth
                    autoComplete="shipping postal-code"
                    variant="standard"
                    error={!!errors.postal_code}
                    helperText={errors.postal_code?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="country"
                defaultValue=""
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextField
                    onChange={onChange}
                    value={value}
                    onBlur={onBlur}
                    required
                    id="country"
                    name="country"
                    label="Country"
                    fullWidth
                    autoComplete="shipping country"
                    variant="standard"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                required
                control={
                  <Checkbox color="secondary" name="saveAddress" value="yes" />
                }
                label={
                  <div>
                    <span>I accept the </span>
                    <Link to={"/terms"}>terms of use</Link>
                    <span> and </span>
                    <Link to={"/privacy"}>privacy policy</Link>
                  </div>
                }
              />
            </Grid>
            <Button 
  onClick={() => console.log('you clicked me')}
  type="submit" 
  color="primary"
  variant="contained"
  > Submit</Button>

            <Button
              type="submit"
              variant="contained"
              sx={{ mx: "auto", mt: 3, mb: 5 }}
              disabled={!formState.isValid}
            >
              Submit Form
            </Button>
          </Grid>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
