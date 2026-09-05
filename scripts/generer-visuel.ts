/**
 * Outil d'AUTEUR (jamais appelé par `astro build`) : compose un visuel SVG abstrait
 * conforme à la Charte par construction — il n'utilise que les couleurs de TOKENS_CHARTE
 * et ne représente aucune personne réelle (motif de lignes diagonales + aplats + titre).
 *
 * Usage : npx tsx scripts/generer-visuel.ts "<titre>" "<texte alternatif>"
 *   → écrit src/assets/visuels-generes/<slug-du-titre>.svg
 *   → affiche le bloc front-matter `visuel:` à coller dans le fichier Markdown.
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { pathToFileURL } from 'node:url'
import { TOKENS_CHARTE } from '../src/domain/brand-system/charte-graphique'

const LARGEUR = 1200
const HAUTEUR = 630

function echapperXml(texte: string): string {
  return texte
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

/** Coupe le titre en lignes d'au plus ~24 caractères, sans couper les mots. */
function decouperEnLignes(titre: string, maxParLigne = 24): string[] {
  const lignes: string[] = []
  let courante = ''
  for (const mot of titre.trim().split(/\s+/)) {
    const candidate = courante ? `${courante} ${mot}` : mot
    if (candidate.length > maxParLigne && courante) {
      lignes.push(courante)
      courante = mot
    } else {
      courante = candidate
    }
  }
  if (courante) lignes.push(courante)
  return lignes
}

function slugifier(titre: string): string {
  return titre
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function genererVisuel(titre: string, alt: string = titre): string {
  const fond = TOKENS_CHARTE['noir-anthracite']
  const accent = TOKENS_CHARTE.rose
  const texte = TOKENS_CHARTE.blanc
  const lignes = decouperEnLignes(titre)
  const tailleTitre = lignes.length > 2 ? 64 : 84
  const interligne = tailleTitre * 1.15
  const yDepart = HAUTEUR / 2 - ((lignes.length - 1) * interligne) / 2 + tailleTitre / 3

  const lignesSvg = lignes
    .map((ligne, i) => `    <text x="80" y="${(yDepart + i * interligne).toFixed(0)}" fill="${texte}" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-weight="800" font-size="${tailleTitre}" letter-spacing="3" style="text-transform:uppercase">${echapperXml(ligne.toUpperCase())}</text>`)
    .join('\n')

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGEUR}" height="${HAUTEUR}" viewBox="0 0 ${LARGEUR} ${HAUTEUR}" role="img" aria-label="${echapperXml(alt)}">
  <title>${echapperXml(alt)}</title>
  <defs>
    <pattern id="diagonales" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-35)">
      <line x1="0" y1="0" x2="0" y2="28" stroke="${accent}" stroke-width="2" stroke-opacity="0.35" />
    </pattern>
  </defs>
  <rect width="${LARGEUR}" height="${HAUTEUR}" fill="${fond}" />
  <rect x="${LARGEUR * 0.58}" width="${LARGEUR * 0.42}" height="${HAUTEUR}" fill="url(#diagonales)" />
  <rect x="80" y="${HAUTEUR - 96}" width="220" height="10" fill="${accent}" />
  <circle cx="${LARGEUR - 150}" cy="${HAUTEUR / 2}" r="120" fill="none" stroke="${accent}" stroke-width="14" />
  <circle cx="${LARGEUR - 150}" cy="${HAUTEUR / 2}" r="44" fill="${accent}" />
  <g>
${lignesSvg}
  </g>
  <text x="80" y="${HAUTEUR - 44}" fill="${accent}" font-family="Arial Narrow, Helvetica Neue, Arial, sans-serif" font-weight="700" font-size="26" letter-spacing="6">SPORTING CLUB ROQUETTAN</text>
</svg>
`
}

function principal(argv: string[]): void {
  const [titre, alt] = argv
  if (!titre) {
    console.error('Usage : npx tsx scripts/generer-visuel.ts "<titre>" "<texte alternatif>"')
    process.exitCode = 1
    return
  }
  const dossier = join('src', 'assets', 'visuels-generes')
  mkdirSync(dossier, { recursive: true })
  const chemin = join(dossier, `${slugifier(titre)}.svg`)
  writeFileSync(chemin, genererVisuel(titre, alt ?? titre), 'utf8')
  console.log(`Visuel écrit : ${chemin}`)
  console.log('Bloc front-matter à coller :')
  console.log(`visuel:\n  asset: "../assets/visuels-generes/${slugifier(titre)}.svg"\n  couleursUtilisees: ["noir-anthracite", "rose", "blanc"]\n  personneReelle: false\n  alt: "${(alt ?? titre).replace(/"/g, '\\"')}"`)
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  principal(process.argv.slice(2))
}
