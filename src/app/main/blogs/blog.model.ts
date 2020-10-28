export class BlogModel {
  public id: number;
  public title: string;
  public description: string;
  public imageUrl: string;
  public publishDate: string;
  public likes: number;
  public author: string;
  public isHighlight: boolean;


  // tslint:disable-next-line:max-line-length
  constructor(id: number, title: string, desc: string, imgUrl: string, pubDate: string, likes: number, author: string, isHighlight: boolean) {
    this.title = title;
    this.author = author;
    this.description = desc;
    this.imageUrl = imgUrl;
    this.publishDate = pubDate;
    this.likes = likes;
    this.isHighlight = isHighlight;
  }

}
