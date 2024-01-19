import MainAquarium from '../../components/MainAquarium';
import useIsMounted from '../../hooks/useIsMounted';

export default function Page() {
  const mounted = useIsMounted();
  return (
    <div>
      {mounted ?
        <MainAquarium />
        : null}
    </div>
  )
}