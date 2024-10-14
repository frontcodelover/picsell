import React, { useState } from 'react';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CustomTooltip from '@/components/tooltip/customTooltip';
import { useCart } from '@/context/CartContext';

const Single = ({ photo, photographer }) => {
  const [selectedFormat, setSelectedFormat] = useState<string | null>(null);
  const { addItemToCart } = useCart();

  const handleToCart = () => {
    addItemToCart({
      id: photo.id,
      name: photo.title,
      price: photo.price,
      quantity: 1,
    });
  };

  return (
    <>
      {photo ? (
        <div className='grid md:grid-cols-2 md:grid-flow-col gap-6'>
          <div>
            <Image src={photo.image_url} alt={photo.title} width={500} height={600} className='rounded-md shadow-lg' />
          </div>
          <Card className='p-4'>
            <div className='bg-black text-primary p-2 mb-4 font-bold text-center'>Edition limitée à {photo.number} exemplaires</div>
            <h1 className='font-extrabold text-3xl uppercase'>{photo.title}</h1>
            <div className=' mb-2'>Artiste : {photographer?.username || 'Inconnu'}</div>
            <div className='font-semibold text-lg my-4'>Prix : €{photo.price}</div>

            <Select onValueChange={(value) => setSelectedFormat(value)}>
              <SelectTrigger className='w-[180px]'>
                <SelectValue placeholder='Format' />
              </SelectTrigger>
              <SelectContent>
                {photo.format &&
                  (Object.values(photo.format) as string[]).map((format: string, index: number) => (
                    <SelectItem key={index} value={format}>
                      {format}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>

            {/* Bouton Ajouter au Panier */}
            <CustomTooltip disabled={!selectedFormat} text='Sélectionnnez un format'>
              <span>
                {' '}
                {/* Wrapper autour du bouton */}
                <Button
                  disabled={!selectedFormat}
                  onClick={() => {
                    if (!selectedFormat) {
                      return;
                    }
                    handleToCart();
                    // Logique d'ajout au panier ici
                    console.log('Produit ajouté au panier avec le format sélectionné');
                  }}
                  className={`font-extrabold my-4 p-4 rounded-md transition duration-300 ${!selectedFormat ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Ajouter au panier
                </Button>
              </span>
            </CustomTooltip>

            {/* Délai et méthode d'envoi */}
            <div className='font-semibold text-lg mt-4'>Délai de livraison : {photo.shipping_delay} jours</div>
            <div className='font-semibold text-lg'>Méthode d'envoi : {photo.shipping_method}</div>
            <div className='text-lg font-extrabold pt-6 uppercase'>Description</div>
            <div className='italic text-sm '>" {photo.description} "</div>
          </Card>
        </div>
      ) : (
        <p>Chargement ou aucune photo trouvée...</p>
      )}
    </>
  );
};

export default Single;
