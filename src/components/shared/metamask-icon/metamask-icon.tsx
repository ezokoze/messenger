import SvgIcon from '@mui/material/SvgIcon';
import React from 'react'
import { ReactComponent as MetamaskSvg } from './metamask-icon.svg';

function MetamaskIcon() {
    return (
        <SvgIcon component={MetamaskSvg} viewBox="0 0 600 476.6" />
    )
}

export default MetamaskIcon;