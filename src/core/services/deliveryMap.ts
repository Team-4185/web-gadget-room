import type {
  DeliveryBranchOption,
  DeliveryBranchProvider,
  DeliveryRegionMapConfig,
} from '@/core/types';

type NominatimAddress = {
  city?: string;
  town?: string;
  village?: string;
  municipality?: string;
  state?: string;
  postcode?: string;
};

type NominatimPlace = {
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  name?: string;
  display_name: string;
  address?: NominatimAddress;
};

const NOMINATIM_ENDPOINT = 'https://nominatim.openstreetmap.org/search';

const PROVIDER_SEARCH_QUERY: Record<DeliveryBranchProvider, string> = {
  NOVA_POSHTA: 'Nova Poshta',
  UKR_POSHTA: 'Ukrposhta',
};

const cache = new Map<string, DeliveryBranchOption[]>();

const getViewbox = (region: DeliveryRegionMapConfig) => {
  const [[south, west], [north, east]] = region.bounds;

  return `${west},${north},${east},${south}`;
};

const getPlaceCity = (address?: NominatimAddress) =>
  address?.city ?? address?.town ?? address?.village ?? address?.municipality ?? address?.state;

const mapPlaceToBranch = (
  place: NominatimPlace,
  provider: DeliveryBranchProvider
): DeliveryBranchOption | null => {
  const lat = Number(place.lat);
  const lon = Number(place.lon);

  if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

  const name = place.name || place.display_name.split(',')[0]?.trim() || place.display_name;

  return {
    name: place.display_name,
    value: place.display_name,
    provider,
    city: getPlaceCity(place.address),
    address: name !== place.display_name ? place.display_name : undefined,
    lat,
    lon,
    source: 'osm',
  };
};

const getUniqueBranches = (branches: DeliveryBranchOption[]) =>
  Array.from(new Map(branches.map((branch) => [branch.value, branch])).values());

export const deliveryMapService = {
  async getBranches(
    provider: DeliveryBranchProvider,
    region: DeliveryRegionMapConfig,
    signal?: AbortSignal
  ): Promise<DeliveryBranchOption[]> {
    const cacheKey = `${provider}:${region.value}`;
    const cached = cache.get(cacheKey);

    if (cached) return cached;

    const params = new URLSearchParams({
      format: 'jsonv2',
      q: PROVIDER_SEARCH_QUERY[provider],
      viewbox: getViewbox(region),
      bounded: '1',
      limit: '30',
      addressdetails: '1',
      namedetails: '1',
      dedupe: '1',
    });

    const response = await fetch(`${NOMINATIM_ENDPOINT}?${params.toString()}`, {
      headers: { Accept: 'application/json' },
      signal,
    });

    if (!response.ok) {
      throw new Error(`OpenStreetMap search failed with status ${response.status}`);
    }

    const data = (await response.json()) as NominatimPlace[];
    const branches = getUniqueBranches(
      data
        .map((place) => mapPlaceToBranch(place, provider))
        .filter((branch): branch is DeliveryBranchOption => Boolean(branch))
    );

    cache.set(cacheKey, branches);
    return branches;
  },
};
