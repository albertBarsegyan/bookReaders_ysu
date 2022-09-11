export enum ReadingStatusVariants {
  WantRead = "wantRead",
  Reading = "reading",
  Finished = "finished",
}

export const ReadingStatuses = [
  { id: 0, title: ReadingStatusVariants.WantRead },
  { id: 1, title: ReadingStatusVariants.Reading },
  { id: 2, title: ReadingStatusVariants.Finished },
];
