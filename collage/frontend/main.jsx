import React from "react";
import {createTheme, MantineProvider, rem} from '@mantine/core';
import { createRoot } from "react-dom/client";
import Registration from "./registration";
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';


// Create a root
const root = createRoot(document.getElementById("reactEntry"));

// This method is only called once
// Insert the post component into the DOM
root.render(
  <MantineProvider theme={{
    fontFamily: 'DM Sans'}}>
    <Registration/>
  </MantineProvider>
);
