import useUserQuery from "@/hooks/queries/useUserQuery";
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export default function Protect({ children }: Props) {
  const { userQuery, errorMessage } = useUserQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("token") ||
      (userQuery.isError && errorMessage === "Token has expired")
    ) {
      navigate("/login");
      localStorage.removeItem("token");
    }
  }, [navigate, userQuery, errorMessage]);

  return children;
}
