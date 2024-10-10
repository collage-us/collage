import React, {useState, useEffect} from "react";
import { Group, Text, rem } from '@mantine/core';
import { IconUpload, IconX} from '@tabler/icons-react';
import { Dropzone, PDF_MIME_TYPE } from '@mantine/dropzone';
import '../CSS/FileUpload.css';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL, getMetadata, uploadBytesResumable } from "firebase/storage";

const firebaseConfig = {
  apiKey: 'AIzaSyDc5B7m__Z77iTyQYmb9cXxrn7Bo3a9C18',
  authDomain: "collage-849c3.firebaseapp.com",
  projectId: "collage-849c3",
  storageBucket: "collage-849c3.appspot.com",
  messagingSenderId: "302505148937",
  appId: "1:302505148937:web:05f9caf3eb3bf860ac2ed8",
  measurementId: "G-FZFTH0MVNY"
}

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const FileUpload = ({ userName, setResumeFile, setTranscriptFile }) => {
  const [resumeFileName, setResumeFileName] = useState('');
  const [transcriptFileName, setTranscriptFileName] = useState('');
  const [resumeText, setResumeText] = useState('Click to select a file or drag here');
  const [transcriptText, setTranscriptText] = useState('Click to select a file or drag here');
  
  useEffect(() => {
    const fetchFiles = async() => {
      try{
        const resumeRef = ref(storage, `resumes/${userName}/resume.pdf`);
        const resumeMetadata = await getMetadata(resumeRef);
  
        if(resumeMetadata){
          setResumeFileName(resumeMetadata.name);
          setResumeText('Upload ne resume');
        }
      } catch (error) {
        console.log('No existing resume found for user.');
      }
  
      try {
        const transcriptRef = ref(storage, `transcripts/${userName}/transcript.pdf`);
        const transcriptMetadata = await getMetadata(transcriptRef);
        if(transcriptMetadata){
          setTranscriptFileName(transcriptMetadata.name);
          setTranscriptText('Upload new transcript');
        }
      } catch (error) {
        console.log('No existing transcript found for user.');
      }
    };

    fetchFiles();
  }, [userName]);

  const handleResumeUpload = (files) => {
    if (files && files[0]) {
      setResumeFile(files[0]);
      setResumeText('Upload new resume');
      setResumeFileName(files[0].name);

      const storageRef = ref(storage, `resumes/${userName}/${files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on("state_changed", 
        (snapshot) => {
          //can track progress here
        },
        (error) => {
          console.error('Resume upload failed:', error);
        },
        () => {
          console.log('Resume uploaded successfully');
        }
      );
    }
  };

  const handleTranscriptUpload = (files) => {
    if (files && files[0]) {
      setTranscriptFile(files[0]);
      setTranscriptText('Upload new transcript');
      setTranscriptFileName(files[0].name);

      // Upload the file to Firebase Storage
      const storageRef = ref(storage, `transcripts/${userName}/${files[0].name}`);
      const uploadTask = uploadBytesResumable(storageRef, files[0]);

      uploadTask.on("state_changed",
        (snapshot) => {
          // You can track progress here if needed
        },
        (error) => {
          console.error('Transcript upload failed:', error);
        },
        () => {
          // Upload completed successfully
          console.log('Transcript uploaded successfully');
        }
      );
    }
  };

  return (
    <div className='dropZone'>
      <Text size="xl" className="resume-text">{resumeFileName || 'Upload your resume:'}</Text>
      <Dropzone
        multiple={false}
        style={{ height: "40%", color: '#5d5d5d' }}
        onDrop={handleResumeUpload}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={PDF_MIME_TYPE}
        className="resume-drop"
      >
        <Group position="center" spacing="xl" mih={60} style={{ pointerEvents: 'none' }}>
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
            {resumeText}
          </Text>
        </Group>
      </Dropzone>

      <Text size="xl" className="transcript-text">{transcriptFileName || 'Upload your transcript:'}</Text>
      <Dropzone
        multiple={false}
        style={{ height: "40%", color: '#5d5d5d' }}
        onDrop={handleTranscriptUpload}
        onReject={(files) => console.log('rejected files', files)}
        maxSize={5 * 1024 ** 2}
        accept={PDF_MIME_TYPE}
        className="transcript-drop"
      >
        <Group position="center" spacing="xl" mih={60} style={{ pointerEvents: 'none' }}>
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
};

export default FileUpload;
