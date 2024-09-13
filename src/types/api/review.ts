interface TopCaregiverItem {
  id: number;
  name: string;
  address: string;
  rating: number;
}
export type GetTopRatedCaregiversResponse = TopCaregiverItem[];
