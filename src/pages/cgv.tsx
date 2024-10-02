import React from 'react';

const ConditionsGeneralesDeVente = () => {
  return (
    <div className="conditions-generales-de-vente">
      <h1>Conditions Générales de Vente (CGV)</h1>
      <p><strong>Dernière mise à jour : [date]</strong></p>
      
      <h2>1. Objet</h2>
      <p>
        La Plateforme agit en tant qu'intermédiaire pour permettre aux photographes professionnels et amateurs 
        (ci-après "le Vendeur") de vendre directement leurs impressions de photos aux utilisateurs finaux 
        (ci-après "l'Acheteur"). Chaque Vendeur est responsable de la production des impressions, de leur 
        emballage, et de leur envoi. La Plateforme se contente de mettre à disposition les outils techniques 
        nécessaires pour faciliter ces transactions et ne participe pas activement à la vente ou à la création des produits.
      </p>

      <h2>2. Accès et Inscription</h2>
      <p>
        L'utilisation de la Plateforme pour la vente ou l'achat nécessite une inscription. Lors de l'inscription, 
        les utilisateurs s'engagent à fournir des informations exactes, à jour, et complètes. La Plateforme se 
        réserve le droit de suspendre ou de résilier un compte en cas de non-respect des CGV ou en cas de comportement jugé inapproprié.
      </p>

      <h2>3. Produits</h2>
      <p>
        Le Vendeur est libre de définir les produits qu'il souhaite vendre, à condition que ceux-ci respectent les 
        lois en vigueur et les conditions imposées par la Plateforme. Les photos à caractère pornographique, de nu 
        ou tout autre contenu jugé inapproprié par la Plateforme sont strictement interdits. La Plateforme se 
        réserve le droit de supprimer tout contenu non conforme à ces règles sans avertissement préalable.
      </p>

      <h2>4. Commandes et Délais</h2>
      <p>
        L'Acheteur passe commande directement auprès du Vendeur via la Plateforme. Une fois la commande confirmée, 
        le Vendeur a un délai de 10 jours pour traiter et expédier la commande. L'Acheteur dispose ensuite de 15 
        jours après réception pour valider la commande. En l'absence de validation de la part de l'Acheteur dans ce délai, 
        la commande sera automatiquement considérée comme acceptée et le Vendeur recevra le paiement.
      </p>

      <h2>5. Paiements</h2>
      <p>
        Les paiements sur la Plateforme sont gérés via le système de paiement Stripe, garantissant des transactions 
        sécurisées. Le Vendeur reçoit le paiement après validation de la commande par l'Acheteur ou après expiration 
        du délai de 15 jours suivant la réception de la commande sans action de l'Acheteur.
      </p>

      <h2>6. Livraison et Suivi</h2>
      <p>
        Le Vendeur est entièrement responsable de l'envoi de la commande et doit fournir un numéro de suivi à 
        l'Acheteur, accessible via la Plateforme. Les frais de livraison et les délais varient en fonction des modalités 
        choisies par le Vendeur et doivent être clairement communiqués à l'Acheteur au moment de la commande.
      </p>
      <p>
        En cas de non-réception de la commande dans les délais, l'Acheteur est invité à contacter directement le 
        Vendeur. La Plateforme n'est pas responsable des retards ou des manquements du Vendeur concernant la livraison des produits.
      </p>

      <h2>7. Obligations du Vendeur</h2>
      <p>
        Le Vendeur s'engage à respecter les conditions suivantes :
      </p>
      <ul>
        <li><strong>Délais de traitement et d'expédition :</strong> Le Vendeur doit expédier les produits dans un délai maximum de 10 jours à compter de la confirmation de la commande.</li>
        <li><strong>Qualité des produits :</strong> Les impressions doivent correspondre à la description faite sur la fiche produit, tant en termes de qualité que de format.</li>
        <li><strong>Service client :</strong> Le Vendeur doit assurer une communication claire et rapide avec l'Acheteur en cas de question ou de réclamation.</li>
      </ul>
      <p>
        En cas de manquement grave (retard non justifié, non-livraison, produit non conforme), la Plateforme se 
        réserve le droit de suspendre ou de résilier le compte du Vendeur et de retirer ses produits du catalogue.
      </p>

      <h2>8. Responsabilité de la Plateforme</h2>
      <p>
        La Plateforme agit uniquement comme un intermédiaire technique permettant de mettre en relation le Vendeur 
        et l'Acheteur. <strong>La Plateforme ne peut en aucun cas être tenue responsable des actions, omissions ou manquements du Vendeur</strong>, 
        notamment en cas de :
      </p>
      <ul>
        <li>Retard ou non-livraison des commandes.</li>
        <li>Défaut de qualité ou non-conformité des produits.</li>
        <li>Litiges entre l'Acheteur et le Vendeur concernant la transaction, la livraison ou le produit.</li>
      </ul>
      <p>
        En cas de réclamation concernant un produit ou une commande, l'Acheteur doit s'adresser directement au Vendeur. 
        La Plateforme pourra toutefois intervenir en tant que médiateur pour tenter de résoudre le litige, sans que cela n'engage sa responsabilité.
      </p>

      <h2>9. Réclamations et Retours</h2>
      <p>
        En cas de problème concernant la qualité de l'impression, le délai de livraison ou tout autre aspect du produit, 
        l'Acheteur doit contacter directement le Vendeur via les coordonnées disponibles dans sa commande. 
        <strong>La Plateforme n'est pas responsable de la gestion des retours ou des réclamations</strong>, mais elle pourra suspendre le 
        compte du Vendeur en cas de réclamations répétées et justifiées.
      </p>

      <h2>10. Annulation de Commandes</h2>
      <p>
        Toute annulation de commande doit être discutée entre l'Acheteur et le Vendeur. <strong>La Plateforme n'intervient pas dans les politiques 
        de remboursement ou d'annulation des Vendeurs.</strong> En cas de litige, l'Acheteur peut demander une médiation via la Plateforme.
      </p>

      <h2>11. Propriété Intellectuelle</h2>
      <p>
        Le Vendeur reste pleinement propriétaire des droits d'auteur et de propriété intellectuelle sur les photos qu'il vend. 
        <strong>L'Acheteur n'acquiert qu'un droit d'utilisation privé et personnel des impressions</strong> et s'engage à ne pas les reproduire, 
        distribuer ou utiliser à des fins commerciales sans autorisation écrite du Vendeur.
      </p>

      <h2>12. Résolution des Litiges</h2>
      <p>
        En cas de litige entre l'Acheteur et le Vendeur, les parties doivent tenter de résoudre le problème à l'amiable. 
        Si aucun accord n'est trouvé, le litige pourra être porté devant les tribunaux compétents. <strong>La Plateforme, en tant qu'intermédiaire, 
        n'est pas partie prenante dans le litige et ne peut être tenue responsable des actions des Vendeurs ou des Acheteurs.</strong>
      </p>

      <h2>13. Protection des Données</h2>
      <p>
        Les informations personnelles des utilisateurs (Acheteurs et Vendeurs) sont collectées et traitées conformément aux lois 
        en vigueur sur la protection des données personnelles. Pour plus d'informations, veuillez consulter notre [Politique de Confidentialité].
      </p>

      <h2>14. Modification des CGV</h2>
      <p>
        La Plateforme se réserve le droit de modifier les présentes CGV à tout moment. Les utilisateurs seront informés de toute modification 
        via la Plateforme. Les CGV applicables sont celles en vigueur au moment de la commande.
      </p>
    </div>
  );
};

export default ConditionsGeneralesDeVente;
