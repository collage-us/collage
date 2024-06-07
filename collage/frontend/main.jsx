import React from "react";
import {createTheme, MantineProvider, rem} from '@mantine/core';
import { createRoot } from "react-dom/client";
import Registration from "./registration";


// Create a root
const root = createRoot(document.getElementById("reactEntry"));

// This method is only called once
// Insert the post component into the DOM
root.render(
  <MantineProvider>
    <Registration/>
  </MantineProvider>
);
