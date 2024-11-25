import { useNavigate } from "react-router-dom";

type Props = {
  subtitle: string;
  title: string;
  to: string;
};

export default function BackNavigation({ subtitle, title, to }: Props) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-4" onClick={() => navigate(to, { replace: true })}>
      <i className="bx bx-arrow-back bg-primary border border-border rounded-md p-4 text-white flex items-center justify-center text-2xl w-16 transition hover:bg-secondary cursor-pointer"></i>
      <div>
        <p className="text-light">{subtitle}</p>
        <h2 className="text-white text-3xl mt-1">{title}</h2>
      </div>
    </div>
  );
}
