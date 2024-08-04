import React, {useState} from 'react';
import {Card, Image, Text, Group} from '@mantine/core';
import '@mantine/core/styles/Button.css'
import '../CSS/Search.css';

const ClassCard = ({data}) => {
  return(
    <div className='card'>
      <Card shadow="sm" padding="lg" radius="lg" withBorder onClick={()=>alert('hello')} styles={{root: {backgroundColor: data.color}}}>
        <Card.Section>
          <div className='card-header'>
            <Text fw={700} ta="center" size="xl">{data.subject_code}</Text>
            <Text fw={300} ta="center">{data.course_name}</Text>
          </div>
        </Card.Section>
        <Card.Section>
          <Image
            src={data.ai_img_url}
            height={160}
            alt="Norway"
          />
        </Card.Section>
      </Card>
    </div>
  )
};

export default ClassCard;