import React, {useState, lazy, useEffect} from 'react';
// import { Link } from 'react-router-dom';
import { Popover, Checkbox, CheckboxGroup, ScrollArea, TextInput, Title, Button, ActionIcon, rem, Group, Text } from '@mantine/core';
import { IconSearch, IconUsers, IconBell, IconMessageDots, IconMoodSmileBeam, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css'
import '../CSS/Search.css';
import Cookies from 'js-cookie';
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
    const [currData, setCurrData] = useState([]);
    const handleSearch = async () => {
        const result = await fetch("/api/search/", {
            method: "POST",
            credentials: "include",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${Cookies.get('access_token')}`,
            }, 
            body: JSON.stringify({search_string: search,
                                  filters: filters
            }),
          },)
          .then((response) => response.json())
          .then((data) => {console.log(data); setCurrData(data);});
    }
    useEffect(() => {handleSearch()}, [filters]);
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
                        onKeyDown={(e) => {if(e.key==='Enter'){handleSearch();}}}
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
                        radius="xl" onClick={() => {if (opened === false) {setOpened(true); console.log("opening")} else {setOpened(false); setValue(filters);}}} rightSection={opened ? <IconChevronUp size={14} /> : <IconChevronDown size={14} />}>
                        All Filters
                    </Button>
                </Popover.Target>
                <Popover.Dropdown  styles={{dropdown: {color: "black", backgroundColor: "white"}}} radius="md">
                {/* Change the checkdowns below based on backend filters from db in the future. 
                It will take some design to figure it out once we have classes and categories */}
                <CheckboxGroup value={value} onChange={setValue}>
                    <Text ta="center">School</Text>
                    <div className='filter-borders'>
                        <ScrollArea h={100} offsetScrollbars>
                            <Checkbox value="sarchitecture" label="Architecture" />
                            <Checkbox value="sart and design" label="Art & Design" />
                            <Checkbox value="sbusiness" label="Business" />
                            <Checkbox value="sdentistry" label="Dentistry" />
                            <Checkbox value="seducation" label="Education" />
                            <Checkbox value="sengineering" label="Engineering" />
                            <Checkbox value="senvironmental and sustainability" label="Environmental & Sust." />
                            <Checkbox value="sinformation" label="Information" />
                            <Checkbox value="slsa" label="LSA" />
                            <Checkbox value="spublic health" label="Public Health" />
                            <Checkbox value="spublic policy" label="Public Policy" />
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
                            <Checkbox value="manthropology" label="Anthropology" />
                            <Checkbox value="mbiology" label="Biology" />
                            <Checkbox value="mcommunications" label="Communications" />
                            <Checkbox value="mcomputer science" label="Computer Science" />
                            <Checkbox value="meconomics" label="Economics" />
                            <Checkbox value="mfinance" label="Finance" />
                            <Checkbox value="mfilm" label="Film" />
                            <Checkbox value="mforeign language" label="Foreign Language" />
                            <Checkbox value="mioe" label="Industrial Operations Engineering" />
                            <Checkbox value="mmathematics" label="Mathematics" />
                            <Checkbox value="mmusic" label="Music" />
                            <Checkbox value="mnatural science" label="Natural Science" />
                            <Checkbox value="mneuroscience" label="Neuroscience" />
                            <Checkbox value="mphilosophy" label="Philosophy" />
                            <Checkbox value="mpsychology" label="Psychology" />
                            <Checkbox value="mother" label="Other" />
                            
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
            {currData.length > 0 && currData.map((data) => <ClassCard key={data.subject_code} data={data}></ClassCard>)}
            </div>
        </>
    )

};

export default Search;