export type TableStatus = "Free" | "Reserved" | "Occupied";
export type ChairPosition =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "topLeft"
  | "topRight"
  | "bottomLeft"
  | "bottomRight";

export interface Chair {
  id: string;
  position: ChairPosition;
}

export interface TableItem {
  id: string;
  name: string;
  status: TableStatus;
  position: { x: number; y: number };
  rotation: number;
  shape: "rectangle" | "round" | "square";
  size: { width: number; height: number };
  chairs: Chair[];
  floorId: string;
  // receipt?: {
  //   items: Array<{
  //     name: string;
  //     price: number;
  //   }>;
  // };
}

export interface Floor {
  id: string;
  name: string;
}

export interface TableResponse {
  tables: TableItem[];
}
