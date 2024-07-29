import React, {useState, lazy} from 'react';
// import { Link } from 'react-router-dom';
import { Popover, Checkbox, CheckboxGroup, Stack, TextInput, Title, Button, ActionIcon, rem, Group } from '@mantine/core';
import { IconSearch, IconUsers, IconBell, IconMessageDots, IconMoodSmileBeam, IconChevronDown } from '@tabler/icons-react';
import '@mantine/core/styles/Button.css'
import '../CSS/Search.css';
// import ClassCard from './Class-Card';
const ClassCard = lazy(() => import('./Class-Card'));

const Search = () => {
    const searchIcon = <IconSearch style={{width: rem(16), height: rem(16)}}/>
    const [opened, setOpened] = useState(false);
    const [value, setValue] = useState([]);
    const [filters, setFilters] = useState([]);
    const [page, setPage] = useState(0);
    const [results, setResults] = useState([]);
    const [search, setSearch] = useState("");
    const [currData, setCurrData] = useState(["something"]);
    return(
        <>
        <div>
            <Group>
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
                {/* {filters.map((filter) => <Button key={filter}>{filter}</Button>)} */}
                <Popover width={300} opened={opened} closeOnClickOutside={false} closeOnEscape={false} onClose={() => setOpened(false)} trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button 
                        styles={{root: {color: "black"}}} autoContrast="false" variant="filled" color="#D9D9D9" 
                        radius="xl" onClick={() => setOpened(true)} rightSection={<IconChevronDown size={14} />}>
                        All Filters
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                <CheckboxGroup value={value} onChange={setValue}>
                    <Checkbox value="f0" label="Filter0" />
                    <Checkbox value="f1" label="Filter1" />
                    <Checkbox value="f2" label="Filter2" />
                    <Checkbox value="f3" label="Filter3" />
                    <Checkbox value="f4" label="Filter4" />
                    <Checkbox value="f5" label="Filter5" />
                    <Checkbox value="f6" label="Filter6" />
                    <Checkbox value="f7" label="Filter7" />
                    <Checkbox value="f8" label="Filter8" />
                    <Checkbox value="f9" label="Filter9" />
                </CheckboxGroup>
                <Button onClick={() => {setFilters(value); setOpened(false);}}>Confirm</Button>
                <Button onClick={() => {setValue(filters); setOpened(false);}}>Cancel</Button>
                </Popover.Dropdown>
                </Popover>
            </Group>
            </div>
            <div>
            {currData.length < 1 && <Title>No Results Found</Title>}
            {currData.length > 0 && currData.map((data) => <ClassCard key={data} data={data}></ClassCard>)}
            </div>
        </>
    )

};

export default Search;