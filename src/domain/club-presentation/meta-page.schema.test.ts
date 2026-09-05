import { describe, it, expect } from 'vitest'
import { MetaPageSchema } from './meta-page.schema'

describe('MetaPageSchema — découvrabilité web', () => {
  it('should_accept_meta_when_titre_et_description_mentionnent_le_club_et_la_commune', () => {
    const meta = {
      titre: 'Accueil — Sporting Club Roquettan, La Roquette-sur-Siagne',
      description: 'Le site du Sporting Club Roquettan à La Roquette-sur-Siagne : actualités, projet et contact.',
    }
    const result = MetaPageSchema.safeParse(meta)
    expect(result.success).toBe(true)
  })

  it('should_reject_meta_when_titre_ne_mentionne_pas_sporting_club_roquettan', () => {
    const meta = {
      titre: 'Accueil — La Roquette-sur-Siagne',
      description: 'Le site du Sporting Club Roquettan à La Roquette-sur-Siagne : actualités, projet et contact.',
    }
    expect(MetaPageSchema.safeParse(meta).success).toBe(false)
  })

  it('should_reject_meta_when_titre_ne_mentionne_pas_la_commune', () => {
    const meta = {
      titre: 'Accueil — Sporting Club Roquettan',
      description: 'Le site du Sporting Club Roquettan à La Roquette-sur-Siagne : actualités, projet et contact.',
    }
    expect(MetaPageSchema.safeParse(meta).success).toBe(false)
  })
})
