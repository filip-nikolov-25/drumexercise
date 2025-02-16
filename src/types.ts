 export interface AudioItem  {
    key: string;
    sound: string;
  };

export interface  SavedWord  {
    first: string ;
    second: string ;
    third: string ;
    fourth: string ;
    fifth: string ;
    sixth: string ;
    seventh: string ;
    eighth: string ;
    ninth: string ;
    tenth: string ;
  };
  
 export interface DrumPadGridProps  {
    arr: AudioItem[];
    onEdit: (index: number) => void
  }