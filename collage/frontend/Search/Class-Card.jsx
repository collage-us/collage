import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Title, Button, ActionIcon } from '@mantine/core';
import { IconCircleChevronRight, IconCircleChevronLeft } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css'
import '../Styles/Search.css';

const ClassCard = ({data}) => {
  return(
    <div>
        {data}
    </div>
  )
};

export default ClassCard;