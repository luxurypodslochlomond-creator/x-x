import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RecordSectionRedirect({ to, fallbackHash = '' }) {
  const { search, hash } = useLocation();
  return <Navigate to={`${to}${search}${hash || fallbackHash}`} replace />;
}