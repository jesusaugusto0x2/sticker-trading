export interface PublicProfileHeaderProps {
  name: string;
  countryCode: string;
  countryName: string;
  stateName: string;
  cityName: string;
  repeatedCount: number;
  missingCount: number;
  hasSelection: boolean;
  onWhatsApp: () => string;
}
