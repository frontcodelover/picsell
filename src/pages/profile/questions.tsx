import React from 'react';
import Link from 'next/link';
import ProfileLayout from '../../../layouts/profile/layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const Questions = () => {
  return (
    <ProfileLayout>
      <div>
        <Alert>
          <AlertTitle className='font-bold pb-2'>Vous ne trouvez pas la réponse à votre question ?</AlertTitle>
          <AlertDescription>
            Si vous ne trouvez pas la réponse à votre question consultez les{' '}
            <Link href='/cgv' className='font-bold underline'>
              Conditions générales de vente
            </Link>{' '}
            ou contactez-nous.
          </AlertDescription>
        </Alert>
        <Accordion type='single' collapsible className='w-full xl:w-10/12 py-6 m-auto'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>Comment fonctionne la vente sur votre plateforme ?</AccordionTrigger>
            <AccordionContent>
              Les photographes peuvent vendre leurs impressions directement aux clients via la marketplace. Ils sont responsables de l'impression et de l'envoi des commandes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger>Quels sont les frais associés à la vente de mes impressions ?</AccordionTrigger>
            <AccordionContent>La plateforme prélève une commission sur chaque vente. Les détails des frais seront affichés au moment de l'inscription.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger>Quels types de photos puis-je vendre sur la marketplace ?</AccordionTrigger>
            <AccordionContent>Vous pouvez vendre des impressions de tout type, à l'exception des photos de nu ou à caractère pornographique.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-4'>
            <AccordionTrigger>Qui est responsable de l'emballage et de l'envoi des commandes ?</AccordionTrigger>
            <AccordionContent>Le photographe est entièrement responsable de l'emballage et de l'expédition des impressions.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-5'>
            <AccordionTrigger>Quels sont les délais de traitement et d'expédition des commandes ?</AccordionTrigger>
            <AccordionContent>Une fois la commande passée, le photographe a 10 jours pour l'envoyer. L'acheteur dispose de 15 jours pour valider la réception.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-6'>
            <AccordionTrigger>Comment les paiements sont-ils gérés sur la plateforme ?</AccordionTrigger>
            <AccordionContent>Les paiements sont gérés via Stripe, garantissant des transactions sécurisées pour les photographes et les acheteurs.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-7'>
            <AccordionTrigger>Que faire si un client n'est pas satisfait de la qualité de l'impression ?</AccordionTrigger>
            <AccordionContent>Le client doit contacter directement le photographe pour discuter des solutions possibles.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-8'>
            <AccordionTrigger>Puis-je fixer mes propres prix pour les impressions ?</AccordionTrigger>
            <AccordionContent>Oui, les photographes sont libres de fixer les prix qu'ils souhaitent pour leurs impressions.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-9'>
            <AccordionTrigger>Comment puis-je suivre l'état de mes commandes et paiements ?</AccordionTrigger>
            <AccordionContent>Chaque photographe doit fournir un numéro de suivi pour que les acheteurs puissent suivre leurs commandes.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-10'>
            <AccordionTrigger>Y a-t-il un support pour les photographes en cas de problème ?</AccordionTrigger>
            <AccordionContent>Oui, en cas de problème, vous pouvez contacter notre support à l'adresse email (à venir).</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-11'>
            <AccordionTrigger>Je n'ai pas reçu ma commande, que faire ?</AccordionTrigger>
            <AccordionContent>Si vous n'avez pas reçu votre commande, veuillez contacter directement le vendeur.</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-12'>
            <AccordionTrigger>Quelles sont les obligations du vendeur ?</AccordionTrigger>
            <AccordionContent>
              Le vendeur doit respecter les délais de livraison. En cas de manquement, l'éditeur du site peut supprimer son compte et rembourser les sommes déboursées par le client.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-13'>
            <AccordionTrigger>J'ai reçu ma commande, que dois-je faire ?</AccordionTrigger>
            <AccordionContent>
              Une fois la commande réceptionnée, l'acheteur dispose de 15 jours pour valider la réception. Sans validation, le vendeur recevra automatiquement le paiement.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ProfileLayout>
  );
};

export default Questions;
