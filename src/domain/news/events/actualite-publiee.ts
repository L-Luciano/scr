/** Domain Event : une Actualité validée a été publiée (= fichier Markdown accepté au build). */
export interface ActualitePubliee {
  actualiteId: string
  titre: string
  datePublication: string
  extrait: string
}
