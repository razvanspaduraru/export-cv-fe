
export class Publication {
  constructor(public id: string,
    public title: string,
    public abstract_text: string,
    public imagePath: string,
    public no_pages: string,
    public publisher: string,
    public keywords: string,
    public publication_date: string,
    public authors: string,
    public publication_type: string,
    public isExported: boolean
  ) {
  }
}
