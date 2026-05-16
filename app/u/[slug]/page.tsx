import { PublicProfilePage } from '@/containers/profile/PublicProfilePage/PublicProfilePage';

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <PublicProfilePage slug={slug} />;
}
