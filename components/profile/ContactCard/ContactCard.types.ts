export interface ContactCardSaveData {
  phone_prefix: string | null;
  phone_number: string | null;
  instagram: string | null;
}

export interface ContactCardProps {
  phonePrefix: string | null;
  phoneNumber: string | null;
  instagram: string | null;
  cityName: string;
  stateName: string;
  onSave: (data: ContactCardSaveData) => Promise<void>;
  saving: boolean;
}
