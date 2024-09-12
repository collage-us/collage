import React, {useState} from 'react';
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconX} from '@tabler/icons-react';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';

const Signup3 = ({setResumeFile, setTranscriptFile}) => {
  const [resume, setResume] = useState();
  const [transcript, setTranscript] = useState();
  const [resumeText, setResumeText] = useState('Click to select a file or drag here');
  const [transcriptText, setTranscriptText] = useState('Click to select a file or drag here');
  return (
    <div className='dropZone'>
    <Text size="xl">Upload your resume:</Text>
    <Dropzone
      multiple={false}
      style={{height: "40%", color: '#5d5d5d' }}
      onDrop={(files) => {console.log('accepted files', files); setResume(files); setResumeFile(files[0]); setResumeText('Current file: ' + files[0].path);}}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={PDF_MIME_TYPE}
    >
      <Group justify="center" gap="xl" mih={60} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          {resumeText !== 'Click to select a file or drag here' && <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />}
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>
          <Text size="md">
            {resumeText}
          </Text>
      </Group>
    </Dropzone>
    <Text size="xl">Upload your transcript:</Text>
    <Dropzone
      multiple={false}
      style={{height: "40%", color: '#5d5d5d' }}
      onDrop={(files) => {console.log('accepted files', files); setTranscript(files); setTranscriptFile(files[0]); setTranscriptText('Current file: ' + files[0].path);}}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
      accept={PDF_MIME_TYPE}
    >
      <Group justify="center" gap="xl" mih={60} style={{ pointerEvents: 'none' }}>
        <Dropzone.Accept>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
            stroke={1.5}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <IconX
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
            stroke={1.5}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <IconUpload
            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
            stroke={1.5}
          />
        </Dropzone.Idle>
          <Text size="md">
            {transcriptText}
          </Text>
      </Group>
    </Dropzone>
    </div>
  );
  // two file inputs using the dropzone extension
};

export default Signup3;