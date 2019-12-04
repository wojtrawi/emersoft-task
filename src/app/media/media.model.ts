export enum SortDir {
  Asc,
  Desc,
}

export enum MediaType {
  All,
  Image,
  Document,
  Video,
  Audio,
}

export interface MediaItem {
  title: string;
  type: MediaType;
}
