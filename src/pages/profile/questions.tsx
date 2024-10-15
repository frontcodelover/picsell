import React from 'react';
import Link from 'next/link';
import ProfileLayout from '../../../layouts/profile/layout';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';

const Questions = () => {
  const { t } = useUserAndTranslation();

  return (
    <ProfileLayout>
      <div>
        <Alert>
          <AlertTitle className='font-bold pb-2'>{t('question.alert_title')}</AlertTitle>
          <AlertDescription>
            {t('question.alert_description', {
              cgv_link: (
                <Link href='/cgv' className='font-bold underline'>
                  {t('cgv.cgv')}
                </Link>
              ),
            })}
          </AlertDescription>
        </Alert>

        <Accordion type='single' collapsible className='w-full xl:w-10/12 py-6 m-auto'>
          <AccordionItem value='item-1'>
            <AccordionTrigger>{t('question.accordion_1')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_1_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-2'>
            <AccordionTrigger>{t('question.accordion_2')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_2_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-3'>
            <AccordionTrigger>{t('question.accordion_3')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_3_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-4'>
            <AccordionTrigger>{t('question.accordion_4')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_4_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-5'>
            <AccordionTrigger>{t('question.accordion_5')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_5_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-6'>
            <AccordionTrigger>{t('question.accordion_6')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_6_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-7'>
            <AccordionTrigger>{t('question.accordion_7')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_7_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-8'>
            <AccordionTrigger>{t('question.accordion_8')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_8_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-9'>
            <AccordionTrigger>{t('question.accordion_9')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_9_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-10'>
            <AccordionTrigger>{t('question.accordion_10')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_10_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-11'>
            <AccordionTrigger>{t('question.accordion_11')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_11_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-12'>
            <AccordionTrigger>{t('question.accordion_12')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_12_content')}</AccordionContent>
          </AccordionItem>

          <AccordionItem value='item-13'>
            <AccordionTrigger>{t('question.accordion_13')}</AccordionTrigger>
            <AccordionContent>{t('question.accordion_13_content')}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ProfileLayout>
  );
};

export default Questions;
