export interface ILoaderData {
  amount: number;
  id: number;
  img: string;
  inStock: boolean;
  name: string;
  preOrder: boolean;
  price: number;
  reviews: number;
}

interface IBreadcrumbItem {
  id: number;
  label: string;
  path: string;
}

interface IBreadcrumbHandle<T> {
  breadcrumb: (data: T | null) => IBreadcrumbItem[];
}

export interface IBreadcrumbMatch<T> {
  data: T;
  handle: IBreadcrumbHandle<T>;
  id: string;
  loaderData: T;
  params: { id: string };
  pathname: string;
}
