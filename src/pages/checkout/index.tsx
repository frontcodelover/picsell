import React from 'react';
import BaseLayout from '@/layouts/baseLayout';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';

const index = () => {
  const { cartItems, clearCart } = useCart();

  return (
    <BaseLayout>
      <h1 className='texth1'>Panier</h1>
      {cartItems.length === 0 ? (
        <p>Votre panier est vide</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='font-bold text-black'>Oeuvres</TableHead>
              <TableHead className='font-bold text-black'>Description</TableHead>
              <TableHead className='w-[100px] font-bold text-black'>Quantité</TableHead>
              <TableHead className='text-right font-bold text-black'>Prix</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className='text-right'>{item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className='text-right'>{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
      <div className='flex gap-6 justify-end'>
        {cartItems.length > 0 && (
          <>
            <Button onClick={clearCart} className='bg-primary-foreground text-white'>
              Vider le panier
            </Button>
            <Button className='text-black'>Valider la commande</Button>
          </>
        )}
      </div>
    </BaseLayout>
  );
};

export default index;
