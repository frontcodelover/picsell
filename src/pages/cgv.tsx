import React from 'react';
import useUserAndTranslation from '@/hooks/useUserAndTranslation';

const Cgv = () => {
  const { t } = useUserAndTranslation();

  return (
    <div className='conditions-generales-de-vente'>
      <h1>{t('cgv.cgv')}</h1>
      <p>
        <strong>{t('cgv.last_update')}</strong>
      </p>

      <h2>{t('cgv.object')}</h2>
      <p>{t('cgv.object_text')}</p>

      <h2>{t('cgv.access_registration')}</h2>
      <p>{t('cgv.access_registration_text')}</p>

      <h2>{t('cgv.products')}</h2>
      <p>{t('cgv.products_text')}</p>

      <h2>{t('cgv.orders_delays')}</h2>
      <p>{t('cgv.orders_delays_text')}</p>

      <h2>{t('cgv.payments')}</h2>
      <p>{t('cgv.payments_text')}</p>

      <h2>{t('cgv.shipping_tracking')}</h2>
      <p>{t('cgv.shipping_tracking_text')}</p>
      <p>{t('cgv.shipping_tracking_additional')}</p>

      <h2>{t('cgv.seller_obligations')}</h2>
      <p>{t('cgv.seller_obligations_text')}</p>
      <ul>
        <li>{t('cgv.seller_obligations_list_1')}</li>
        <li>{t('cgv.seller_obligations_list_2')}</li>
        <li>{t('cgv.seller_obligations_list_3')}</li>
      </ul>

      <h2>{t('cgv.platform_responsibility')}</h2>
      <p>{t('cgv.platform_responsibility_text')}</p>

      <h2>{t('cgv.claims_returns')}</h2>
      <p>{t('cgv.claims_returns_text')}</p>

      <h2>{t('cgv.order_cancellation')}</h2>
      <p>{t('cgv.order_cancellation_text')}</p>

      <h2>{t('cgv.intellectual_property')}</h2>
      <p>{t('cgv.intellectual_property_text')}</p>

      <h2>{t('cgv.dispute_resolution')}</h2>
      <p>{t('cgv.dispute_resolution_text')}</p>

      <h2>{t('cgv.data_protection')}</h2>
      <p>{t('cgv.data_protection_text')}</p>

      <h2>{t('cgv.modification_cgv')}</h2>
      <p>{t('cgv.modification_cgv_text')}</p>
    </div>
  );
};

export default Cgv;
