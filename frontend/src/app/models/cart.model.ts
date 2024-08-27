import { CartLine } from "./cartLine.model";

export interface Cart {
    id: number;
    userId: number;
    createdDate: Date;
    // status: string;
    cartLines: CartLine[];

  }