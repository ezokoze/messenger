import Box from '@mui/material/Box';
import Popper from '@mui/material/Popper';
import SharedSearchBar from 'components/shared/search-bar/search-bar';
import { Grid, SearchBar, SearchContext, SearchContextManager, SuggestionBar } from '@giphy/react-components';
import React, { useState } from 'react'
import './gif-popover.css';
import { GiphyFetch } from '@giphy/js-fetch-api';

function GifPopover(props: any) {

    // states
    const [searchTerm, setSearchTerm] = useState('trending');

    // vars
    const gf = new GiphyFetch('jIcRSpKjpEgiy5y51MEJUk5nh0NJZVMG');

    // methods
    const fetchGifs = (offset: number) => gf.search(searchTerm, { offset, limit: 10 })

    const searchGifs = (e: string) => setSearchTerm(e);

    const gifClicked = (gif: any, event: any) => {
        event.preventDefault();
        props.onGifClick(gif);
    }

    return (
        <Popper id={props.id} open={props.open} anchorEl={props.anchorEl}
            modifiers={[
                {
                    name: 'arrow',
                    enabled: true,
                    options: {
                        element: props.id,
                    },
                }
            ]}>
            <Box sx={{ height: '400px', maxHeight: '400px', overflow: 'auto', p: 0 }}
                className="giphy-popup">
                <div className="giphy-search">
                    <SharedSearchBar onChange={searchGifs} />
                </div>
                <div className="giphy-grid">
                    <Grid key={searchTerm} width={300} columns={1} fetchGifs={fetchGifs} onGifClick={gifClicked} />
                </div>
            </Box>
        </Popper>
    )
}

export default GifPopover;