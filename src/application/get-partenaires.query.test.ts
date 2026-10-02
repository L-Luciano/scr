import { describe, it, expect } from 'vitest'
import { getPartenaires } from './get-partenaires.query'
import type { IdentiteClub } from '../domain/club-presentation/identite-club.schema'

const identite = {
  partenaires: [
    { nom: 'SODDY', niveau: 'Officiel', droitsLogoConfirmes: false },
    { nom: 'Super U Pégomas', niveau: 'Platine', droitsLogoConfirmes: false },
    { nom: 'BG Environnement', niveau: 'Or', droitsLogoConfirmes: false },
    { nom: 'Big Alu', niveau: 'Officiel', droitsLogoConfirmes: false },
  ],
} as unknown as IdentiteClub

describe('getPartenaires — groupes par niveau', () => {
  it('should_group_partenaires_by_niveau_from_platine_to_officiel_and_pluralize_labels', () => {
    const result = getPartenaires(identite)
    expect(result.groupes.map(g => g.libelle)).toEqual(['Partenaire Platine', 'Partenaire Or', 'Partenaires officiels'])
    expect(result.groupes[2].partenaires.map(p => p.nom)).toEqual(['SODDY', 'Big Alu'])
  })

  it('should_omit_a_niveau_without_any_partenaire', () => {
    const sansOr = { partenaires: identite.partenaires.filter(p => p.niveau !== 'Or') } as unknown as IdentiteClub
    expect(getPartenaires(sansOr).groupes.map(g => g.niveau)).toEqual(['Platine', 'Officiel'])
  })
})
