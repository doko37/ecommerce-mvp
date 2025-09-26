import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useItemStore } from '@/store';
import Counter from './counter';
import { useCartStore } from '@/store';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function ItemDialog({ handleClose, open }: { handleClose: () => void; open: boolean }) {
  const itemStore = useItemStore(state => state);
  const cartStore = useCartStore(state => state);
  const [count, setCount] = React.useState(1);

  const addItemToCart = () => {
    const {setItem, ...rest} = itemStore; // Exclude setItem from the item object
    cartStore.addToCart({ ...rest, quantity: count });
    handleClose();
  }

  React.useEffect(() => {
    if(open) {
      setCount(1); // Reset count to 1 whenever a new item is set
    }
  }, [itemStore.itemId, open]);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ fontFamily: 'SUSE, sans-serif' }}>
          {itemStore.name} - ${(itemStore.price*count).toFixed(2)}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: '0.25em',
            top: '0.5em',
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers style={{ fontFamily: 'SUSE, sans-serif' }}>
          <p style={{ color: '#a1a1a1'}}>{itemStore.desc}</p>
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: '1.5em' }}>
            <Counter setCount={(count) => count < 1 ? setCount(1) : setCount(count)} count={count} />
            <Button style={{ padding: '1em' }} onClick={addItemToCart}>Add to cart</Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
