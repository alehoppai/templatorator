export interface MetaProps {
  name: string;
  content: string;
  charset: string;
}

export function MetaFn(props: MetaProps): string;

export interface LinkProps {
  rel: 'stylesheet';
  href: string;
}

export function LinkFn(props: LinkProps): string;

export interface PageProps {
  lang: "en";
  metas: MetaProps[];
  links: LinkProps[];
  title: string;
  htmlClass: string;
  bodyClass: string;
  children: Function[];
}

export function PageFn(props: PageProps): string;
