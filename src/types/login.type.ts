export type LoginResponse = {
  id: number;
  status: number;
  token: Token;
  username: string;
};

export type Token = {
  created_at: number;
  data: null;
  expires: number;
  id: number;
  last_used_at: number;
  phone: null;
  position_id: null;
  status: number;
  token: string;
  type: null;
  updated_at: number;
  user_agent: null;
  user_id: number;
};
