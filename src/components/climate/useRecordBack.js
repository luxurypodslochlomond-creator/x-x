import { useNavigate } from 'react-router-dom';

// A shared-link arrival has no earlier page in this app. Back still opens the record.
export default function useRecordBack(fallback = '/TogetherChangeClimate') {
  const navigate = useNavigate();
  return () => window.history.state?.idx > 0 ? navigate(-1) : navigate(fallback);
}