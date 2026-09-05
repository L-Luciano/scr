import { describe, it, expect } from 'vitest'
import { publierActualite, EchecPublicationActualite } from './publier-actualite.handler'

describe('Publier une actualité', () => {
  describe('GIVEN un fichier Markdown complet et conforme', () => {
    it('should_emit_actualite_publiee_when_command_is_valid', () => {
      const command = {
        cheminFichier: 'content/actualites/2026-09-03-100-inscrits.md',
        frontMatter: {
          titre: 'Premier objectif dépassé : plus de 100 inscrits',
          datePublication: '2026-09-03',
          extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
          visuel: {
            asset: 'assets/visuels-generes/100-inscrits.svg',
            couleursUtilisees: ['rose', 'noir-anthracite'],
            personneReelle: false,
            alt: "Cent joueurs et joueuses souriants autour d'un ballon rose sur fond anthracite",
          },
        },
      }
      const evenement = publierActualite(command)
      expect(evenement).toEqual(
        expect.objectContaining({
          titre: 'Premier objectif dépassé : plus de 100 inscrits',
          datePublication: '2026-09-03',
          extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
        }),
      )
    })
  })

  describe('GIVEN un fichier Markdown sans titre', () => {
    const commandSansTitre = {
      cheminFichier: 'content/actualites/2026-09-03-100-inscrits.md',
      frontMatter: {
        datePublication: '2026-09-03',
        extrait: 'Le club franchit le cap symbolique de 100 licenciés.',
        visuel: {
          asset: 'assets/visuels-generes/100-inscrits.svg',
          couleursUtilisees: ['rose', 'noir-anthracite'],
          personneReelle: false,
          alt: "Cent joueurs et joueuses souriants autour d'un ballon rose sur fond anthracite",
        },
      },
    }

    it('should_throw_echec_publication_actualite_when_titre_est_absent', () => {
      expect(() => publierActualite(commandSansTitre)).toThrow(EchecPublicationActualite)
    })

    it('AND_the_thrown_error_carries_the_exact_zod_message', () => {
      let erreur: unknown
      try {
        publierActualite(commandSansTitre)
      } catch (e) {
        erreur = e
      }
      expect(erreur).toBeInstanceOf(EchecPublicationActualite)
      expect((erreur as EchecPublicationActualite).issues.some(i => i.message === 'Le champ « titre » est obligatoire.')).toBe(true)
    })
  })
})
