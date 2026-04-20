import { useNavigate } from 'react-router-dom'
import styles from './KnowledgeFaq.module.css'

const FAQS = [
  {
    q: 'Comment faire son shopping sur Kiabi ?',
    a: 'Envie de faire votre shopping à n'importe quelle heure du jour ou de la nuit ? Découvrez nos produits dans les catégories FEMME, LINGERIE, HOMME, FILLE, GARÇON, BÉBÉ, MAISON, ACCESSOIRES ou CHAUSSURES ! Dès que le coup de cœur se présente, cliquez sur « Ajouter au panier ». En cours de paiement : Continuez le processus de paiement et renseignez vos coordonnées. Saisissez votre adresse de livraison, nous vous enverrons un mail de confirmation de votre commande afin de vous récapituler le statut de votre achat actuel.',
  },
  {
    q: 'Comment puis-je recevoir ma commande ?',
    a: '« En magasin Kiabi : Passez votre commande en ligne et venez la retirer dans votre magasin Kiabi. Du lundi au samedi, pensez à récupérer vos articles en ligne, puis des les retirer dans votre magasin Kiabi. La livraison en magasin est gratuite. » En dehors des commandes inférieures à 14€, les frais de location en Point Relais sont de 3.99€ · A domicile : la livraison à 6€ d'achat. En dehors de la commande inférieures à 45€, les frais de livraison sont de 6.99€. La livraison est de 3 jours à domicile et au relais de 5 jours.',
  },
  {
    q: 'Puis-je modifier ou annuler une commande ?',
    a: 'Il est impossible de modifier une commande une fois celle-ci validée (taille, couleur, mode de paiement, lieu de livraison). Si vous souhaitez la modifier, il vous faut l'annuler puis en passer une nouvelle. 1) Rendez-vous dans l'espace « Mes commandes » depuis votre espace « Mon compte ». 2) Cliquez sur la commande correspondante. Si vous recevez encore un email de confirmation, cela signifie que votre annulation a bien été prise en compte.',
  },
  {
    q: 'Comment utiliser mon code promotionnel ?',
    a: 'Pour bénéficier de la remise sur votre achat actuel, il vous suffit d'ajouter le code dans votre panier, puis de cliquer sur « OK ». N'oubliez pas de vous connecter avant d'utiliser un code promotionnel. Dans les étapes de paiement, vous verrez des articles déjà en promotion. Dans ce segment, il est demandé un minimum d'achat. Pensez avant à vérifier la liste de validité.',
  },
  {
    q: 'Le prix d'un même article peut-il varier ?',
    a: 'En effet, notre site peut, à des jours tardifs, afficher des tarifs différents. Comme pour tous les sites en ligne — Un article peut faire l'objet d'une application commerciale à double niveau : les différentes options d'un même article peuvent présenter des différences en période promotionnelles.',
  },
  {
    q: 'Je veux créer un compte client',
    a: null,
    list: [
      '1) Ouvrez l'accueil de notre site, cliquez sur « Compte » puis « Je crée mon compte ». 2) Renseignez vos informations personnelles puis cliquez sur « Valider ». 3) Vous recevrez un e-mail de confirmation.',
      'Vous pouvez aussi créer un compte depuis notre mobile. Dans la partie « Compte » en haut à droite de l'écran : cliquez sur « Mon compte » et saisissez « Se connecter » et l'option « Créer un compte ».',
    ],
  },
  {
    q: 'Comment puis-je récupérer mon mot de passe ?',
    a: 'Mot de passe oublié ou perdu, qu'à cela ne tienne ! Cliquez sur le lien « Mot de passe oublié » − Renseignez-vous dans notre espace « Me connecter » − puis cliquez sur le lien de réinitialisation. Si l'adresse email que vous avez fournie est correcte, vous recevrez un e-mail pour réinitialiser votre mot de passe. Si vous ne recevez pas d'e-mail, vérifiez vos courriers indésirables ou contactez notre service client à support@kiabi.fr.',
  },
  {
    q: 'Quels sont les modes de livraison disponibles ?',
    a: 'Nous proposons plusieurs modes de livraison : livraison à domicile (3 à 5 jours ouvrés), retrait en magasin (gratuit, disponible le lendemain), livraison en point relais (2 à 4 jours ouvrés). Les livraisons express sont disponibles pour les commandes passées avant 12h. Les frais de livraison varient selon le mode choisi et le montant de votre commande.',
  },
  {
    q: 'Comment retourner un article ?',
    a: 'Vous disposez de 30 jours à compter de la réception de votre commande pour retourner un article. L'article doit être dans son état d'origine, non porté, avec toutes les étiquettes. Rendez-vous dans votre espace « Mes commandes », sélectionnez l'article à retourner, imprimez l'étiquette de retour et déposez le colis en point relais ou en bureau de poste. Le remboursement sera effectué sous 5 à 10 jours ouvrés après réception du colis.',
  },
]

export default function KnowledgeFaq() {
  const navigate = useNavigate()

  return (
    <div>
      <div className={styles.explorerBar}>
        <button className={styles.backBtn} title="Back to Knowledge" onClick={() => navigate('/knowledge')}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M10 3L5 8l5 5"/>
          </svg>
        </button>
        <h1 className={styles.explorerTitle}>FAQ</h1>
        <div className={styles.explorerBarRight}>
          <div className={styles.explorerSearch}>
            <span className={styles.searchIcon}>
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <circle cx="6" cy="6" r="4"/><path d="M9 9l2.5 2.5" strokeLinecap="round"/>
              </svg>
            </span>
            <input type="text" placeholder="Search" />
          </div>
          <span className={styles.countBadge}>320 Q&amp;A</span>
          <span className={styles.importDate}>Last import: 12/12/2023</span>
        </div>
      </div>

      <div className={styles.faqSection}>
        <table className={styles.faqTable}>
          <thead>
            <tr>
              <th className={styles.th}>Question <span className={styles.sortArrow}>↕</span></th>
              <th className={styles.th}>Answer <span className={styles.sortArrow}>↕</span></th>
            </tr>
          </thead>
          <tbody>
            {FAQS.map((row, i) => (
              <tr key={i} className={styles.faqRow}>
                <td className={`${styles.td} ${styles.tdQuestion}`}>{row.q}</td>
                <td className={`${styles.td} ${styles.tdAnswer}`}>
                  {row.list ? (
                    <ul className={styles.answerList}>
                      {row.list.map((item, j) => <li key={j}>{item}</li>)}
                    </ul>
                  ) : row.a}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
