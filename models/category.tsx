export interface ICategory {
  id: number;
  name: string;
  color: string;
  icon: string;
  userId: number;
}

export class Category implements ICategory {
  id: number;
  name: string;
  color: string;
  icon: string;
  userId: number;

  constructor(data: ICategory) {
    this.id = data.id;
    this.name = data.name;
    this.color = data.color;
    this.icon = data.icon;
    this.userId = data.userId;
  }
}
