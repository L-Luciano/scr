import type { z } from 'zod'
import { ActualiteSchema } from '../domain/news/actualite.schema'
import type { ActualitePubliee } from '../domain/news/events/actualite-publiee'

/** Command : publier une Actualité depuis un fichier Markdown dont le front-matter n'est pas encore validé. */
export interface PublierActualiteCommand {
  cheminFichier: string
  frontMatter: unknown
}

/** Échec explicite de la Command : rien n'est publié, les violations Zod sont portées par `issues`. */
export class EchecPublicationActualite extends Error {
  readonly issues: z.core.$ZodIssue[]

  constructor(cheminFichier: string, issues: z.core.$ZodIssue[]) {
    super(`Échec de publication : ${cheminFichier}`)
    this.name = 'EchecPublicationActualite'
    this.issues = issues
  }
}

/** Identifiant de l'Actualité : slug dérivé du nom de fichier (sans dossier ni extension). */
const actualiteIdDepuisChemin = (cheminFichier: string): string =>
  cheminFichier.split('/').pop()!.replace(/\.md$/, '')

export function publierActualite(command: PublierActualiteCommand): ActualitePubliee {
  const resultat = ActualiteSchema.safeParse(command.frontMatter)
  if (!resultat.success) {
    throw new EchecPublicationActualite(command.cheminFichier, resultat.error.issues)
  }
  const actualite = resultat.data
  return {
    actualiteId: actualiteIdDepuisChemin(command.cheminFichier),
    titre: actualite.titre,
    datePublication: actualite.datePublication,
    extrait: actualite.extrait,
  }
}
