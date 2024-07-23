import React, { lazy } from "react";
import {MantineProvider} from '@mantine/core';
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';

// import Registration from "./registration";
const Registration = lazy(() => import('./registration'));


// Create a root
const root = createRoot(document.getElementById("reactEntry"));

// This method is only called once
// Insert the post component into the DOM
root.render(
  <MantineProvider theme={{
    fontFamily: 'DM Sans'}}>
      <GoogleOAuthProvider clientId="Replace with GOOGLE ID here">
        <Registration/>
      </GoogleOAuthProvider>
  </MantineProvider>
);
