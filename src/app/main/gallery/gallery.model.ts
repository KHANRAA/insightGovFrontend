export class GalleryImagee {
  constructor(
    public imageUrl: string,
    public deleteToken: string,
    public isActive: boolean,
    public tags: string[],
    public likedBy: number,
    public selfLiked: boolean,
  ) {}
}

export class ToastMessagee {
  constructor(
    public type: string,
    public body: string,
    public title: string,
  ) {}
}
