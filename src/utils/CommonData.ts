export type  UserInfo = {
  user_id: string;
  password: string;
  crt_date: string;
}

export type Post = {
  no: number;
  title: string;
  writer: string;
  content: string;
  create_date: string;
  hits:number;
}

export type Comment = {
  id: number,
  post_id: number,
  writer: string,
  contents: string,
  create_date: string
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          password: string
          create_date: string
        }
      }
    }
  }
}

export interface AssetGroup {
  id: number;
  category: string;
  asset: string;
  ratio: number;
  isAdvanced: boolean;
}

export interface Data {
  name: string;
  ticker: string;
  category: string;
  country: string;
  market: string;
  label: string;
  value: string;
}
