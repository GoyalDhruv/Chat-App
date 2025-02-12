import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';

function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }

    return color;
}

export default function CustomAvatar({ name }) {
    return (
        <Stack direction="row">
            {name ?
                <Avatar sx={{ bgcolor: stringToColor(name) }}>
                    {name?.split(' ')[0][0].toUpperCase()}
                    {name?.split(' ')[1] ? name?.split(' ')[1][0].toUpperCase() : ''}
                </Avatar>
                : null
            }
        </Stack>
    );
}
