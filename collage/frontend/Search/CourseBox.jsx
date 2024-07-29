import React from 'react';
import {Card, Image, Text, Group} from '@mantine/core';

const CourseBox = ({ course }) => {
  return (
    <Card>
      <Card.Section>
        <Image src={course.ai_img_url} alt={course.course_name} height={160}/>
      </Card.Section>
      <Group position="apart" style={{ marginBottom: 5, marginTop: 10 }}>
        <Text weight={500}>{course.course_name}</Text>
        <Text size="sm"> {course.credit_hours} </Text>
      </Group>
      <Text size="sm">{course.course_description}</Text>
      <Text size="sm">{course.instructor_id}</Text>
      <Text size="sm">{course.class_topic}</Text>
    </Card>
  );
};

export default CourseBox;