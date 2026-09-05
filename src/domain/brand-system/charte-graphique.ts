/**
 * Charte graphique du Sporting Club Roquettan — SEULE source de vérité des couleurs.
 * Valeurs relevées sur la bannière Facebook du club (dossier de preuves du pipeline) :
 *  - rose : médiane de la plage observée ≈ #F0A6CF–#E88BC4  → ❓ à confirmer par le club
 *  - noir/anthracite : dominante sombre, aucune valeur hex observée → ❓ à confirmer par le club
 *  - blanc : fixe
 * Remplacement futur par les codes officiels du club = substitution de ces trois constantes.
 */
export const COULEUR_ROSE_ACCENT = '#EC98C9'
export const COULEUR_NOIR_ANTHRACITE = '#1A1A1A'
export const COULEUR_BLANC = '#FFFFFF'

export const TOKENS_CHARTE = {
  'noir-anthracite': COULEUR_NOIR_ANTHRACITE,
  rose: COULEUR_ROSE_ACCENT,
  blanc: COULEUR_BLANC,
} as const

export type NomCouleurCharte = keyof typeof TOKENS_CHARTE

/** Logo du club : copié tel quel dans public/, jamais transformé (référencé uniquement via cette constante). */
export const CHEMIN_LOGO = '/assets/logo-scr-720.jpg'
