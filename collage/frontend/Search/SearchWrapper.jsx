import React, {useState, lazy} from 'react';
// import { Link } from 'react-router-dom';
import { Popover, Checkbox, CheckboxGroup, ScrollArea, TextInput, Title, Button, ActionIcon, rem, Group, Text } from '@mantine/core';
import { IconSearch, IconUsers, IconBell, IconMessageDots, IconMoodSmileBeam, IconChevronDown } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css'
import '../CSS/Search.css';
// import ClassCard from './Class-Card';
const ClassCard = lazy(() => import('./Class-Card'));

const Search = () => {
    const searchIcon = <IconSearch style={{width: rem(16), height: rem(16)}}/>
    const [opened, setOpened] = useState(false);
    // const [schoolOpened, setSchoolOpened] = useState(false);
    // const [creditsOpened, setCreditsOpened] = useState(false);
    // const [majorOpened, setMajorOpened] = useState(false);
    const [value, setValue] = useState([]);
    const [filters, setFilters] = useState([]);
    const [page, setPage] = useState(0);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [currData, setCurrData] = useState([
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics I", color: "#FF7C7C", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics II", color: "red", img: "https://lh3.googleusercontent.com/d/1-kRA35fv-D5Dc6kC6hL6O6_H60UWD9fp=s220"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics III", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics IV", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics V", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics VI", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics VII", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics VIII", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"},
                {id: 1, courseNumber: "Econ 101", courseName: "Principles of economics IX", color: "red", img: "https://images.unsplash.com/photo-1587691592099-24045742c181?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            ]);
    return(
        <>
        <div className="search">
            <Group gap="md">
                    <TextInput
                        // variant="filled"
                        styles={{
                            // input: { backgroundColor: '#D9D9D9' },
                            section: {color: 'black'},
                            root: {width: '55vw'}
                        }}
                        onKeyDown={(e) => {if(e.key==='Enter'){console.log(search);}}}
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                        leftSection={searchIcon}
                        radius="xl"
                        placeholder="Search"/>
                {/* {filters.map((filter) => <Button key={filter}>{filter}</Button>)} */}
                <Popover width={300} opened={opened} closeOnClickOutside={false} closeOnEscape={false} onClose={() => setOpened(false)} trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button 
                        styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                        radius="xl" onClick={() => {if (opened === false) {setOpened(true); console.log("opening")} else {setOpened(false); setValue(filters);}}} rightSection={<IconChevronDown size={14} />}>
                        All Filters
                    </Button>
                </Popover.Target>
                <Popover.Dropdown  styles={{dropdown: {color: "black", backgroundColor: "gray"}}} radius="md">
                {/* Change the checkdowns below based on backend filters from db in the future. 
                It will take some design to figure it out once we have classes and categories */}
                <CheckboxGroup value={value} onChange={setValue}>
                    <Text ta="center">School</Text>
                    <div className='filter-borders'>
                        <ScrollArea h={100} offsetScrollbars>
                            <Checkbox value="architecture" label="Architecture" />
                            <Checkbox value="art and design" label="Art & Design" />
                            <Checkbox value="business" label="Business" />
                            <Checkbox value="dentistry" label="Dentistry" />
                            <Checkbox value="education" label="Education" />
                            <Checkbox value="engineering" label="Engineering" />
                            <Checkbox value="environmental and sustainability" label="Environmental & Sust." />
                            <Checkbox value="information" label="Information" />
                            <Checkbox value="public health" label="Public Health" />
                            <Checkbox value="public policy" label="Public Policy" />
                        </ScrollArea>
                    </div>
                    <Text ta="center">Credits</Text>
                    <div className='filter-borders'>
                        <ScrollArea h={100} offsetScrollbars>
                            <Checkbox value="c1" label="1 Credit" />
                            <Checkbox value="c2" label="2 Credits" />
                            <Checkbox value="c3" label="3 Credits" />
                            <Checkbox value="c4" label="4 Credit" />
                            <Checkbox value="c5" label="5 Credits" />
                            <Checkbox value="c6" label="6 Credits" />
                        </ScrollArea>
                    </div>
                    <Text ta="center">Major</Text>
                    <div className='filter-borders'>
                        <ScrollArea h={100} offsetScrollbars>
                            <Checkbox value="anthropology" label="Anthropology" />
                            <Checkbox value="cognitive science" label="Cognitive Science" />
                            <Checkbox value="computer science" label="Computer Science" />
                            <Checkbox value="finance" label="Finance" />
                            <Checkbox value="mathematics" label="Mathematics" />
                            <Checkbox value="music" label="Music" />
                            <Checkbox value="neuroscience" label="Neuroscience" />
                            <Checkbox value="physics" label="Physics" />
                            <Checkbox value="political science" label="Political Science" />
                            
                        </ScrollArea>
                    </div>
                </CheckboxGroup>
                <div className='filters-footer'>
                    <div className='confirm-button'>
                        <Button 
                                styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                                radius="xl" onClick={() => {setFilters(value); setOpened(false);}} size="xs">
                                    Confirm
                        </Button>
                    </div>
                    <div className='cancel-button'>
                        <Button 
                                styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                                radius="xl" onClick={() => {setValue([]);}} size="xs">
                                    Clear All
                        </Button>
                    </div>
                </div>
                </Popover.Dropdown>
                </Popover>
                <Group gap="xs" justify="right">
                    <ActionIcon color="#D9D9D9" radius="md" size="lg">
                        <IconUsers stroke="1.5" color="black"/>
                    </ActionIcon>
                    <ActionIcon color="#D9D9D9" radius="md" size="lg">
                        <IconBell stroke="1.5" color="black"/>
                    </ActionIcon>
                    <ActionIcon color="#D9D9D9" radius="md" size="lg">
                        <IconMessageDots stroke="1.5" color="black"/>
                    </ActionIcon>
                    <ActionIcon color="#D9D9D9" radius="md" size="lg">
                        <IconMoodSmileBeam stroke="1.5" color="black"/>
                    </ActionIcon>
                </Group>
                
            </Group>
            </div>
            <hr width="100%" size="2" color="#ECECEC"/>
            <div className="wrapper-grid">
            {currData.length < 1 && <Title>No Results Found</Title>}
            {currData.length > 0 && currData.map((data) => <ClassCard key={data.className} data={data}></ClassCard>)}
            </div>
        </>
    )

};

export default Search;