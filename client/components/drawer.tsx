import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { useCartStore } from '../store'
import { Badge, TextField } from '@mui/material';
import Counter from './counter';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import api from '../api';

export default function CartDrawer() {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '' });
  const cartState = useCartStore(state => state);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const postOrder = async () => {
    if(cartState.cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    // if(!form.name || !form.email || !form.phone) {
    //   alert("Please fill out all fields.");
    //   return;
    // }
    try {
      const response = await api.post('/orders', {
        time: Date.now(),
        items: cartState.cart.map(item => ({
          itemId: item.itemId,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      }).then(res => {
        console.log(res.data)
      }).catch(err => console.error(err));
    } catch (error) {
      console.error("Error placing order:", error);
      alert("An error occurred while placing your order. Please try again.");
    }
  }

  const DrawerList = (
    <Box sx={{ width: 350 }} role="presentation">
      {cartState.cart.length === 0 ? (
        <div style={{ padding: '1em', fontFamily: 'SUSE, sans-serif' }}>
          Your cart is empty.
        </div>
      ) : (
        <div style={{ padding: '1em', fontFamily: 'SUSE, sans-serif' }}>
          <h2>Your Cart</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cartState.cart.map((item, i) => (
              <li key={item.itemId} style={{ 
                marginBottom: '1em', 
                borderBottom: cartState.cart.length > 1 && i < cartState.cart.length - 1 ? '1px solid #e0e0e0' : 'none', 
                paddingBottom: cartState.cart.length > 1 && i < cartState.cart.length - 1 ? '0.5em' : 0 
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1em' }}>
                  <div>
                    <strong>{item.name}</strong> (x{item.quantity})
                  </div>
                  <div>${(item.price * item.quantity).toFixed(2)}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5em' }}>
                  <Counter 
                    count={item.quantity} 
                    setCount={(newCount) => {
                      if(newCount < 1) {
                        cartState.removeFromCart(item.itemId);
                      } else {
                        cartState.updateQuantity(item.itemId, newCount);
                      }
                    }} 
                  />
                  <Button
                    variant="outlined"
                    style={{ color: '#d32f2f', borderColor: '#d32f2f', minWidth: '2.5em', minHeight: '2.5em' }}
                    onClick={() => cartState.removeFromCart(item.itemId)}
                  >
                    <DeleteOutlineIcon style={{ fontSize: '1.25em' }} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: '1em', fontWeight: 'bold', marginBottom: '2em' }}>
            Total: ${cartState.cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
          </div>
          {/* <TextField label="Name" size="small" style={{ margin: '0.25em 0', width: '100%' }} value={form.name} onChange={e => setForm(prev => ({...prev, name: e.target.value}))} />
          <TextField label="Email" size="small" style={{ margin: '0.25em 0', width: '100%' }} value={form.email} onChange={e => setForm(prev => ({...prev, email: e.target.value}))} />
          <TextField label="Phone Number" size="small" style={{ margin: '0.25em 0', width: '100%' }} value={form.phone} onChange={e => setForm(prev => ({...prev, phone: e.target.value}))} /> */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: '0em', padding: '0.75em' }}
            onClick={postOrder} // Replace with actual checkout logic <--- Placeholder - replace with actual checkout logic --
          >
            <strong>Checkout</strong>
          </Button>
        </div>
      )}
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} style={{ margin: 0, padding: 0, width: 40, height: 40 }}>
        <Badge badgeContent={cartState.cart.reduce((sum, item) => sum + item.quantity, 0)} color="primary">
          <ShoppingBagIcon style={{ color: '#313131', fontSize: '2.5em' }} />
        </Badge> 
      </Button>
      <Drawer open={open} anchor={'right'} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
