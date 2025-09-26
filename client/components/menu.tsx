import React from 'react';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import ItemDialog from './itemDialog';
import { useItemStore, useMenuStore, MenuItem } from '@/store';

const Menu: React.FC = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const itemStore = useItemStore(state => state);
    const menuStore = useMenuStore(state => state);

    // Function to handle opening the dialog and setting the selected item
    const handleItemClick = (item: MenuItem) => {
        itemStore.setItem(item);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
    };

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5em',
                padding: '1em 0',
                width: '100%',
                boxSizing: 'border-box',
            }}
        >
            {menuStore.menu.map(item => (
                <div
                    key={item.itemId}
                    style={{
                        borderRadius: '8px',
                        padding: '0.5em',
                        textAlign: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        cursor: 'pointer', // Add cursor pointer
                        transition: 'background 0.2s',
                        border: '1px solid #e0e0e0',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background = '#e0e0e0')}
                    onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
                    onClick={() => handleItemClick(item)}
                >
                    <div style={{
                        borderRadius: '0.5em', 
                        padding: '0.5em',
                    }}>
                        <FastfoodIcon style={{ 
                            fontSize: '1.75em', 
                            color: '#313131', 
                        }} />
                    </div>
                    <div style={{ alignItems: 'start', display: 'flex', flexDirection: 'column' }}>
                        <p style={{ color: '#313131', marginLeft: '0.5em', fontSize: '1em', marginBottom: 0 }}>{item.name}</p>
                        <p style={{ color: '#a1a1a1', marginLeft: '0.5em', fontSize: '0.9em', marginTop: 0 }}>${item.price.toFixed(2)}</p>
                    </div>
                </div>
            ))}
            <ItemDialog open={dialogOpen} handleClose={handleDialogClose} />
        </div>
    )
};

export default Menu;