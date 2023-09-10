import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { LogoSpace, FormSpace, Img } from "./styles";
import DatosUsuario from "./DatosUsuario";
import DatosPersonales from "./DatosPersonales";
import DatosEntrega from "./DatosEntrega";
import Complete from "./Complete";
import Stepper from "../Stepper";
import { validarEmail, validarPassword } from "./DatosUsuario/validaciones";
import Step from "./Step";

const Form = () => {

  const [pasos, setPasos] = useState({})
  const [step, setStep] = useState(0);
  
  useEffect(()=>{
    // se llama una vez que se haya cargado el componente
    console.log('useEffect');
  })

  useEffect(()=>{
    console.log('step actualizado', step);
  }, [step])

  /* useEffect(async () => {
    try {
      // Forma 1
      // const data = await fetch('https://jsonplaceholder.typicode.com/posts');
      // const posts = await data.json()

      // Forma 2
      const data = await (await fetch('https://jsonplaceholder.typicode.com/posts')).json();
      console.log('data',data);

    } catch (error) {
      console.log(error);
    }
  }) */

  console.log('Form component');
  /**
   * step = 0 -> <DatosUsuario />
   * step = 1 -> <DatosPersonales />
   * step = 2 -> <DatosEntrega />
   * step = 3 -> <Complete />
   */

  const updateStep = (step) => {
    console.log('actualizar paso', step);
    setStep(step)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    let newState = step +1;
    setStep(newState);
    console.log('newState', newState);
    console.log('step', step);
  }

  const handleChange = (element, position, currentStep, validator) => {
    const value = element.target.value;
    const valid = validator(value);
    console.log('value', value);
    console.log('position', position);
    console.log('currentStep', currentStep);
    console.log('validator', validator);
  }

  const stepFlow = {
    0: {
      inputs: [
        {
          label: 'Correo electrónico',
          type: 'email',
          value: '',
          valid: null,
          onChange: handleChange,
          helperText: 'Ingresa un correo electrónico válido.',
          validator: validarEmail,
        },
        {
          label: 'Contraseña',
          type: 'password',
          value: '',
          valid: null,
          onChange: handleChange,
          helperText: 'Ingresa una contraseña válida, Al menos 8 caracteres y máximo 20.',
          validator: validarPassword,
        },
      ],
      buttonText: 'Siguiente',
      onSubmit
    },
    1: {
      inputs: [
        {
          label: 'Correo electrónico',
          type: 'email',
          value: '',
          valid: null,
          onChange: handleChange,
          helperText: 'Ingresa un correo electrónico válido.',
          validator: validarEmail,
        },
        {
          label: 'Contraseña',
          type: 'password',
          value: '',
          valid: null,
          onChange: handleChange,
          helperText: 'Ingresa una contraseña válida, Al menos 8 caracteres y máximo 20.',
          validator: validarPassword,
        },
      ],
      buttonText: 'Siguiente',
      onSubmit
    }
  }

  const steps = {
    0: <DatosUsuario updateStep={updateStep} />,
    1: <DatosPersonales updateStep={updateStep} />,
    2: <DatosEntrega updateStep={updateStep} />,
    3: <Complete />
  }

  return (
    <Box
      sx={{
        padding: "30px",
        display: "flexbox",
        flexDirection: "column",
      }}
    >
      <LogoSpace>
        <Img src={"/favicon.png"} />
        <Typography variant="h3">AluraFood</Typography>
      </LogoSpace>
      <FormSpace>
        {step < 3 && <Stepper step={step} />}
        {/* {steps[step]} */}
        <Step data={stepFlow[step]} step={step} />
      </FormSpace>
    </Box>
  );
};

export default Form;
