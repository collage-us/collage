import React, {lazy} from "react";
import { Grid } from "@mantine/core";
import { Link } from 'react-router-dom';
import '../CSS/userProfile.css';
const ActivityGlimpse = lazy(() => import('./Activityglimpse'));
const Personal = lazy(() => import('./Personal'));
const Upload = lazy(() => import('./FileUpload'));
const Saved = lazy(() => import('./Savedcourses'));

const UserProfile = () => {
    return (
        <div className="body">
            <Grid>
                <Grid.Col span={12}>
                    <div className="title">
                        <h1>Profile</h1>
                    </div>
                </Grid.Col>
                <Grid.Col span={6}>
                    <Personal/>
                </Grid.Col>
                <Grid.Col span={6}>
                    <ActivityGlimpse/>
                </Grid.Col>
                <Grid.Col span={12}>
                    <h2>Schedule Builder</h2>
                    <div className="builder">
                        <Upload/>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <div className="schedule">
                        
                        <h2>Alex's' Schedule</h2>
                    </div>
                </Grid.Col>
                <Grid.Col span={12}>
                    <h3>Saved Courses</h3>
                    <Saved/>
                </Grid.Col>
            </Grid>
        </div>
    )
}

export default UserProfile;