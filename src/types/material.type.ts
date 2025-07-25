export type Material = {
  name: string;
  material_id: number;
  color: string | null;
  code: string;
  last_price: number;
  min_amount: number | null;
  category: string;
  parent: string;
  unit: string;
  width: string;
  remind_start_amount: number;
  remind_start_sum: number;
  remind_income_amount: number;
  remind_income_sum: number;
  remind_outgo_amount: number;
  remind_outgo_sum: number;
  remind_end_amount: number;
  remind_end_sum: number;
};
