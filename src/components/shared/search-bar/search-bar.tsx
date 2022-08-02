import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import debounce from '@mui/material/utils/debounce';
import React, { useMemo, useState } from 'react'

function SharedSearchBar(props: any) {

    const [searchTerm, setSearchTerm] = useState('trending');

    const Search = styled('div')(({ theme }) => ({
        position: 'relative',
        borderRadius: '50px',
        backgroundColor: '#f0f2f5',
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            width: '100%'
        },
    }));

    const changeHandler = (event: any) => {
        setSearchTerm(event.target.value);
        props.onChange(event.target.value);
    };

    const debouncedChangeHandler = useMemo(() => debounce(changeHandler, 300), []);

    return (
        <Search sx={{ height: '36px' }}>
            <SearchIconWrapper>
                <SearchIcon sx={{ color: '#adadad' }} />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search"
                inputProps={{ 'aria-label': 'search' }}
                type="text"
                onChange={debouncedChangeHandler}
            />
        </Search>
    )
}

export default SharedSearchBar