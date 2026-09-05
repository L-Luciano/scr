import { describe, it, expect } from 'vitest'
import { afficherOuACompleter, MentionsLegalesSchema } from './mentions-legales.schema'

describe('afficherOuACompleter — information légale non sourcée', () => {
  it('should_return_a_completer_mention_when_value_is_absent', () => {
    const resultat = afficherOuACompleter(undefined)
    expect(resultat).toBe('à compléter par le club')
  })
})

describe('MentionsLegalesSchema — champs obligatoires (LCEN)', () => {
  it('should_accept_mentions_legales_when_editeur_et_hebergeur_sont_presents', () => {
    const mentions = { editeur: 'Sporting Club Roquettan', hebergeur: 'Vercel Inc.' }
    expect(MentionsLegalesSchema.safeParse(mentions).success).toBe(true)
  })

  it('should_reject_mentions_legales_when_editeur_est_absent', () => {
    const result = MentionsLegalesSchema.safeParse({ hebergeur: 'Vercel Inc.' })
    expect(result.success).toBe(false)
    expect(result.error?.issues.some(i => i.message === 'Le champ « editeur » est obligatoire dans les mentions légales.')).toBe(true)
  })

  it('should_reject_mentions_legales_when_hebergeur_est_absent', () => {
    const result = MentionsLegalesSchema.safeParse({ editeur: 'Sporting Club Roquettan' })
    expect(result.success).toBe(false)
    expect(result.error?.issues.some(i => i.message === 'Le champ « hebergeur » est obligatoire dans les mentions légales.')).toBe(true)
  })
})
